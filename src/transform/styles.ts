import sass, { Options, renderSync } from 'node-sass';
import { join } from 'path';
import * as log from '../cli/console';
import { IFile, IStyles } from 'types';
import { readFile, writeFile } from 'fs-extra';
import Queue from 'p-queue';

// This queue makes sure node-sass leaves one thread available for executing fs tasks
// See: https://github.com/sass/node-sass/issues/857
const concurrency = Number(process.env.UV_THREADPOOL_SIZE) || 4;
const queue = new Queue({ concurrency: concurrency - 1 });

export function compile (file: IFile, scss: string, styles: IStyles, req) {

  const style = styles.compile[file.idx];
  const outFile = join(file.output, style.output);

  return queue.add(async () => {

    const { css, map } = sass.renderSync({
      data: scss,
      outFile,
      file: file.path,
      includePaths: style.include,
      outputStyle: 'compressed',
      indentedSyntax: false,
      omitSourceMapUrl: true,
      sourceMapContents: true,
      sourceMap: true, // or an absolute or relative (to outFile) path
      importer (url: string) {

        return url.startsWith('~') ? { file: url.replace('~', styles.node_modules) } : null;

      }
    });

    const string = styles.postcss ? await styles.postcss.process(css.toString(), {
      from: undefined,
      to: outFile,
      map: map.toString() ? {
        prev: map.toString(),
        inline: false
      } : null
    }) : css;

    const compiled = style.snippet ? '<style>' + string.toString() + '</style>' : string.toString();

    try {

      return Promise.all([
        await req.queue({
          method: 'put',
          data: {
            asset: {
              key: file.key,
              attachment: Buffer.from(compiled).toString('base64')
            }
          }
        }),
        await writeFile(outFile, compiled)
      // await writeFile(outFile + '.map', map)
      ]);

    } catch (e) {

      return log.error(e);

    }

  });

}
