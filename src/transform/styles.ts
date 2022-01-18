import sass from 'node-sass';
import postcss from 'postcss';
import * as log from '../logs/console';
import { IFile, IBuildStyles } from '../typings';

export function compile (styles: IBuildStyles, file: IFile) {

  const style = styles.config.find(({ watch }) => watch(file.key));

  if (!style) return null;

  file.key = 'assets/' + (style.snippet === true
    ? (style.rename ? style.rename : file.base) + '.liquid'
    : (style.rename ? style.rename : file.base));

  try {
    const { css } = sass.renderSync({
      file: style.input,
      outputStyle: 'compressed',
      includePaths: style.include,
      outFile: file.key,
      sourceMap: true, // or an absolute or relative (to outFile) path
      importer: (url: string) => {

        if (
          url.startsWith('.') ||
        url.startsWith('url') ||
        url.startsWith('http')) return null;

        const clean = url.startsWith('~') ? url.replace('~', '') : url;

        try {

          const resolved = require.resolve(clean, { paths: [ style.input ] });

          return { file: resolved };

        } catch (e: any) {

          return null;

        }
      }
    });

    const string = typeof styles.postcss === 'object'
      ? postcss(styles.postcss.plugins).process(css.toString()).toString()
      : css.toString();

    return style.snippet
      ? '<style type="text/css">' + string + '</style>'
      : string;

  } catch (e) {

    return log.error({
      file: file.path,
      data: e.stack,
      message: e.message
    });

  }

}
