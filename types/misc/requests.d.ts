import { AxiosRequestConfig } from 'axios';
import { File, FileKeys } from '../bundle/file';

/**
 * Axios Request Methods
 */
export type Methods = 'get' | 'post' | 'put' | 'delete'

/**
 * Client Request
 */
export type Client = (method: Methods, file: File, content?: string) => Promise<void>

/**
 * Client Request as parameter
 */
export type ClientParam<T = any> = (method: Methods, file: File<T>, content?: string) => Promise<void>

/**
 * Resources
 */
export type Resource = 'build' | 'watch' | 'upload' |'download'

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
  `sections/${string}${'-group.json' | '.liquid'}` |
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
export interface AssetResource {
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

export interface Asset {
  /**
   * The asset path
   */
  key?: string;
  /**
   * Base64 Encoded File
   */
  attachment?: string;
  /**
   * Value file string
   */
  value?: string;
  /**
   * The date and time (ISO 8601 format) when the
   * asset was created.
   */
  created_at?: string;
   /**
    * The date and time (ISO 8601 format) when an
    * asset was last updated.
    */
  updated_at?: string;
  /**
   * The MIME representation of the content, consisting
   * of the type and subtype of the asset.
   */
  content_type?: string;
  /**
   * The asset size in bytes.
   */
  size?: number;
  /**
   * The MD5 representation of the content, consisting of a
   * string of 32 hexadecimal digits. May be null if an asset
   * has not been updated recently.
   */
  checksum?: string;
  /**
   * The ID for the theme that an asset belongs to.
   */
  theme_id?: number;
}

export namespace Requests {

  /**
   * Return response for Shopify theme asset resources
   */
  export interface Assets {
    /**
     * The assets resource
     */
    assets: AssetResource[]
  }

  /**
   * The request body for Shopify theme assets
   */
  export interface Asset {
    /**
     * The theme asset
     */
    asset: {
      key: FileKeys,
      value: string
    }
  }

  /* -------------------------------------------- */
  /* PAGES                                        */
  /* -------------------------------------------- */

  export interface Page {
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
  export interface Metafield {
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

  export interface Redirect {
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

  export interface File {
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
export interface Request extends AxiosRequestConfig {
  url?: string;
  method?: Methods;
  responseType?: 'json',
  data?: (
    Requests.Asset |
    { metafield?: Requests.Metafield } |
    { redirect?: Requests.Redirect }
  )
  params?: {
    'asset[key]'?: string;
    fields?: string
  }
}
