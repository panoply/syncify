import test from 'ava';
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeHeadings from 'rehype-autolink-headings';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { readFileSync } from 'fs';

async function toHTML (content) {

  const options = {
    linkHeadings: true,
    highlight: true
  };

  const remark = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  if (options.highlight) {
    remark.use(rehypeHighlight, { ignoreMissing: true });
  }

  if (options.linkHeadings) {
    remark.use(rehypeSlug).use(rehypeHeadings);
  }

  return remark.process(content).catch((error) => {
    throw error;
  });

}

async function toMarkdown (content) {

  return unified()
    .use(rehypeParse) // Parse HTML to a syntax tree
    .use(rehypeRemark) // Turn HTML syntax tree to markdown syntax tree
    .use(remarkStringify) // Serialize HTML syntax tree
    .process(content)
    .catch((error) => {
      throw error;
    });

}

test('Convert HTML to Markdown', async t => {

  const example = readFileSync('./transforms/markdown/html.txt').toString();
  const parsed = await toHTML(example);

  process.stdout.write('\n\n' + String(parsed) + '\n\n');
  t.pass();

});

test('Convert Markdown to HTML', async t => {

  const example = readFileSync('./transforms/markdown/markdown.txt').toString();
  const parsed = await toMarkdown(example);

  process.stdout.write('\n\n' + String(parsed) + '\n\n');
  t.pass();

});
