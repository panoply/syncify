import TurndownService from 'turndown';

export function strikethrough (turndown: TurndownService) {

  turndown.addRule('strikethrough', {
    filter: [ 's', 'del' ],
    replacement: content => `~${content}~`
  });

}
