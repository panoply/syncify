import FontFaceObserver from 'fontfaceobserver';

export default async function (font: { heading: string, body: string }) {

  const heading = new FontFaceObserver(font.heading);
  const body = new FontFaceObserver(font.body);

  await heading.load();
  await body.load();

  document.documentElement.classList.add('wf-loaded');

}
