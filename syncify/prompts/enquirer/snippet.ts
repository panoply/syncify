import { Tree } from '@syncify/ansi';

/**
 * Snippet Renderer
 *
 * Hard-Forked variation of the snippet prompt plugin.
 * This is used to provide a TUI form-based prompt which
 * respect the Tree TUI interface.
 */
export async function render () {

  const { index, keys = [], submitted, size } = this.state;

  const newline = [ this.options.newline ].find(v => v != null);
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

  // Patch the body (see: https://t.ly/6D1Yc)
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
