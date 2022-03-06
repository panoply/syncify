import { IFile, Syncify } from 'types';
import { readFile } from 'fs-extra';
import matter from 'gray-matter';
import { has } from 'rambdax';
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { transform } from 'options';

export async function toMarkdown (content: string) {

  const remark = unified()
    .use(rehypeParse) // Parse HTML to a syntax tree
    .use(rehypeRemark) // Turn HTML syntax tree to markdown syntax tree
    .use(remarkStringify) // Serialize HTML syntax tree
    .process(content)
    .catch((error) => {
      throw error;
    });

}

export async function toHTML (content: string) {

  const remark = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  return remark.process(content).catch((error) => {
    throw error;
  });

}

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
