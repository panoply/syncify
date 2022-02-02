export interface IOptions {
  stores: Array<{
    domain: string;
    themes: {
      [label: string]: number
    }
  }>
  terminal?: 'dashboard' | 'minimal' | 'default'
  dirs?: {
    source?: string;
    output?: string;
    import?: string;
    export?: string;
    config?: string;
    metafields?: string;
  };
  paths?: {
    assets?: string[];
    snippets?: string[];
    sections?: string[];
    layout?: string[];
    templates?: string[];
    customers?: string[];
    config?: string[];
    locales?: string[];
  };
  spawn?: {
    watch?: {
      [label: string]: string;
    },
    upload?: {
      [label: string]: string;
    }
  };
  redirects?: {
    populate?: boolean;
    cache?: boolean;
  };
  transform?: {
    styles?: Array<{
      input: string | string[];
      rename?: string | {
        prefix?: string;
        prefixDir?: boolean;
        separator?: string;
      };
      snippet?: boolean;
      watch?: string[];
      include?: string[]
    }>;
    icons?: {
      snippets?: string[];
      sprites?: Array<{
        input?: string[];
        output?: string;
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
    json?: {
      allowComments?: boolean;
      minify?: {
        env?: 'dev' | 'prod' | 'any' | 'never';
        removeSchemaRefs?: boolean;
        exclude?: string[]
      }
    },
    views?: {
      sections?: {
        allowPrefix?: boolean;
        onlyPrefixDuplicates?: boolean;
        prefixSeparator?: boolean;
        globals?: string[];
      },
      minify?: {
        env?: 'dev' | 'prod' | 'any' | 'never';
        minifyJS?: boolean;
        minifyCSS?: boolean;
        removeComments?: boolean;
        collapseWhitespace?: boolean;
        trimCustomFragments?: boolean;
        ignoreCustomFragments?: string[];
        minifySectionSchema?: boolean;
        removeLiquidComments?: boolean;
        ignoredLiquidTags?: string[];
        exclude?: string[];
      }
    }

  }
}

export interface IPackage {
  syncify?: IOptions;
  dependencies?: { [module: string]: string; };
  devDependencies?: { [module: string]: string };
  peerDependencies?: { [module: string]: string };
}
