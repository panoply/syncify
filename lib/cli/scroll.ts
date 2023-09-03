import { type Options as WrapOptions } from 'wrap-ansi';
import wrapAnsi from 'wrap-ansi';

/**
 * Options for the Scrollable class.
 */
export type ScrollableOptions = {
    /**
     * The content to display in the scrollable area.
     * @default undefined
     */
    content?: string;

    /**
     * The starting position of the scrollable area.
     * @default { x: 0, y: 0 }
     */
    start: { x: number; y: number };

    /**
     * The size of the scrollable area.
     * @default { width: process.stdout.columns, height: process.stdout.rows }
     */
    size: { width: number; height: number };

    /**
     * Options for wrapping the content in the scrollable area.
     * @default { hard: false, wordWrap: true, trim: true }
     */
    wrapOptions: WrapOptions;
};

/**
 * A scrollable area that can be printed to the console.
 */
export const scroll = (options: ScrollableOptions) => new class Scrollable {

  private lines: string[] = [];
  private currentLine = 0;
  private _options: ScrollableOptions;

  /**
     * The options for the Scrollable instance.
     */
  get options (): ScrollableOptions {
    return this._options;
  }

  /**
     * Creates a new Scrollable instance.
     * @param options - The options for the Scrollable instance.
     */
  constructor (options?: Partial<ScrollableOptions>) {
    this._options = {
      content: options?.content,
      start: {
        x: options?.start?.x ?? 0,
        y: options?.start?.y ?? 0
      },
      size: {
        width: options?.size?.width ?? process.stdout.columns,
        height: options?.size?.height ?? process.stdout.rows
      },
      wrapOptions: {
        hard: options?.wrapOptions?.hard ?? false,
        wordWrap: options?.wrapOptions?.wordWrap ?? true,
        trim: options?.wrapOptions?.trim ?? true
      }
    };
  }

  /**
     * Sets the content to display in the scrollable area.
     * @param content - The content to display.
     * @returns The Scrollable instance.
     */
  setContent (content: string): this {
    this._options.content = content;
    this.resetLines();
    return this;
  }

  /**
     * Sets the starting position of the scrollable area.
     * @param start - The starting position.
     * @returns The Scrollable instance.
     */
  setStart (start: { x: number; y: number }): this {
    this._options.start = start;
    this.resetLines();
    return this;
  }

  /**
     * Sets the size of the scrollable area.
     * @param size - The size.
     * @returns The Scrollable instance.
     */
  setSize (size: { width: number; height: number }): this {
    this._options.size = size;
    this.resetLines();
    return this;
  }

  /**
     * Sets the options for wrapping the content in the scrollable area.
     * @param wrapOptions - The options for wrapping the content.
     * @returns The Scrollable instance.
     */
  setWrapOptions (wrapOptions: WrapOptions): this {
    this._options.wrapOptions = wrapOptions;
    this.resetLines();
    return this;
  }

  /**
     * Prints the scrollable area to the console.
     * @returns The Scrollable instance.
     */
  print (): this {
    if (this.lines.length == 0) this.splitContentIntoLines();
    const { x, y } = this._options.start;
    const { width, height } = this._options.size;
    const emptyLine = Array(width).fill(' ').join('');

    // Clear the area.
    this.clear();

    process.stdout.cursorTo(x, y);
    for (let i = 0; i < height; i++) {
      const line = this.lines[i + this.currentLine];
      process.stdout.cursorTo(x);

      console.log(line ?? emptyLine);
    }

    return this;
  }

  /**
     * Scrolls by the specified number of lines.
     * @param lines - The number of lines to scroll.
     * @returns The Scrollable instance.
     */
  scroll (lines: number): this {
    this.currentLine += lines;
    return this;
  }

  /**
     * Clears the scrollable area.
     * @returns The Scrollable instance.
     */
  clear (): this {
    const { x, y } = this._options.start;
    const { width, height } = this._options.size;
    const emptyLine = Array(width).fill(' ').join('');
    process.stdout.cursorTo(x, y);

    for (let i = 0; i < height; i++) {
      process.stdout.cursorTo(x);
      console.log(emptyLine);
    }

    return this;
  }

  private resetLines (): void {
    this.lines = [];
    this.currentLine = 0;
  }

  private splitContentIntoLines (): void {
    if (!this._options.content) return;

    const wrapped = wrapAnsi(
      this._options.content,
      this._options.size.width,
      this._options.wrapOptions
    );
    this.lines = wrapped.split('\n');
  }

}(options);
