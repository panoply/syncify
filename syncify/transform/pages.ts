/* eslint-disable no-unused-vars */
import type { Syncify, Requests, Store, PageFrontmatter, PageMetafield, WatchBundle, Resource } from 'types';
import { isEmpty } from 'rambdax';
import { readFile, writeFile } from 'fs-extra';
import matter, { stringify } from 'gray-matter';
import prompts from 'prompts';
import markdown from 'markdown-it';
import { Turndown, GithubFlavor } from '@syncify/turndown';
import { File, Kind } from 'syncify:file';
import { getPageMetafields } from 'syncify:process/metafields';
import { lastPath } from 'syncify:utils/paths';
import { isArray, isBoolean, isObject, isRegex, isUndefined, handleize, toUpcase, has, merge } from 'syncify:utils';
import { timer } from 'syncify:timer';
import { getPageCache, saveCache, setPageCache } from 'syncify:process/cache';
import * as c from 'syncify:colors';
import * as pages from 'syncify:requests/pages';
import * as log from 'syncify:log';
import { $ } from 'syncify:state';
import { ARR, CHV, TLD } from 'syncify:symbol';

enum PromptActions {
  /**
   * Create a new page
   */
  Create = 1,
  /**
   * Select page from the store
   */
  Select,
  /**
   * Merge remote with local
   */
  Update,
  /**
   * Cancel the sync and return
   */
  Cancel,
  /**
   * View the page source in terminal
   */
  View,
  /**
   * Overwrite Remote Version
   */
  Overwrite,
  /**
   * Open in Editor
   */
  Editor,
  /**
   * Open in Editor
   */
  Stash,
  /**
   * Open in Editor
   */
  Admin,
}

/**
 * Converts HTML to Markdown
 *
 * Uses Turndown to convert remote source of HTML to markdown
 * when `importLanguage` is set to `markdown`
 */
export function toMarkdown (content: string) {

  return new Turndown($.page.import)
  .use(GithubFlavor)
  .turndown(content);

}

/**
 * Prompt Action
 *
 * When no match page exist prompt will be shown
 */
export async function promptAction (store: Store): Promise<{
  /**
   * Resumes the log and reopen log group
   */
  resume: () => void;
  /**
   * The selected prompt choice
   */
  action: PromptActions
}> {

  const resume = log.prompt('No matching pages, select an option', {
    title: 'No matching pages',
    message: 'Open CLI and select an option'
  });

  const prompt = await prompts({
    type: 'select',
    name: 'action',
    message: 'Page Resources',
    hint: ' ',
    instructions: false,
    choices: [
      {
        title: 'Create Page',
        description: `Create a new page on ${store.domain}`,
        value: PromptActions.Create
      },
      {
        title: 'Select Page',
        description: `Select a page to overwrite on ${store.domain}`,
        value: PromptActions.Select
      },
      {
        title: 'Cancel',
        description: 'Cancel, and skip this sync operation',
        value: PromptActions.Cancel
      }
    ]
  });

  return {
    resume,
    action: prompt.action
  };
}

async function selectPage (store: Store): Promise<number> {

  const remote = await pages.list(store);

  if (!remote) return;

  const choices: prompts.Choice[] = (remote).map(
    page => ({
      title: page.title,
      description: `https://admin.shopify.com/store/${store.store.toLowerCase()}/pages/${page.id}`,
      value: page.id
    })
  );

  choices.push(
    {
      title: tui.hr(20, false),
      disabled: true,
      selected: false
    },
    {
      title: 'Create New Page',
      description: `Create a new page on ${store.domain}`,
      value: PromptActions.Create
    },
    {
      title: 'Cancel',
      description: 'Cancel, and skip this sync operation',
      value: PromptActions.Cancel
    }
  );

  const prompt = await prompts({
    type: 'select',
    name: 'action',
    message: 'Choose Page',
    hint: ' ',
    instructions: false,
    choices
  });

  return prompt.action;
}

