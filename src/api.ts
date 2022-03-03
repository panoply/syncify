import { IOptions } from 'types';

// Build hook
export function build (options?: IOptions) {

}

// Build hook
export function watch (options?: IOptions) {

}

// Build hook
export function upload (options?: IOptions) {

}

// Build hook
export function download (options?: IOptions) {

}

export default function (options?: IOptions) {

  return {
    async build (content?: Buffer): Promise<Buffer|string|void|false> {

    },
    async watch (content?: Buffer): Promise<Buffer|string|void|false> {

    },
    async upload (content?: Buffer): Promise<Buffer|string|void|false> {

    },
    async download (content?: Buffer): Promise<Buffer|string|void|false> {

    }
  };
}
