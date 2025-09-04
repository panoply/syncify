export class AcquireError extends Error {

  /**
   * The error type
   */
  type: string;
  /**
   * The error summary, will be used as heading
   */
  summary: string;
  /**
   * The error message
   */
  message: string;
  /**
   * Entries, with additional information
   */
  context: Record<string, any>;
  /**
   * The stack trace
   */
  stack: string;

  constructor (error: any, entries: { [name: string]: any; } = {}) {

    super(error);

    const message = error.message.trim().split('\n');

    if (error?.code) {
      this.summary = 'SYNCIFY CONFIG ERROR';
      this.message = message[0];
      this.context = { code: error.code.replace(/_/g, ' '), ...entries };
    } else {
      this.message = message[0];
      this.context = entries;
    }

    this.type = error.name.replace(/(?<=[a-z])([A-Z])/g, ' $1') || 'Unknown Error';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AcquireError);
    }

  }

}
