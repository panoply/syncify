const { defineConfig, markdown, search, sprite, terser } = require('e11ty');
const container = require('markdown-it-container');
const papyrus = require('papyrus');

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

function strip (input) {
  const output = input.replace(/\{([a-z]+)\}(.*?)/g, (_, language, code) => papyrus.inline(code, { language }));
  return output;
}

/**
 * Eleventy Build
 *
 * Generates SPX Documentation
 */
module.exports = defineConfig(function (config) {

  const md = markdown(config, {
    highlight: {
      block: ({
        raw,
        language
      }) => {

        return papyrus.highlight(raw, {
          language: language === 'js:no-lines' ? 'javascript' : language,
          lineNumbers: language === 'js:no-lines' ? false : (
            language === 'json' ||
            language === 'ts' ||
            language === 'typescript' ||
            language === 'javascript' ||
            language === 'js' ||
            language === 'liquid'
          )
        });
      },
      inline: ({
        raw,
        language
      }) => papyrus.inline(raw, { language })
    },
    anchors: {
      attrs: [
        [ 'spx-node', 'scrollspy.anchor' ]
      ]
    },
    options: {
      html: true,
      linkify: true,
      typographer: true,
      breaks: false
    }
  });

  md.use(container, 'tabs', { render: tabs });

  config.addLiquidShortcode('schema', () => '{% schema %}');
  config.addLiquidShortcode('endschema', () => '{% endschema %}');
  config.addPlugin(sprite, { inputPath: './src/assets/svg' });
  config.addPlugin(terser);
  config.addPassthroughCopy({ 'src/assets/fonts/': 'assets/fonts' });
  config.addPlugin(search, {
    minify: true,
    onHeading: strip,
    onContent: strip,
    ignore: {
      syntax: [
        /^<[a-z]/g,
        '{{',
        '{%',
        '::'
      ]
    }
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
      includes: 'include',
      layouts: '',
      data: 'data'
    }
  };
});
