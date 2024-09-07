import TurndownService from 'turndown';

export function tables (turndownService: TurndownService) {

  const { indexOf, every } = Array.prototype;

  // A tr is a heading row if:
  // - the parent is a THEAD
  // - or if its the first child of the TABLE or the first TBODY (possibly
  //   following a blank THEAD)
  // - and every cell is a TH
  function isHeadingRow (tr: TurndownService.Node) {

    if (tr.parentNode === null) return false;
    if (tr.parentNode.nodeName === 'THEAD') return true;

    return (
      (tr.parentNode.firstChild === tr) &&
      (tr.parentNode.nodeName === 'TABLE' || isFirstTbody(tr.parentNode as unknown as HTMLElement)) &&
      (every.call(tr.childNodes, (n: TurndownService.Node) => n.nodeName === 'TH')));

  }

  /**
   * Whether or not `<tbody>` exists
   */
  function isFirstTbody (node: TurndownService.Node) {

    if (node.nodeName === 'TBODY') {

      if (node.previousSibling === null) return true;

      if (node.previousSibling.nodeName === 'THEAD' && node.previousSibling.textContent !== null) {
        return /^\s*$/i.test(node.previousSibling.textContent);
      }
    }

    return false;

  }

  /**
   * Generates a markdown cell
   */
  function cell (content: string, node: null | TurndownService.Node, index?: number) {

    if (index === null && node !== null && node.parentNode !== null) {
      index = indexOf.call(node.parentNode.childNodes, node);
    }

    let prefix: string = ' ';
    let filter: string = '';

    if (index === 0) prefix = '| ';

    filter = content.trim().replace(/\n\r/g, '<br>').replace(/\n/g, '<br>');
    filter = filter.replace(/\|+/g, '\\|');

    while (filter.length < 3) filter += ' ';

    if (node) filter = handleColSpan(filter, node, ' ');

    return prefix + filter + ' |';
  }

  function nodeContainsTable (node: TurndownService.Node) {

    if (!node.childNodes) return false;

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeName === 'TABLE') return true;
      if (nodeContainsTable(child as unknown as HTMLElement)) return true;
    }

    return false;
  }

  /**
   * Various conditions under which a table should be skipped - i.e. each cell
   * will be rendered one after the other as if they were paragraphs.
   */
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
    replacement (content: string, node: any) {

      const parentTable = nodeParentTable(node);

      if (tableShouldBeSkipped(parentTable)) return content;

      let borderCells = '';
      const alignMap = { left: ':--', right: '--:', center: ':-:' };

      if (isHeadingRow(node)) {

        const colCount = tableColCount(parentTable);

        for (let i = 0; i < colCount; i++) {

          let border = '---';

          const childNode = colCount >= node.childNodes.length ? null : node.childNodes[i];
          const align = childNode ? (childNode.getAttribute('align') || '').toLowerCase() : '';

          if (align) border = alignMap[align] || border;

          borderCells += childNode ? cell(border, node.childNodes[i]) : cell(border, null, i);
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
