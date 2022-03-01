import { readFile } from 'fs-extra';
import { marked } from 'marked';
import matter from 'gray-matter';
import { IFile, IMarkdown, Syncify } from 'types';
import { has } from 'rambdax';

export async function compile (file: IFile, config: IMarkdown, cb: typeof Syncify.hook) {

  const read = await readFile(file.path);

  const { data, content } = matter(read);

  if (!has('title', data)) throw console.log('Missing Title');

  config.baseUrl = has('base_url', data) ? data.base_url : null;
  config.headerIds = has('header_ids', data) ? data.header_ids : true;
  config.headerPrefix = has('header_prefix', data) ? data.header_prefix : '';

  marked.setOptions({ renderer: new marked.Renderer(), ...config });

  const body_html = marked.parse(content, (e, html) => {

    if (e) throw console.log(e);

    return html;

  });

  return {
    title: data.title,
    body_html
  };

}
