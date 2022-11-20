import screen, { Instance } from 'simplestatemanager';

/**
 * Check if an element is out of the viewport
 */
export function isOutOfViewport (element: HTMLElement) {

  // Get element's bounding
  const bounding = element.getBoundingClientRect();

  const top = bounding.top < 0;
  const left = bounding.left < 0;
  const bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  const right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);

  return top || left || bottom || right;

};

/**
 * Handles a clicked link, prevents special click types.
 */
export function linkEvent (event: MouseEvent): boolean {

  // @ts-ignore
  return !((event.target && event.target.isContentEditable) ||
    event.defaultPrevented ||
    event.which > 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey);

};

/**
 * Kebab Case
 */
export function kebabCase ({ name }: { name: string }): string {

  return name.split('').map((letter, idx) => (
    letter.toUpperCase() === letter ? (
      `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
    ) : letter
  )).join('');

}

/**
 * Whether or not we are within a screen viewport
 */
export function isScreen (screens: string) {

  return screen
    .getStates(screens.split('|'))
    .some((match: Instance) => match.active);

}

/**
 * Set screen match media stats for Simple State Manager
 */
export function ssm (options: { [size: string]: string }) {

  const states = [];

  for (const id in options) {
    states.push({
      id,
      query: options[id]
    });
  }

  return states;
}

/**
 * Get Pathname - via Turbo instance
 */
export function getPath (): string {

  return window.location.pathname;

}

/**
 * Asset URL
 */
export function asset (file: string): string {

  return window.i18n.asset_url.replace('path', file);

}

/**
 * Days from  - Used to write expire days for session
 * related utils like authentication, cookies etc.
 */
export function xDaysFrom (from: number, days: number): number {

  return (from + (days * 24 * 60 * 60 * 1000));

}

/**
 * Shopify Image Sizes
 */
export function imgSrc (src: string, size: number): string {

  return src.replace(/\.jpg\?[^?]{0}/, `_${size}x.jpg?`);

}

/**
 * Liquid Object Tag Parser
 */
export function parse (string: string, value: number): string {

  return string.replace(/{{2}[^}]*?}{2}/g, String(value));

}

/**
 * Splits title (helper function used on Product Names)
 *
 * The Brixtol Webshop asserts a new product on every color variation
 * and all product names use an En Dash seperator (U+2013) the En Dash
 * defines a seperation between product title and product color/variant
 */
export function splitTitle (string: string): { name: string, colour: string} {

  const [ name, colour ] = string.split('–');

  return {
    name,
    colour
  };

}

/**
 * Get Product Name
 *
 * Attempts to convert a Shopify product name into a variant / name
 * partial. We use a long dash (unicode 2013) character separator in Shopify for
 * product name variation colors.
 */
export function getProductName (name: string): {
  productName: string,
  variantName: string
} {

  const seperator = name.search(/\u{2013}/u);

  return seperator > 0 ? {
    productName: name.slice(0, seperator).trimEnd(),
    variantName: name.slice(seperator + 1).trim()
  } : {
    productName: name.trimEnd(),
    variantName: null
  };

};

/**
 * Generates Handle from title

 */
export function handleize (string: string): string {

  return string.toLowerCase().replace(/\s+/g, '-');

}

/**
 * Detect Even/Odd number
 */
export function isEven (num: number): boolean {

  return ((num % 2) === 0);

}

/**
 * Format Native validations responses
 */
export function formatValidation (message: string): boolean | string {

  return message ? message.split('.').join('.\n').trimStart() : false;

}

/**
 * Async Timeout
 */
export function wait (callback: Function, ms = 0): Promise<boolean> {

  return new Promise(resolve => setTimeout(() => resolve(callback()), ms));

};

/**
 * Toggle Class
 */
export function toggleClass (selector: HTMLElement, classname: string): void {

  if (selector.classList.contains(classname)) {
    selector.classList.remove(classname);
  }

}
