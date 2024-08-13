import TurndownService from 'turndown';

export function highlightedCodeBlock (turndownService: TurndownService) {

  const highlight = /highlight-(?:text|source)-([a-z0-9]+)/;

  turndownService.addRule('codeblock', {

    filter (node) {

      return <boolean>(
        node.nodeName === 'DIV' &&
        highlight.test(node.className) &&
        node.firstChild &&
        node.firstChild.nodeName === 'PRE'
      );

    },
    replacement (_content, node, options) {

      const className = (node as TurndownService.Node).className || '';
      const language = (className.match(highlight) || [ null, '' ])[1];

      return (
        '\n\n' + options.fence + language + '\n' +
        (node.firstChild === null ? '' : node.firstChild.textContent) +
        '\n' + options.fence + '\n\n'
      );
    }
  });
}
