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
  primary_domain: string,
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
  resource: Resource,
  target: string,
  concurrency: number,
  dir: string,
  files: string[],
  forceIgnore: boolean,
  ignore: string[]
}

export interface CLIOptions extends APIOptions {
  _?: string[],
  file?: boolean
}