async function promptOverwrite (remote: Resource.Page): Promise<{
  /**
   * Resumes the log and reopen log group
   */
  resume: () => void;
  /**
   * The selected prompt choice
   */
  action: PromptActions
}> {

  const choices: prompts.Choice[] = [
    {
      title: 'View Source',
      description: 'Prints the page source in the CLI',
      value: PromptActions.View
    },
    {
      title: 'Update Local',
      description: 'Update the local source with remote version',
      value: PromptActions.Update
    },
    {
      title: 'Overwrite Remote',
      description: 'Overwrite the remote version with local source',
      value: PromptActions.Overwrite
    },
    {
      title: 'Cancel',
      description: 'Cancel, and skip this sync operation',
      value: PromptActions.Cancel
    }
  ];

  const resume = log.prompt('Remote version is newer than local version', {
    title: 'Remote → Local',
    message: 'Remote version has changed'
  });

  const prompt = await prompts({
    type: 'select',
    name: 'action',
    message: 'Page Resources',
    hint: ' ',
    instructions: false,
    choices
  });

  if (prompt.action === PromptActions.View) {

    log.nwl('');
    log.out(remote.body_html);
    log.nwl('');

    const next = await prompts({
      type: 'select',
      name: 'action',
      message: 'Page Resources',
      hint: ' ',
      instructions: false,
      choices: choices.slice(1)
    });

    return {
      resume,
      action: next.action
    };

  } else {

    return {
      resume,
      action: prompt.action
    };

  }

}

/**
 * Request Payload
 *
 * Validated page fronmatter and constructs the page payload
 * from the provided data.
 */
