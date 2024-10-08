import { gray, lightGray, neonGreen, red, Tree, yellowBright } from '@syncify/ansi';
import { Choice } from 'types/internal/enquirer';

export async function render () {

  const { index, keys = [], submitted, size } = this.state;

  const newline = [ this.options.newline, '\n' ].find(v => v != null);
  const prefix = await this.prefix();
  const separator = await this.separator();
  const message = await this.message();

  let prompt = [
    prefix,
    message,
    separator
  ].filter(Boolean).join(' ');

  this.state.prompt = prompt;

  const header = await this.header();
  const error = (await this.error()) || '';
  const hint = (await this.hint()) || '';
  const body = submitted ? '' : await this.interpolate(this.state);

  const key = this.state.key = keys[index] || '';
  const input = await this.format(key);
  const footer = await this.footer();

  if (input) prompt += ' ' + input;
  if (hint && !input && this.state.completed === 0) prompt += ' ' + hint;

  this.clear(size);

  // Patch the body
  // https://github.com/enquirer/enquirer/blob/70bdb0fedc3ed355d9d8fe4f00ac9b3874f94f61/lib/prompts/snippet.js#L146
  const lines = [
    header,
    prompt,
    body.split('\n').join(Tree.next),
    footer,
    error.trim()
  ];

  this.write(lines.filter(Boolean).join(newline));
  this.restore();

}

export const theme = {
  pointer (choice: Choice, i: number): string {
    const item = this.state.index === i ? lightGray('├ ') : lightGray('│ ');
    return i === 0 ? lightGray('│ ') + NWL + item : item;
  },
  prefix: lightGray('│ '),
  styles: {
    primary: neonGreen,
    success: neonGreen,
    danger: red.bold,
    warning: yellowBright,
    muted: gray,
    disabled: gray,
    typing: gray
  },
  symbols: {
    ellipsisLarge: '',
    ellipsisSmall: '',
    prefix: {
      pending: '',
      submitted: '✓',
      cancelled: '𐄂'
    },
    separator: {
      pending: '',
      submitted: ' → ',
      cancelled: ' 𐄂 '
    }
  }
};
