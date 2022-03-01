import { Merge, PartialDeep } from 'type-fest';
import { IHTML, ILiquid } from './config';

export interface IOptions {
  input?: string;
  output?: string;
  import?: string;
  export?: string;
  config?: string;
  stores:Array<{
    domain: string;
    themes: { [label: string]: number }
  }>
  paths?: {
    assets?: string | string[];
    snippets?: string | string[];
    sections?: string | string[];
    layout?: string | string[];
    templates?: string | string[];
    customers?: string | string[];
    config?: string | string[];
    locales?: string | string[];
    metafields?: string | string[];
    pages?: string | string[];
  };
  spawn?: {
    watch?: {
      [label: string]: string;
    },
    build?: {
      [label: string]: string;
    }
  };
  terser?: {
    json?: 'always' | 'dev' | 'prod' | 'never';
    html?: 'always' | 'dev' | 'prod' | 'never';
    pages?: 'always' | 'dev' | 'prod' | 'never';
    rules?: PartialDeep<Merge<ILiquid, IHTML>>
  }
  transforms?: {
    json?: {
      indent?: number;
      useTabs?: boolean;
      exclude?: string[]
    };
    sections?: {
      directoryPrefixing?: boolean;
      onlyPrefixDuplicates?: boolean;
      prefixSeparator?: string;
      global?: string[] | string
    };
    pages?: {
      importAs?: 'markdown' | 'html',
      liquidWarnings?: boolean;
      fallbackAuthor?: string;
      markdown?: {
        breaks?: boolean;
        headerIds?: boolean;
        headerPrefix?: string;
        highlight?: boolean;
        mangle?: boolean;
        silent?: boolean;
        smartypants?: boolean;
      }
    };
    styles?: Array<{
      input: string | string[];
      postcss?: boolean;
      rename?: string;
      snippet?: boolean;
      watch?: string[];
      sass?: {
        style?: 'expanded' | 'compressed';
        sourcemap?: boolean;
        warnings?: boolean;
        include?: string[];
      };
    }>;
    icons?: {
      replacer?: boolean;
      replacerTag?: string;
      vscodeCustomData?: boolean;
      inlined?: Array<{
        input?: string | string[];
        rename?: string;
        snippet?: boolean;
        svgo?: boolean;
      }>
      sprites?: Array<{
        input?: string | string[];
        rename?: string;
        snippet?: boolean;
        svgo?: boolean;
        options?: {
          dimensionAttributes?: boolean;
          namespaceClassnames?: boolean;
          namespaceIDS?: boolean;
          rootAttributes?: {
            [key: string]: string
          }
        }
      }>;
    };
  }
}

export interface IPackage {
  version?: string;
  syncify?: IOptions;
  dependencies?: { [module: string]: string; };
  devDependencies?: { [module: string]: string };
  peerDependencies?: { [module: string]: string };
  reject?: (message: string) => void
}
