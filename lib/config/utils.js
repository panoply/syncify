import _ from 'lodash'
import chalk from 'chalk'
import fancylog from 'fancy-log'

/**
 * URL Generator
 *
 * @export
 * @param {object} params
 * @returns {string}
 */
export const url = ({
  api_key,
  password,
  domain
}) => `https://${api_key}:${password}@${domain}.myshopify.com`

/**
 * Log - Formats cli messages
 *
 * @export
 * @param {*} content
 * @param {string} [color='white']
 * @returns
 */
export const log = (
  content,
  color = 'white',
  message = typeof content === 'object' ? chalk[color]([
    content?.message ? content.message + '\n\n\t' : '',
    content?.data ? JSON.stringify(
      content.data.asset ? _.omit(content.data.asset, 'attachment') : content.data
    ) : ''
  ].join('')) : content
) => fancylog(message)
