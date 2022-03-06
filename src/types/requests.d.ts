import { AxiosRequestConfig } from 'axios';
import { IFile } from './file';

/**
 * Axios Request Methods
 */
export type Methods = 'get' | 'post' | 'put' | 'delete'

/**
 * Client Request
 */
export type Client = (method: Methods, file: IFile, content?: string) => Promise<void>

/**
 * Resources
 */
export type Resource = 'build' | 'watch' | 'upload' |'download' | 'interactive'

/**
 * Chokidor Event Names
 */
export type ChokidorEvents = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

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

/* -------------------------------------------- */
/* ASSETS                                       */
/* -------------------------------------------- */

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

export namespace Requests {

  /**
   * The request body for Shopify theme assets
   */
  export interface IAsset {
    /**
     * The asset path
     */
    key?: string,
    /**
     * Base64 Encoded File
     */
    attachment?: string
    /**
     * Value file string
     */
    value?: string
  }

  /* -------------------------------------------- */
  /* PAGES                                        */
  /* -------------------------------------------- */

  export interface IPage {
    author?: string;
    body_html?: string;
    created_at?: string;
    handle?: string;
    id?: number;
    metafield?: {
      key: string;
      type: string;
      value: string;
      namespace:string;
    },
    published_at?:string;
    shop_id?: number
    template_suffix?: string;
    title?: string;
    updated_at?: string;

  }
  /* -------------------------------------------- */
  /* METAFIELDS                                   */
  /* -------------------------------------------- */

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
    value_type?: 'json_string';
    /**
     * Last updated date
     */
    updated_at?: string;
  }

  /* -------------------------------------------- */
  /* REDIRECTS                                    */
  /* -------------------------------------------- */

  export interface IRedirect {
    /**
     * Redirect ID
     */
    id?: number;
    /**
     * The redirect from path
     */
    path?: string;
    /**
     * The redirect to path
     */
    target?: string;
  }

  export interface IFile {
    /**
     * File ID
     */
    id?: number;
    /**
     * The filename
     */
    filename?: string;
    /**
     * The mimeType of the file
     */
    mimeType?: string;
    /**
     * The file content type.
     */
    contentType?: string;
    /**
     * An external URL or a signed upload URL of the file object.
     */
    originalSource?: string;
  }
}

/**
 * Extended request options passed to axios when
 * uploading, downloading or interfacing with the Shopify
 * API themes, metafields or other endpoints.
 */
export interface IRequest extends AxiosRequestConfig {
  url?: string;
  method?: Methods;
  responseType?: 'json',
  data?: (
    { asset?: Requests.IAsset } |
    { metafield?: Requests.IMetafield } |
    { redirect?: Requests.IRedirect }
  )
  params?: {
    'asset[key]'?: string;
    fields?: string
  }
}