function getPayloadFromFrontmatter (file: File, data: PageFrontmatter): Requests.Page {

  const payload: Resource.Page = {
    title: has('title', data) ? data.title : toUpcase(file.name.replace(/[._-]/g, ' '))
  };

  if (has('handle', data)) {

    let before: string;
    let handle: string = data.handle;

    if (/^[./]{1,2}/.test(handle)) {
      before = handle;
      handle = handle.replace(/^[./]{1,2}/, NIL);
      log.warn(`handle ${CHV} ${before} ${ARR} ${handle}`, 'fixed start');
    }

    if (/^pages\//.test(handle)) {
      before = handle;
      handle = handle.replace(/^pages\//, NIL);
      log.warn(`handle ${CHV} ${before} ${ARR} ${handle}`, 'fixed sub-path');
    }

    if (/[_/]/.test(data.handle)) {
      before = handle;
      handle = handle.replace(/[_/]/g, '-');
      log.warn(`handle ${CHV} ${before} ${ARR} ${handle}`, 'fixed invalid characters');
    }

    payload.handle = handle;

  } else {

    if (has('title', data)) {
      payload.handle = handleize(data.title);
    } else {
      payload.handle = file.name.toLowerCase();
    }

  }

  if (has('author', data) && $.page.author !== '') {

    let before: string;
    let author: string = data.author;

    if (/\//.test(data.author)) {
      before = data.author;
      author = before.replace(/\//g, ' ');
      log.warn(`author ${CHV} ${before} ${ARR} ${author}`, 'fixed invalid characters');
    }

    payload.author = author;

  } else {

    data.author = $.page.author;
  }

  if (has('published', data)) {

    if (isBoolean(data.published)) {
      payload.published = data.published;
    } else {
      log.warn(`published ${CHV} expected boolean, got ${typeof data.published}`, 'defaulted to false');
      payload.published = false;
    }

  } else {
    payload.published = true;
  }

  if (has('template_suffix', data)) {
    if (has('template', data)) {
      log.warn('duplicate template_suffix references', 'using template');
      delete data.template_suffix;
    } else {
      data.template = data.template_suffix;
      delete data.template_suffix;
    }
  }

  if (has('template', data)) {
    payload.template_suffix = data.template;
  } else {
    if ($.page.suffixDir && (isRegex($.page.global) && $.page.global.test(file.input) !== false)) {
      payload.template_suffix = lastPath(file.input);
    }
  }

  if (has('metafield', data)) {
    log.warn('use metafields instead of metafield', 'sync will still process');
    data.metafields = data.metafield;
    delete data.metafield;
  }

  if (has('metafields', data)) {

    // Convert metafield to array item if object
    // was passed in payload
    if (isObject(data.metafields)) {
      payload.metafields = [ data.metafields as unknown ] as PageMetafield[];
    }

  } else {
    payload.metafields = undefined;
  }

  return payload;

}

export async function compile (file: File, _cb: Syncify) {

  if ($.sync.stores.length > 1) {
    log.skipped(file, 'pages do not support multistore sync');
    return null;
  }

  const read = await readFile(file.input);

  if (isEmpty(read.toString())) {
    if ($.mode.watch) log.skipped(file, 'empty file');
    return null;
  }

  const frontmatter = matter(read) as { data: PageFrontmatter; content: string; };
  const { data, content } = merge(frontmatter);
  const payload = getPayloadFromFrontmatter(file, data);

  if (isArray(payload.metafields) && !getPageMetafields(file, payload.metafields)) {
    return null;
  }

  if (file.kind === Kind.Markdown) {
    timer.start();
    payload.body_html = markdown($.page.export).render(content);
    log.transform(`${c.bold('Markdown')} ${ARR} ${c.bold('HTML')} ${TLD} ${timer.stop()}`);
  } else {
    log.transform('HTML');
    payload.body_html = content;
  }

  const store = $.sync.stores[0];
  const shopName = store.store.toLowerCase();
  const remote = await pages.find(store, { handle: payload.handle });

  if (isArray(remote)) {

    log.invalid(file.relative, [
      `Multiple pages returned when matching on handle ${c.blue.bold(payload.handle)}`,
      'Syncify is unsure on how to handle this request and has cancelled the sync. Please',
      'check the provided handle in your webshop.'
    ]);

    return null;

  }

  let cached: Resource.Page = getPageCache(shopName);

  if (isObject(remote)) {
    payload.id = remote.id;
    cached = setPageCache(shopName, remote);
  }

  if (isUndefined(remote)) {

    if ($.page.safeSync) {

      const prompt = await promptAction(store);

      if (prompt.action === PromptActions.Select) {

        const action = await selectPage(store);

        if (action === PromptActions.Cancel) {

          return prompt.resume();

        } else if (action === PromptActions.Create) {

          prompt.resume();
          log.syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${c.gray(`${TLD} ${file.relative}`)}`);

          return pages.create(store, payload);

        } else {

          payload.id = action;
          prompt.resume();

        }

      } else if (prompt.action === PromptActions.Create) {

        prompt.resume();
        log.syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${c.gray(`${TLD} ${file.relative}`)}`);

        return pages.create(store, payload);

      } else {

        return prompt.resume();

      }
    }

  }

  if (isObject(remote)) {

    const online = new Date(remote.updated_at).getTime();
    const local = new Date(cached.updated_at).getTime();

    if (online > local && (remote.body_html !== payload.body_html)) {

      const prompt = await promptOverwrite(remote);

      if (prompt.action === PromptActions.Update) {

        prompt.resume();
        // log.updated(file, 'local source aligned with remote');

        let convert: string = remote.body_html;

        if ($.page.language === 'markdown') {
          const markdown = toMarkdown(convert);
          log.transform(`${file.name}.html ${ARR} ${file.base}`);
          convert = stringify('\n' + markdown, frontmatter.data);
        }

        ($.watch as WatchBundle).unwatch(file.input);

        await writeFile(file.input, convert);

        setPageCache(store.domain, remote);

        ($.watch as WatchBundle).add(file.input);

      } else if (prompt.action === PromptActions.Cancel) {

        return prompt.resume();

      } else if (prompt.action === PromptActions.Overwrite) {

        prompt.resume();

      }

    }

  }

  if ($.mode.build) return payload.body_html;

  log.syncing(`/pages/${payload.handle} ${ARR} ${payload.title} ${c.gray(`${TLD} ${file.relative}`)}`);

  const update = await pages.sync(store, file, payload);

  if (!update) return;

  await saveCache('pages');

}
