import { AxiosRequestConfig as IRequest } from 'axios';
export { AxiosRequestConfig as IRequest } from 'axios';
export declare type Resource = 'watch' | 'upload' |'download'

export interface IRequestData {
  asset: {
    key: string,
    attachment: string
  }
}

export interface ITarget {
  target_name: string,
  api_key: string,
  password: string,
  domain: string,
  theme_name: string,
  theme_id: number
}

export interface ISSTarget {
  target_name: string,
  domain: string,
  theme_name: string,
  theme_id: number
}

export interface IPayload {
  target: ITarget,
  reject(error: { message: string, data: any }): void,
  resolve(data: IRequestData): void
  request: IRequest
}

export interface IConfigFile {
  concurrency: number,
  dir: number,
  targets: ITarget[]
}

export interface ICallbackScope {
  content: Buffer,
  file: {
    root: string,
    dir: string,
    base: string,
    ext: string,
    name: string
  }
}

export function Callback(this: ICallbackScope): string

export interface APIOptions {
  /**
   * The directory to watch
   */
  dir: string,
  /**
   * The resource sync method
   *
   * @default undefined
   */
  resource: Resource,
  /**
   * The theme to target
   *
   * @default undefined
   */
  target: string,
  /**
   * The number of parallel requests to run when
   * uploading or downloading theme files.
   *
   * @default 20
   */
  concurrency: number,
  /**
   * Forcefully ignores files from the chokidar instance which
   * will prevent them from being read and printing to stdout.
   */
  forceIgnore: boolean,
  /**
   * The ignore option accepts an array of files.
   * You must use full path (`theme/assets/*.map`) glob patterns.
   */
  ignore: string[]
}

export interface CLIOptions extends APIOptions {
  _?: string[],
  file?: boolean
}
