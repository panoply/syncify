export class JSONError extends Error {

  source = '';
  line: number;
  column: number;
  details: string;

  constructor (message: string, {
    source = '',
    line = -1,
    column = -1,
    details = null
  } = {}) {

    super(message);

    this.source = source;
    this.line = line;
    this.column = column;
    this.details = details;

  }

}

/**
 * Obtains the line number and column number from errors thrown by JSON Comments.
 */
export const getPosition = (json: string, error: any) => {

  const position = <{ line: number; column: number; }>{
    line: NaN,
    column: NaN
  };

  if ('line' in error) {
    position.line = error.line;
  } else if ('lineNumber' in error) {
    position.line = error.lineNumber;
  }

  if ('column' in error) {
    position.column = error.column;
  }

  if (isNaN(position.column)) {
    if ('index' in error) {
      const lastNewlineIndex = json.lastIndexOf('\n', error.index);
      position.column = lastNewlineIndex === -1 ? error.index + 1 : error.index - lastNewlineIndex;
    }
  }

  return position;
};

/**
 * Obtains the error message which can be either under description or message.
 */
export const getMessage = (error: any) => {

  let message = '';

  if ('description' in error) {
    message = error.message;
  } else if ('message' in error) {
    message = error.message;
  }

  /* -------------------------------------------- */
  /* ENHANCE MESSAGE                              */
  /* -------------------------------------------- */

  return message;

};
