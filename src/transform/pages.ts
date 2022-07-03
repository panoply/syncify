import { IFile, IPages, Syncify } from 'types';
import { readFile, writeFile } from 'fs-extra';
import { join } from 'path';
import matter from 'gray-matter';
import { has } from 'rambdax';
import Turndown from 'turndown';
import gfm from 'turndown-plugin-gfm';
import Markdown from 'markdown-it';
import { transform, bundle } from '../options/index';
import { log, c } from '../cli/log';

export async function toMarkdown (content: string) {

  const td = new Turndown(transform.pages.turndown);

  td.use(gfm);

  return td.turndown(content);

}

export async function compile (file: IFile<IPages>, cb: Syncify) {

  log(file.namespace, c.cyan(file.key));

  const read = await readFile(file.input);
  const { data, content } = matter(read);

  if (!has('title', data)) {

    throw log.error('Missing Title');

  }

  if (has('html', data)) {
    transform.pages.markdown.html = data.html;
  }

  if (has('linkify', data)) {
    transform.pages.markdown.linkify = data.linkify;
  }

  if (has('breaks', data)) {
    transform.pages.markdown.breaks = data.breaks;
  }

  const body_html = Markdown(transform.pages.markdown).render(content);

  await writeFile(join(bundle.dirs.cache, 'pages', file.base), body_html);

  return {
    title: data.title,
    body_html
  };

}
