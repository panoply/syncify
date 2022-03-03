import { readFile } from 'fs-extra';
import { marked } from 'marked';
import matter from 'gray-matter';
import { IFile, Syncify } from 'types';
import { has } from 'rambdax';
import { transform } from 'options';

export async function compile (file: IFile, cb: typeof Syncify.hook) {

  const read = await readFile(file.path);

  const { data, content } = matter(read);

  if (!has('title', data)) throw console.log('Missing Title');

  transform.pages.markdown.baseUrl = has('base_url', data) ? data.base_url : null;
  transform.pages.markdown.headerIds = has('header_ids', data) ? data.header_ids : true;
  transform.pages.markdown.headerPrefix = has('header_prefix', data) ? data.header_prefix : '';

  marked.setOptions({ renderer: new marked.Renderer(), ...transform.pages.markdown });

  const body_html = marked.parse(content, (e, html) => {

    if (e) throw console.log(e);

    return html;

  });

  return {
    title: data.title,
    body_html
  };

}
