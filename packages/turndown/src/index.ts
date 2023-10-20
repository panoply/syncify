import TurndownService from 'turndown';

function taskListItems (turndownService: TurndownService) {

  turndownService.addRule('taskListItems', {
    filter: function (node: any) {
      return node.type === 'checkbox' && node.parentNode.nodeName === 'LI';
    },
    replacement: function (_content, node: any) {
      return (node.checked ? '[x]' : '[ ]') + ' ';
    }
  });
}

function highlightedCodeBlock (turndownService: TurndownService) {

  const highlight = /highlight-(?:text|source)-([a-z0-9]+)/;

  turndownService.addRule('highlightedCodeBlock', {

    filter: function (node) {

      return <boolean>(
        node.nodeName === 'DIV' &&
        highlight.test(node.className) &&
        node.firstChild &&
        node.firstChild.nodeName === 'PRE'
      );

    },
    replacement: function (_content, node, options) {

      const className = (node as any).className || '';
      const language = (className.match(highlight) || [ null, '' ])[1];

      return (
        '\n\n' + options.fence + language + '\n' +
        (node.firstChild === null ? '' : node.firstChild.textContent) +
        '\n' + options.fence + '\n\n'
      );
    }
  });
}

function strikethrough (turndownService: TurndownService) {

  turndownService.addRule('strikethrough', {
    filter: [ 'del', 's', 'strike' as any ],
    replacement: function (content) {
      return '~' + content + '~';
    }
  });

}

function tables (turndownService: TurndownService) {

  const { indexOf, every } = Array.prototype;

  // A tr is a heading row if:
  // - the parent is a THEAD
  // - or if its the first child of the TABLE or the first TBODY (possibly
  //   following a blank THEAD)
  // - and every cell is a TH
  function isHeadingRow (tr: TurndownService.Node) {

    const parentNode = tr.parentNode;

    return parentNode === null ? false : (
      parentNode.nodeName === 'THEAD' ||
      (
        parentNode.firstChild === tr &&
        (parentNode.nodeName === 'TABLE' || isFirstTbody(parentNode)) &&
        every.call(tr.childNodes, function (n: TurndownService.Node) { return n.nodeName === 'TH'; })
      )
    );
  }

  function isFirstTbody (element) {
    const previousSibling = element.previousSibling;
    return (
      element.nodeName === 'TBODY' && (
        !previousSibling ||
        (previousSibling.nodeName === 'THEAD' && /^\s*$/i.test(previousSibling.textContent))
      )
    );
  }

  function cell (content: string, node: any, index?: number) {

    if (index === null) index = indexOf.call(node.parentNode.childNodes, node);

    let prefix = ' ';
    if (index === 0) prefix = '| ';

    let filteredContent = content.trim().replace(/\n\r/g, '<br>').replace(/\n/g, '<br>');
    filteredContent = filteredContent.replace(/\|+/g, '\\|');

    while (filteredContent.length < 3) filteredContent += ' ';

    if (node) filteredContent = handleColSpan(filteredContent, node, ' ');
    return prefix + filteredContent + ' |';
  }

  function nodeContainsTable (node: any) {

    if (!node.childNodes) return false;

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeName === 'TABLE') return true;
      if (nodeContainsTable(child)) return true;
    }
    return false;
  }

  // Various conditions under which a table should be skipped - i.e. each cell
  // will be rendered one after the other as if they were paragraphs.
  function tableShouldBeSkipped (tableNode: any) {

    if (!tableNode) return true;
    if (!tableNode.rows) return true;
    if (tableNode.rows.length === 1 && tableNode.rows[0].childNodes.length <= 1) return true;
    if (nodeContainsTable(tableNode)) return true;

    return false;
  }

  function nodeParentTable (node: TurndownService.Node): any {

    let parent = node.parentNode;

    if (parent === null) return null;

    while (parent.nodeName !== 'TABLE') {
      parent = parent.parentNode;
      if (!parent) return null;
    }

    return parent;
  }

  function handleColSpan (content: string, node: any, emptyChar: string) {

    const colspan = Number(node.getAttribute('colspan')) || 1;

    for (let i = 1; i < colspan; i++) content += ' | ' + emptyChar.repeat(3);

    return content;
  }

  function tableColCount (node: any) {
    let maxColCount = 0;
    for (let i = 0; i < node.rows.length; i++) {
      const row = node.rows[i];
      const colCount = row.childNodes.length;
      if (colCount > maxColCount) maxColCount = colCount;
    }
    return maxColCount;
  }

  turndownService.keep(function (node) {

    return node.nodeName === 'TABLE';

  });

  turndownService.addRule('tableCell', {
    filter: [ 'th', 'td' ],
    replacement: function (content, node) {
      if (tableShouldBeSkipped(nodeParentTable(node))) return content;
      return cell(content, node);
    }
  });

  turndownService.addRule('tableRow', {
    filter: 'tr',
    replacement: function (content: string, node: any) {

      const parentTable = nodeParentTable(node);

      if (tableShouldBeSkipped(parentTable)) return content;

      let borderCells = '';
      const alignMap = { left: ':--', right: '--:', center: ':-:' };

      if (isHeadingRow(node)) {
        const colCount = tableColCount(parentTable);
        for (let i = 0; i < colCount; i++) {
          const childNode = colCount >= node.childNodes.length ? null : node.childNodes[i];
          let border = '---';
          const align = childNode ? (childNode.getAttribute('align') || '').toLowerCase() : '';

          if (align) border = alignMap[align] || border;
          if (childNode) {
            borderCells += cell(border, node.childNodes[i]);
          } else {
            borderCells += cell(border, null, i);
          }
        }
      }
      return '\n' + content + (borderCells ? '\n' + borderCells : '');
    }
  });

  turndownService.addRule('tableSection', {
    filter: [ 'thead', 'tbody', 'tfoot' ],
    replacement: function (content) {
      return content;
    }
  });

  turndownService.addRule('table', {
    // Only convert tables with a heading row.
    // Tables with no heading row are kept using `keep` (see below).
    filter: function (node) {
      return node.nodeName === 'TABLE';
    },

    replacement: function (content, node) {
      if (tableShouldBeSkipped(node)) return content;

      // Ensure there are no blank lines
      content = content.replace(/\n+/g, '\n');

      // If table has no heading, add an empty one so as to get a valid Markdown table
      let secondLine: any = content.trim().split('\n');
      if (secondLine.length >= 2) secondLine = secondLine[1];
      const secondLineIsDivider = secondLine.indexOf('| ---') === 0;
      const columnCount = tableColCount(node);
      let emptyHeader = '';

      if (columnCount && !secondLineIsDivider) {
        emptyHeader = '|' + '     |'.repeat(columnCount) + '\n' + '|' + ' --- |'.repeat(columnCount);
      }

      return '\n\n' + emptyHeader + content + '\n\n';
    }
  });

}

export { default as Turndown } from 'turndown';

export function gfm (turndownService: TurndownService) {

  turndownService.use([
    highlightedCodeBlock,
    strikethrough,
    tables,
    taskListItems
  ]);

}
