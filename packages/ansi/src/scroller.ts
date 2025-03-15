import { emitKeypressEvents } from 'node:readline';

import { type Options as WrapOptions } from 'wrap-ansi';
import wrap from 'wrap-ansi';

import { glue } from '@syncify/glue';

import { WSP } from './characters';
import { Tree } from './tree';

/**
 * Options for the Scroller class.
 */
interface ScrollerOptions {
  /**
   * The content to display in the scrollable area.
   *
   * @default undefined
   */
  input?: string[] | string;
  /**
   * Whether or not each write to `stdout` should append `\n`
   * character and simulate native `console.log`.
   *
   * @default true
   */
  newline?: boolean;
  /**
   * Whether or not Tree line prefixing applies
   *
   * @default false
   */
  tree?: boolean;
  /**
   * Starting X position of scroller
   *
   * @default 0
   */
  xPos?: number;
  /**
   * Position Y position of scroller
   *
   * @default 0
   */
  yPos?: number
  /**
   * The width of the scrollable box
   *
   * @default process.stdout.columns - 15;
   */
  width?: number;
  /**
   * The height of the scrollable box
   *
   * @default process.stdout.rows - 15;
   */
  height?: number
  /**
   * Whether or not ansi word wrapping applies
   *
   * @default false
   */
  wrap?: boolean;
};

/**
 * A scrollable area that can be printed to the console.
 */
class Scroller {

  /**
   * The lines of content in the scrollable area wrapped
   * according to the specified {@link ScrollerOptions} and
   * split into an array of lines.
   */
  lines: string[] = [];

  /**
   * The maximum height
   */
  maxHeight: number;

  /**
   * The content to display in the scrollable area.
   *
   * @default undefined
   */
  content: string;

  /**
   * Whether or not each write to `stdout` should append `\n`
   * character and simulate native `console.log`.
   */
  newline: string;

  /**
   * The position of the first line to display in the scrollable area.
   */
  position: number = 0;

  /**
   * The tree line prefix character
   */
  private prefix: string;

  /**
   * The line suffix, when `newline` is `true` this is `\n` otherwise empty string
   */
  private suffix: string;

  /**
   * An empty line
   */
  private empty: string;

  /**
   * Word Wrap options
   */
  private wrap: WrapOptions = {
    hard: false,
    trim: true,
    wordWrap: true
  };

  /**
   * The options for the Scroller instance.
   */
  options: ScrollerOptions = {
    input: undefined,
    newline: true,
    height: process.stdout.rows - 20,
    width: process.stdout.columns - 20,
    wrap: false,
    tree: false,
    xPos: 0,
    yPos: 0
  };

  /**
   * The height of the content
   */
  get height (): number { return this.options.height; }

  /**
   * The width of the content
   */
  get width (): number { return this.options.width; }

  /**
   * X position of scroller
   */
  get x (): number { return this.options.xPos; }
  /**
   * Set X position of scroller
   */
  set x (x: number) { this.options.xPos = x; }
  /**
   * Y position of scroller
   */
  get y (): number { return this.options.yPos; }
  /**
   * Set Y position of scroller
   */
  set y (y: number) { this.options.yPos = y; }

  /**
   * Creates a new Scroller instance.
   * @param options - The options for the Scroller instance.
   */
  constructor (options?: ScrollerOptions) {

    Object.assign(this.options, options);

    this.prefix = this.options.tree ? Tree.line : '';
    this.suffix = this.options.newline ? '\n' : '';
    this.empty = glue(Array(this.width).fill(WSP));

    if (typeof this.options.input === 'string') {
      this.content = this.options.input;
    } else {
      this.content = glue.nl(this.options.input);
      this.lines = this.options.input;
    }

    this.options.height = 'height' in options ? options.height : this.content.split('\n').length;
    this.maxHeight = this.content.split('\n').length - this.options.height - 1;

  }

  setKeypress (y: number, max: number) {

    process.stdin.setRawMode(true);

    emitKeypressEvents(process.stdin);

    return process.stdin.on('keypress', (str, key) => {

      if (
        key.sequence === '\u0003' ||
        key.sequence === '\u0004' ||
        key.sequence === '\u001a') {

        process.exit(0);

      } else if (key.name === 'up') {

        if (this.position === 0) return;

        this.scroll(-2).print();
        process.stdout.cursorTo(0, y + 2);

      } else if (key.name === 'down') {

        if (this.position >= max) return;

        this.scroll(2).print();
        process.stdout.cursorTo(0, y + 2);

      }

    });

  }

  /**
   * Sets the content to display in the scrollable area.
   */
  setContent (content: string): Scroller {

    this.content = content;
    this.resetLines();

    return this;

  }

  /**
   * Sets the `x` and/or `y`position of the scrollable area.
   */
  setPosition (position: { x?: number, y?: number } = {}): Scroller {

    if ('x' in position) this.x = position.x;
    if ('y' in position) this.y = position.y;

    this.resetLines();

    return this;
  }

  /**
   * Sets the size of the scroller area.
   */
  setSize (size: { width?: number; height?: number }): Scroller {

    if ('width' in size) this.options.width = size.width;
    if ('height' in size) this.options.height = size.height;

    this.resetLines();

    return this;

  }

  /**
   * Sets the options for wrapping the content in the scrollable area.
   */
  setWrap (wrapOptions: boolean | WrapOptions): Scroller {

    if (typeof wrapOptions === 'boolean') {
      this.options.wrap = wrapOptions;
    } else {
      if (!this.options.wrap) this.options.wrap = true;
      Object.assign(this.wrap, wrapOptions);
    }

    if (this.options.wrap) this.resetLines();

    return this;
  }

  /**
   * Prints the scrollable area to the console.
   * @returns The Scroller instance.
   */
  print (): this {

    if (this.lines.length === 0) this.splitContentIntoLines();

    this.clear(); // Clear the area.

    process.stdout.cursorTo(this.x, this.y);

    for (let i = 0; i < this.height; i++) {
      const line = this.lines[i + this.position];
      process.stdout.write(this.prefix + (line ?? this.empty) + this.suffix);
    }

    return this;
  }

  /**
   * Scrolls by the specified number of lines.
   */
  scroll (lines: number): this {

    this.position += lines;

    return this;

  }

  /**
   * Clears the scrollable area.
   */
  clear (): this {

    process.stdout.cursorTo(this.x, this.y);

    for (let i = 0; i < this.height; i++) {
      process.stdout.cursorTo(this.x);
      process.stdout.write(this.empty + '\n');
    }

    return this;
  }

  private resetLines (): void {

    this.lines = [];
    this.position = 0;

  }

  private splitContentIntoLines (): void {

    if (!this.content) return;

    if (this.options.wrap) {
      this.lines = wrap(this.content, this.width, this.wrap).split('\n');
    } else {
      this.lines = this.content.split('\n');
    }
  }

}

/**
 * Generates a scrollable area
 */
export function Scroll (options: ScrollerOptions): Scroller {

  return new Scroller(options);

}
