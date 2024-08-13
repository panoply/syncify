import TurndownService from 'turndown';
import { highlightedCodeBlock } from './plugins/codeblock';
import { strikethrough } from './plugins/strikethrough';
import { tables } from './plugins/table';
import { taskListItems } from './plugins/tasklist';

export { default as Turndown } from 'turndown';

export function GithubFlavor (turndownService: TurndownService) {

  turndownService.use(
    [
      highlightedCodeBlock,
      strikethrough,
      tables,
      taskListItems
    ]
  );

}
