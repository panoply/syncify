import type { Theme } from './$';
import type { XiorError } from 'xior';

export interface HttpParams<Query, Errors> {
  /**
   * The query variables
   */
  query: Query;
  /**
   * Reference to the current theme or store target
   */
  target: Theme;
  /**
   * List of the raw files ({@type File[]}) - Can be `null`
   */
  files: File[],
  /**
   * An onError callback which will be used on throws
   */
  onError: (errors: Errors) => void;
}

export interface RequestError extends XiorError {
  /**
   * The graph query object
   */
  isGraphError: boolean;
  /**
   * The graph query object
   */
  graph: string;
  /**
   * Theme target
   */
  target: Theme;
  /**
   * The {@link File} files provided
   */
  files: File[];
  /**
   * Graphql Errors - A list of all errors returned
   */
  errors: GraphqlError[]
}

export type HttpError<T> = (errors: T) => void
