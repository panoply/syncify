import type { LiteralUnion, Join } from 'type-fest';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { File } from '../$/file';

/**
 * Metafield Types
 */
export type MetafieldTypes = LiteralUnion<(
  | 'boolean'
  | 'color'
  | 'date'
  | 'date_time'
  | 'dimension'
  | 'json'
  | 'money'
  | 'multi_line_text_field'
  | 'number_decimal'
  | 'number_integer'
  | 'rating'
  | 'rich_text_field'
  | 'single_line_text_field'
  | 'url'
  | 'volume'
  | 'weight'
), string>

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
export type ClientParam<T = any> = {
  (method: Methods, file: T, content?: string): Promise<void>;
  (method: Methods, file: File<T>, content?: string): Promise<void>;
}

/**
 * Chokidor Event Names
 */
export type ChokidorEvents = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

/**
 * Shopify theme asset paths, we use this to when re-pathing
 * custom directories.
 */
export type AssetKeys = LiteralUnion<(
  | `templates/${string}${'.liquid' | '.json'}`
  | `templates/customer/${string}${'.liquid' | '.json'}`
  | `templates/metaobject/${string}${'.liquid' | '.json'}`
  | `assets/${string}`
  | `sections/${string}${'-group.json' | '.liquid'}`
  | `snippets/${string}${'.liquid'}`
  | `layout/${string}${'.liquid'}`
  | `locales/${string}${'.json'}`
  | `config/settings_${'data' | 'schema'}${'.json'}`
), string>

/**
 * Specifies how the theme is being used within the shop.
 *
 * ---
 *
 * **main**
 *
 * The theme is published. Customers see it when they visit the online store.
 *
 * **unpublished**
 *
 * The theme is unpublished. Customers can't see it.
 *
 * **demo**
 *
 * The theme is installed on the store as a demo. The theme can't be
 * published until the merchant buys the full version.
 *
 * **development**
 *
 * The theme is used for development. The theme can't be published, and is temporary.
 */
export type ThemeRole = LiteralUnion<(
  | 'main'
  | 'unpublished'
  | 'demo'
  | 'development'
), string>;

/**
 * Page Metafield - This type is not as complete as normal metafields
 */
export interface PageMetafield {
  /**
   * An identifier for the metafield. (maximum: 30 characters)
   */
  key: string;
  /**
   * The information to be stored as metadata.
   */
  type: MetafieldTypes;
  /**
   * The information to be stored as metadata.
   */
  value: string;
  /**
   * A container for a set of metadata. Namespaces help distinguish
   * between metadata created by different apps. (maximum: 20 characters)
   */
  namespace:string;
  /**
   * Additional information about the metafield.
   */
  description?: string;
}

export type AccessScopes = LiteralUnion<
  | 'read_files'
  | 'write_files'
  | 'write_online_store_pages'
  | 'read_online_store_pages'
  | 'write_content'
  | 'read_content'
  | 'write_themes'
  | 'read_themes'
, string>

export namespace Resource {

  /* -------------------------------------------- */
  /* ACCESS SCOPES                                */
  /* -------------------------------------------- */

  export interface Access {
    /**
     * The Access Scope handle
     */
    handle: 'write_files'
  }

  /* -------------------------------------------- */
  /* ASSET                                        */
  /* -------------------------------------------- */

  /**
   * Return response for Shopify theme assets
   */
  export interface Asset {
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

  export type AssetFields = LiteralUnion<Join<[
    'key',
    'public_url',
    'created_at',
    'updated_at',
    'content_type',
    'size',
    'checksum',
    'theme_id',
    'value'
  ], ','>, string>

  /* -------------------------------------------- */
  /* THEMES                                       */
  /* -------------------------------------------- */

  export interface Theme {
    /**
     * The date and time (ISO 8601 format) when the theme was created.
     */
    created_at?: string;
    /**
     * The date and time (ISO 8601 format) when the theme was last updated.
     */
    updated_at?: string;
    /**
     * A unique identifier applied to Shopify-made themes that are installed from
     * the Shopify Theme Store Theme Store. Not all themes available in the Theme
     * Store are developed by Shopify. Returns null if the store's theme isn't made
     * by Shopify, or if it wasn't installed from the Theme Store.
     */
    theme_store_id?: number;
    /**
     * The unique numeric identifier for the theme.
     */
    id?: number;
    /**
     * Specifies a public URL where Shopify can access the theme code.
     */
    src?: string;
    /**
     * The name of the theme.
     */
    name?: string;
    /**
     * Whether files are still being copied into place for this theme.
     */
    processing?: boolean;
    /**
     * Whether the theme can currently be previewed.
     */
    previewable?: boolean;
    role?: ThemeRole
  }

