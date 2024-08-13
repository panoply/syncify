import TurndownService from 'turndown';

export function strikethrough (turndownService: TurndownService) {

  turndownService.addRule('strikethrough', {
    filter: [ 'del', 's', 'strike' as any ],
    replacement (content) {

      return '~' + content + '~';

    }
  });

}
