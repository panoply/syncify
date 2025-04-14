export function bar (text: string) {

  const el = document.querySelector<HTMLElement>('#example');

  if (el) {
    el.style.background = 'whitesmoke';
    el.style.padding = '100px';
    el.innerText = text;
  }
}