  export type ThemeFields = LiteralUnion<Join<[
    'id',
    'theme_store_id',
    'created_at',
    'updated_at',
    'src',
    'name',
    'processing',
    'previewable',
    'role'
  ], ','>, string>

  /* -------------------------------------------- */
  /* METAFIELD                                    */
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
    type?: MetafieldTypes;
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
  /* PAGES                                        */
  /* -------------------------------------------- */

  export interface Page {
    /**
     * The name of the person who created the page.
     */
    author?: string;
    /**
     * The text content of the page, complete with HTML markup.
     */
    body_html?: string;
    /**
     * The date and time (ISO 8601 format) when the page was created.
     */
    created_at?: string;
    /**
     * A unique, human-friendly string for the page,
     * generated automatically from its title. In themes,
     * the Liquid templating language refers to a page by its handle.
     */
    handle?: string;
    /**
     * The unique numeric identifier for the page.
     */
    id?: number;
    /**
     * Additional information attached to the Page object.
     */
    metafields?: PageMetafield | PageMetafield[];
    /**
     * The date and time (ISO 8601 format) when the page was published.
     * Returns null when the page is hidden.
     */
    published_at?:string;
    /**
     * Published boolean
     */
    published?: boolean;
    /**
     * The ID of the shop to which the page belongs.
     */
    shop_id?: number
    /**
     * The suffix of the template that is used to render the page.
     * If the value is an empty string or null, then the default page template is used.
     */
    template_suffix?: string;
    /**
     * The title of the page.
     */
    title?: string;
    /**
     * The date and time (ISO 8601 format) when the page was last updated.
     */
    updated_at?: string;
    /**
     * The GraphQL GID of the page.
     */
    admin_graphql_api_id?: string
  }

  export type PageFields = LiteralUnion<Join<[
    'author',
    'body_html',
    'created_at',
    'updated_at',
    'handle',
    'id',
    'metafields',
    'published_at',
    'published',
    'shop_id',
    'template_suffix',
    'title'
  ], ','>, string>

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

 /* -------------------------------------------- */
 /* FILES API                                    */
 /* -------------------------------------------- */

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

export namespace GET {

  /* -------------------------------------------- */
  /* ASSET                                        */
  /* -------------------------------------------- */

  export interface AssetParams {
    /**
     * Retrieves a single asset for a theme by specifying the asset's key.
     */
    'asset[key]': AssetKeys;
    /**
     * Specify which fields to show using a comma-separated list of field names.
     */
    fields?: Resource.AssetFields
  }

  /* -------------------------------------------- */
  /* PAGE                                         */
  /* -------------------------------------------- */

  export interface PageParams {
    /**
     * Show only certain fields, specified by a comma-separated list of field names.
     */
    fields?: Resource.PageFields;
  }

  /* -------------------------------------------- */
  /* THEME                                        */
  /* -------------------------------------------- */

  export interface ThemeParams {
    /**
     * Specify which fields to show using a comma-separated list of field names.
     */
    fields?: Resource.ThemeFields
  }

}

export namespace LIST {

  /* -------------------------------------------- */
  /* ASSET                                        */
  /* -------------------------------------------- */

  export interface AssetParams {
    /**
     * Specify which fields to show using a comma-separated list of field names.
     */
    fields?: Resource.AssetFields
  }

  /* -------------------------------------------- */
  /* PAGE                                         */
  /* -------------------------------------------- */

