import { homedir } from 'node:os';

// HARD FORK OF: https://github.com/sindresorhus/clean-stack

interface CleanStackOptions {
  /**
  Prettify the file paths in the stack:

  `/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15` → `~/dev/clean-stack/unicorn.js:2:15`

  @default false
  */
  readonly pretty?: boolean;

  /**
  Remove the given base path from stack trace file paths, effectively turning absolute paths into relative ones.

  Example with `'/Users/sindresorhus/dev/clean-stack/'` as `basePath`:

  `/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15` → `unicorn.js:2:15`
  */
  readonly basePath?: string;

  /**
  Remove the stack lines where the given function returns `false`. The function receives the path part of the stack line.

  @example
  ```
  import cleanStack from 'clean-stack';

  const error = new Error('Missing unicorn');

  console.log(cleanStack(error.stack));
  // Error: Missing unicorn
  //     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
  //     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/omit-me.js:1:16)

  const pathFilter = path => !/omit-me/.test(path);

  console.log(cleanStack(error.stack, {pathFilter}));
  // Error: Missing unicorn
  //     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
  ```
  */
  readonly pathFilter?: (path: string) => boolean;
};

function escRegex (string: string) {

  if (typeof string !== 'string') throw new TypeError('Expected a string');

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when
  // the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

}

const extractPathRegex = /\s+at.*[(\s](.*)\)?/;
const pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;

export function cleanStack <T extends string | undefined> (
  stack: T,
  { pretty = false, basePath, pathFilter }: CleanStackOptions = {}
) {

  const basePathRegex = basePath && new RegExp(`(file://)?${escRegex(basePath.replace(/\\/g, '/'))}/?`, 'g');
  const homeDirectory = pretty ? homedir().replace(/\\/g, '/') : '';

  if (typeof stack !== 'string') {
    return undefined;
  }

  return stack.replace(/\\/g, '/')
  .split('\n')
  .filter(line => {

    const pathMatches = line.match(extractPathRegex);

    if (pathMatches === null || !pathMatches[1]) return true;

    const match = pathMatches[1];

    // Electron
    if (match.includes('.app/Contents/Resources/electron.asar') ||
        match.includes('.app/Contents/Resources/default_app.asar') ||
        match.includes('node_modules/electron/dist/resources/electron.asar') ||
        match.includes('node_modules/electron/dist/resources/default_app.asar')) return false;

    return pathFilter ? !pathRegex.test(match) && pathFilter(match) : !pathRegex.test(match);

  })
  .filter(line => line.trim() !== '')
  .map(line => {

    if (basePathRegex) line = line.replace(basePathRegex, '');

    if (pretty) {
      line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDirectory, '~')));
    }

    return line;

  })
  .join('\n');
}
