export class AcquireError extends Error {

  /**
   * The original error
   */
  original: any;
  /**
   * The type of error
   */
  type: string;
  /**
   * The error message
   */
  message: string;
  /**
   * Entries, with additional information
   */
  entries: Record<string, any>;
  /**
   * The stack trace
   */
  stack: string;

  constructor (message: string, context: {
    type: string;
    entries: { [name: string]: any; }
    error: any
  }) {

    super(message);

    this.name = this.constructor.name;
    this.original = context.error;
    this.type = context.type;
    this.entries = context.entries;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AcquireError);
    } else {
      this.stack = (new Error(message)).stack;
    }

  }

}