  export interface PageParams {
    /**
     * Show pages created before date (format: 2014-04-25T16:15:47-04:00).
     */
    created_at_max?: string;
    /**
     * Show pages created after date (format: 2014-04-25T16:15:47-04:00).
     */
    created_at_min?: string;
    /**
     * Show only certain fields, specified by a comma-separated list of field names.
     */
    fields?: Resource.PageFields;
    /**
     * Retrieve a page with a given handle.
     */
    handle?: string;
    /**
     * The maximum number of results to show.
     *
     * `≤ 250` (default `50`)
     */
    limit?: number;
    /**
     * Show pages published before date (format: 2014-04-25T16:15:47-04:00).
     */
    published_at_max?: string;
    /**
     * Show pages published after date (format: 2014-04-25T16:15:47-04:00).
     */
    published_at_min?: string;
    /**
     * Restrict results to pages with a given published status:
     *
     * `published`
     *
     * Show only published pages.
     *
     * `unpublished`
     *
     *  Show only unpublished pages.
     *
     * `any`
     *
     *  Show published and unpublished pages.
     */
    published_status?: LiteralUnion<'published' | 'unpublished' | 'any', string>;
    /**
     * Restrict results to after the specified ID.
     */
    since_id?: number;
    /**
     * Retrieve pages with a given title.
     */
    title?: string;
    /**
     * Show pages last updated before date (format: 2014-04-25T16:15:47-04:00).
     */
    updated_at_max?: string;
    /**
     * Show pages last updated after date (format: 2014-04-25T16:15:47-04:00).
     */
    updated_at_min?: string;
  }

  /* -------------------------------------------- */
  /* THEME                                        */
  /* -------------------------------------------- */

  export interface ThemeParams {
    /**
     * Specify which fields to show using a comma-separated list of field names.
     */
    fields?: Resource.ThemeFields
  }

}

export namespace POST {

  /* -------------------------------------------- */
  /* PAGE                                         */
  /* -------------------------------------------- */

  export interface PageData extends Omit<Resource.Page, (
    | 'title'
    | 'body_html'
    | 'created_at'
    | 'id'
    | 'metafield'
    | 'shop_id'
    | 'updated_at'
    | 'admin_graphql_api_id'
  )>{
    /**
     * The title of the page.
     */
    title: string;
    /**
     * The text content of the page, complete with HTML markup.
     */
    body_html: Resource.AssetFields;
    /**
     * Additional information attached to the Page object. It has the following properties:
     */
    metafields?: PageMetafield[]
  }

  /* -------------------------------------------- */
  /* THEME                                        */
  /* -------------------------------------------- */

  export interface ThemeData {
    /**
     * The name of the theme.
     */
    name: string;
    /**
     * Specifies a public URL where Shopify can access the theme code.
     */
    src?: string;
    role?: ThemeRole
  }

}

export namespace PUT {

  /* -------------------------------------------- */
  /* ASSET                                        */
  /* -------------------------------------------- */

  export interface AssetParams {
    /**
     * The path within the theme to an existing asset.
     * Include in the body of the PUT request to create a duplicate asset.
     */
    source_key: string;
    /**
     * The source URL of an image. Include in the body of the PUT request to
     * upload the image to Shopify.
     */
    src?: string;
  }

  export interface AssetData {
    /**
     * Retrieves a single asset for a theme by specifying the asset's key.
     */
    key: AssetKeys;
    /**
     * The text content of the asset, such as the HTML and Liquid markup of a template file.
     */
    value?: AssetKeys;
    /**
     * Attachment base64-encoded image.
     */
    attachment?: AssetKeys;
    /**
     * The source URL of an image. Include in the body of the PUT request to upload the image to Shopify.
     */
    src?: string;
    /**
     * Specify which fields to show using a comma-separated list of field names.
     */
    fields?: Resource.AssetFields
  }

  /* -------------------------------------------- */
  /* PAGE                                         */
  /* -------------------------------------------- */

  export interface PageData extends POST.PageData {}

  /* -------------------------------------------- */
  /* THEME                                        */
  /* -------------------------------------------- */

  export interface ThemeData {
    role: ThemeRole;
  }

}

export namespace DELETE {

  /* -------------------------------------------- */
  /* ASSET                                        */
  /* -------------------------------------------- */

