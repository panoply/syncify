/* eslint-disable no-unused-expressions */
const { eleventy, terser, sprite, markdown, util } = require('e11ty');
const papyrus = require('papyrus');
const container = require('markdown-it-container');
const attrs = require('markdown-it-attrs');
const anchor = require('markdown-it-anchor');
const { readFile, writeFile } = require('node:fs/promises');
const { marked } = require('marked');
const matter = require('gray-matter');

/**
 * @param {string[]} tokens
 * @param {number} index
 * @returns
 */
function tabs (tokens, index) {

  if (tokens[index].nesting === 1) {

    const col = tokens[index].info.trim().match(/^tabs\s+(.*)$/);

    if (col !== null) {

      // opening tag
      return col[1] === 'template' ? [
        /* html */`
        <div spx-component="tabs">
          <div class="row gx-0 bd tabs py-2 px-2">
            <div class="col-auto mr-2">
              <button
                type="button"
                class="btn upper tab active"
                spx-node="tabs.button"
                spx@click="tabs.toggle"
                spx-tabs:index="0">
                Template
              </button>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn upper tab"
                spx-node="tabs.button"
                spx@click="tabs.toggle"
                spx-tabs:index="1">
                Component
              </button>
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn upper tab"
                spx-node="tabs.button"
                spx@click="tabs.toggle"
                spx-tabs:index="2">
                Example
              </button>
            </div>
          </div>
          <div
            class="col-12 tab-content"
            spx-node="tabs.panel">
        `
      ].join('') : [
        /* html */`
          <div
            class="col-12 tab-content d-none"
            spx-node="tabs.panel">
        `
      ].join('');
    }
  }

  return '</div>';

}

/**
 * @param {EleventyConfig} config
 */
function search (config) {

  const page = [];

  config.on('eleventy.after', async () => {
    if (page.length > 0) {
      const content = JSON.stringify(page, null, 2);
      await writeFile('./public/spx.json', content);
    }
  });

  return async function (content) {

    let data;
    let heading;
    let anchor;

    const records = new Map();
    const read = await readFile(this.page.inputPath);
    const parse = marked.lexer(read.toString());
    const frontmatter = parse[0].type === 'hr'
      ? parse.splice(0, 2).map(({ raw }) => raw).join('\n')
      : null;

    if (frontmatter !== null) {

      data = matter(frontmatter).data;

    }

    parse.forEach(token => {

      if (token.text && token.text.length > 0) {
        if (token.type === 'heading') {

          if (token.text.toLowerCase().includes('acknowledgements')) return;

          heading = token.text.replace(/[`_*]/g, '');
          anchor = util.slug(heading);

          if (!records.has(heading)) records.set(heading, { anchor, content: '' });

        } else if (token.type === 'paragraph') {

          if (!/^({{|{%|<[a-z]|:::)/.test(token.text) && heading) {
            records.get(heading).content = token.text
              .replace(/[`_*]/g, '')
              .replace(/\[([a-z].*?)\]\(.*?\)/g, '$1');
          }

        }
      }

    });

    for (const [ heading, { anchor, content } ] of records) {
      page.push({
        title: data.title,
        heading,
        content,
        url: heading ? `${this.page.url.slice(0, -1)}#${anchor}` : this.page.url
      });
    }

  };

}

/**
 * Eleventy Build
 *
 * Generates SPX Documentation
 */
module.exports = eleventy(function (config) {

  const md = markdown(config, {
    highlight: {
      block: ({ raw, language }) => papyrus.highlight(raw, {
        language,
        lineNumbers: language !== 'bash'
      }),
      inline: ({ raw, language }) => papyrus.inline(raw, { language })
    },
    options: {
      html: true,
      linkify: true,
      typographer: true,
      breaks: false,
    }
  });

  md.use(anchor, {
    slugify: util.slug,
    callback: token => token.attrs.push([ 'spx-node', 'scrollspy.anchor' ])
  });

  md.use(container, 'tabs', { render: tabs });
  md.use(attrs);
  md.disable('code');

  config.setLiquidOptions({
      jsTruthy: true,
  })
  config.addLiquidShortcode('schema', () => {})
  config.addLiquidShortcode('endschema',  () => {})
  config.addFilter('anchor', (value) => `#${util.slug(value)}`);
  config.addLiquidShortcode('search', search(config));
  config.addPlugin(sprite, { inputPath: './src/assets/svg', spriteShortCode: 'sprite' });
  config.addPlugin(terser);
  config.addPassthroughCopy({
    'src/assets/fonts/': 'assets/fonts'
  });

  return {
    htmlTemplateEngine: 'liquid',
    passthroughFileCopy: false,
    pathPrefix: '',
    templateFormats: [
      'liquid',
      'json',
      'md',
      'html',
      'yaml'
    ],
    dir: {
      input: 'src/views',
      output: 'public',
      includes: '',
      layouts: '',
      data: 'data'
    }
  };
});
