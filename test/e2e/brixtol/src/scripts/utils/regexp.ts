
/**
 * Currency Parameter
 *
 * The `currency=XXX` parameter contained in URL
 *
 */
// export const currencyParameter = new RegExp(/(?<=[?&]\bcurrency=)[a-zA-Z]{3}/)

/**
 * Email Address
 *
 * Translated from Rails guide `example@mail.com`
 *
 */
export const emailexp: RegExp = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

/**
 * Form Validation Class
 *
 * Parses form feedback className
 *
 */
export const formclass: RegExp = /\s?\b(valid|error|warn)\b/g;