  export interface AssetParams {
    /**
     * Deletes a single asset from a theme by specifying the asset's key.
     */
    'assert[key]': AssetKeys;
  }
}

interface RequestUrls {
  access: {
    GET: 'oauth/access_scopes.json',
    LIST: never;
    POST: never;
    PUT: never;
    DELETE: never;
  }
  asset: {
    GET: `themes/${number}/assets.json`;
    LIST: `themes/${number}/assets.json`;
    POST: `themes/${number}/assets.json`;
    PUT: `themes/${number}/assets.json`;
    DELETE: `themes/${number}/assets.json`;
  };
  page: {
    GET: `pages/${number}.json`;
    LIST: 'pages.json';
    POST: 'pages.json';
    PUT: `pages/${number}.json`;
    DELETE: `pages/${number}.json`;
  };
  theme: {
    GET: `themes/${number}.json`;
    LIST: 'themes.json';
    POST: 'themes.json';
    PUT: `themes/${number}.json`;
    DELETE: `themes/${number}.json`;
  }
}

interface RequestData {
  access: {
    GET: never;
    LIST: never;
    PUT: never;
    DELETE: never;
    POST: never;
  };
  page: {
    GET: never;
    LIST: never;
    PUT: PUT.PageData;
    DELETE: never;
    POST: POST.PageData
  };
  asset: {
    GET: never;
    LIST: never;
    PUT: PUT.AssetData;
    DELETE: never;
    POST: never;
  };
  theme: {
    GET: never;
    LIST: never;
    PUT: PUT.ThemeData
    DELETE: never;
    POST: POST.ThemeData;
  }
}

interface RequestParams {
  access: {
    GET: never;
    LIST: never;
    PUT: never;
    DELETE: never;
    POST: never;
  };
  page: {
    GET: GET.PageParams
    LIST: LIST.PageParams;
    PUT: never;
    DELETE: never;
    POST: never;
  };
  asset: {
    GET: GET.AssetParams;
    LIST: LIST.AssetParams;
    PUT: PUT.AssetParams;
    DELETE: DELETE.AssetParams;
    POST: never;
  };
  theme: {
    GET: GET.ThemeParams;
    LIST: LIST.ThemeParams;
    PUT: never
    DELETE: never;
    POST: never;
  }
}

export type RequestMethods = 'GET' | 'LIST' | 'PUT' | 'POST' | 'DELETE'

export namespace Requests {

  export type Access<M extends 'GET'> = AxiosRequestConfig<{
    url?: LiteralUnion<RequestUrls['access'][M], string>;
    method?: Lowercase<M>;
    responseType?: 'json',
    data?: RequestData['access'][M]
    params?: RequestParams['access'][M]
  }>

  export type Asset<M extends RequestMethods> = AxiosRequestConfig<{
    url?: LiteralUnion<RequestUrls['asset'][M], string>;
    method?: Lowercase<Methods>;
    responseType?: 'json',
    data?: RequestData['asset'][M]
    params?: RequestParams['asset'][M]
  }>

  export type Page<M extends RequestMethods> = AxiosRequestConfig<{
    url?: LiteralUnion<RequestUrls['page'][M], string>;
    method?: Lowercase<M>;
    responseType?: 'json',
    data?: RequestData['page'][M]
    params?: RequestParams['page'][M]
  }>

  export type Theme<M extends RequestMethods> = AxiosRequestConfig<{
    url: LiteralUnion<RequestUrls['page'][M], string>;
    method: Lowercase<M>;
    responseType?: 'json',
    data?: RequestData['theme'][M]
    params?: RequestParams['theme'][M]
  }>

}

export namespace Responses {

  /* -------------------------------------------- */
  /* ACCESS SCOPES                                */
  /* -------------------------------------------- */

  export type Access<T extends RequestMethods> = AxiosResponse<T extends 'GET' ? {
    access_scopes: Resource.Access[]
  } : {
    asset: Resource.Asset
  }, Requests.Asset<T>>

  /* -------------------------------------------- */
  /* ASSETS                                       */
  /* -------------------------------------------- */

  export type Asset<T extends RequestMethods> = AxiosResponse<T extends 'LIST' ? {
    assets: Resource.Asset[]
  } : {
    asset: Resource.Asset
  }, Requests.Asset<T>>

  export type Assets<T extends RequestMethods> = AxiosResponse<{
    assets: Resource.Asset[]
  }, Requests.Asset<T>>

  /* -------------------------------------------- */
  /* THEMES                                       */
  /* -------------------------------------------- */

  export type Theme<T extends RequestMethods> = AxiosResponse<{
    theme: Resource.Theme
  }, Requests.Theme<T>>

  export type Themes<T extends RequestMethods> = AxiosResponse<{
    themes: Resource.Theme[]
  }, Requests.Theme<T>>

  /* -------------------------------------------- */
  /* PAGES                                        */
  /* -------------------------------------------- */

  export type Page<T extends RequestMethods> = AxiosResponse<{
    page: Resource.Page
  }, Requests.Page<T>>

  export type Pages<T extends RequestMethods> = AxiosResponse<{
    pages: Resource.Page[]
  }, Requests.Page<T>>

}
