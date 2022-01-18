import { AxiosRequestConfig } from 'axios';

/**
 * Resources
 */
export type Resource = 'watch' | 'upload' |'download' | 'interactive'

/**
 * Chokidor Event Names
 */
export type ChokidorEvents = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

/**
 * Return response for Shopify theme assets
 */
export interface IGetAssets {
  /**
   * The asset path
   */
  key: string;
  /**
   * The public-facing URL of the asset.
   */
  public_url: string;
  /**
   * The date and time (ISO 8601 format) when the
   * asset was created.
   */
  created_at: string;
  /**
   * The date and time (ISO 8601 format) when an
   * asset was last updated.
   */
  updated_at: string;
  /**
   * The MIME representation of the content, consisting
   * of the type and subtype of the asset.
   */
  content_type: string;
  /**
   * The asset size in bytes.
   */
  size: number;
  /**
   * The MD5 representation of the content, consisting
   * of a string of 32 hexadecimal digits. May be null
   * if an asset has not been updated recently.
   */
  checksum: string;
  /**
   * The ID for the theme that an asset belongs to.
   */
  theme_id: number;
  /**
   * The text content of the asset, such as the HTML
   * and Liquid markup of a template file.
   */
  value?: string;
}

/**
 * The request body for Shopify theme assets
 */
export interface IAsset {
  /**
   * The asset path
   */
  key: string,
  /**
   * Base64 Encoded File
   */
  attachment: string
}

/**
 * The request body for Shopify metafields
 */
export interface IMetafield {
  /**
   * The metafield ID
   */
  id?: number;
  /**
   * The parent directory name
   */
  namespace?: string;
  /**
   * The JSON file name with extension
   */
  key?: string;
  /**
   * The stringified JSON value
   */
  value?: string;
  /**
   * Type is JSON
   */
  type?: 'json';
  /**
   * Value Type (this is legacy but we assert it anyway)
   */
  value_type?: 'json_string'

}

/**
 * Shopify theme asset paths, we use this to when re-pathing
 * custom directories.
 */
export type GetAsset = (
  `templates/${string}${'.liquid' | '.json'}` |
  `templates/customer/${string}${'.liquid' | '.json'}` |
  `assets/${string}` |
  `sections/${string}${'.liquid'}` |
  `snippets/${string}${'.liquid'}` |
  `layout/${string}${'.liquid'}` |
  `locales/${string}${'.json'}` |
  `config/settings_${'data' | 'schema'}${'.json'}`
)

/**
 * Extended request options passed to axios when
 * uploading, downloading or interfacing with the Shopify
 * API themes, metafields or other endpoints.
 */
export interface IRequest extends AxiosRequestConfig {
  url?: string;
  method: 'get' | 'post' | 'put' | 'delete';
  responseType?: 'json',
  data?: { asset: IAsset } | { metafield: IMetafield };
  params?: {
    'asset[key]'?: string;
    fields?: string
  }
}
