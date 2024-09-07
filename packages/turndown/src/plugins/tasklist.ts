import TurndownService from 'turndown';

export function taskListItems (turndownService: TurndownService) {

  turndownService.addRule('taskListItems', {
    filter (node) {
      return node.parentNode !== null
        ? node.getAttribute('type') === 'checkbox' && node.parentNode.nodeName === 'LI'
        : false;
    },
    replacement (_content, node) {
      const { checked } = node as HTMLInputElement;
      return checked ? '[x] ' : '[ ] ';
    }
  });

}
