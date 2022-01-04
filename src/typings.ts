export { AxiosRequestConfig as IRequest } from 'axios';

export declare type Resource = 'watch' | 'upload' |'download'
export type ChokidorEvents = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'

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

export interface IMetafield {
  /**
   * The metafield ID
   */
  id?: number;
  /**
   * The parent directory name
   */
  namespace: string;
  /**
   * The JSON file name with extension
   */
  key: string;
  /**
   * The stringified JSON value
   */
  value: string;
  /**
   * Type is JSON
   */
  type?: 'json';
  /**
   * Value Type (this is legacy but we assert it anyway)
   */
  value_type?: 'json_string'

}

export interface ICallbackScope {
  root: string,
  dir: string,
  base: string,
  ext: string,
  name: string
}

export declare function Callback(this: ICallbackScope, content?: Buffer): Buffer | string | void

export interface APIOptions {
  /**
   * The directory to watch
   */
  dir?: string,
  /**
   * Your store name, if you have only 1 store
   * target and it is defined within a `package.json`
   * this option can be omitted.
   */
  store?: string | string[],
  /**
   * The resource sync method
   *
   * @default undefined
   */
  resource: Resource,
  /**
   * The theme\s to target
   *
   * @default undefined
   */
  target: string | string[],
  /**
   * Whether or not the sync metafields
   *
   * @default true
   */
  metafields?: boolean,
  /**
   * The number of parallel requests to run when
   * uploading or downloading theme files.
   *
   * @default 20
   */
  concurrency?: number,
  /**
   * Forcefully ignores files from the chokidar instance which
   * will prevent them from being read and printing to stdout.
   */
  forceIgnore?: boolean,
  /**
   * The ignore option accepts an array of files.
   * You must use full path (`theme/assets/*.map`) glob patterns.
   */
  ignore?: string[] | RegExp[]
}

/**
 * The sync data model. Multiple stores and themes
 * can run concurrently.
 */
export interface IThemes {
 /**
  * Count references of the sync mode. Applied to
  * every sync model.
  */
  counts?: {
     /**
     * Number of stores
     */
    stores?: number;
    /**
     * Number of themes
     */
    themes?: number;
    /**
     * Spacer formats for logs. This will offset
     * whitespace between store name and theme in
     * CLI logs.
     */
    spaces?: string;
  }
  /**
   * The store domain name
   */
  store: string;
  /**
   * The theme target name
   */
  target: string;
  /**
   * The theme id.
   */
  id: number;
  /**
    * The authorized assets URL endpoint
    */
  url: string;
}

export interface IStores {
  /**
   * The store domain name
   */
  store: string;
  /**
   * The authorized metafields URL endpoint
   */
  url: string;
}

export interface IConfig {
  /**
   * The theme directory
   */
  dir: string;
  /**
   * The current working directory
   */
  cwd: string;
  /**
   * The resource to execute, eg: 'watch', 'upload' or 'download'
   */
  resource: string;
  /**
   * The sync data model. Multiple stores and themes
   * can run concurrently.
   */
  sync: {
    themes: Array<IThemes>;
    stores: Array<IStores>;
  }
}

export interface IFile {
  /**
   * Whether or not the change is a metafield
   */
  metafield: boolean;
  /**
   * The filename extension
   */
  ext: string;
  /**
   * The file path
   */
  file: string;
  /**
   * When `isMetafield` is `true` change this value is the
   * parent directory name of contained files.
   */
  namespace?: string;
  /**
   * Key value, when `isMetafield` is `true` this value is
   * the filename without extension, else this value
   * is the theme file path.
   */
  key?: string;

}

export interface IPkgOptions {
  dir: string;
  stores: Array<{
    domain: string,
    metafields: boolean;
    themes: {
      [target: string]: number
    }
  }>
}

export interface IOptions {
  _?: string[];
  cwd?: string;
  env?: string;
  pkg?: string;
  cli?: boolean;
  interactive: boolean;
  resource?: string;
  store?: string | string[];
  theme?: string | string[];
  output?: string;
}
