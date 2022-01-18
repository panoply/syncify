export interface IOptions {
  stores: Array<{
    domain: string;
    themes: {
      [label: string]: number
    }
  }>
  terminal?: 'dashboard' | 'minimal' | 'default'
  dirs?: {
    input?: string;
    output?: string;
    import?: string;
    export?: string;
    config?: string;
  };
  paths?: {
    assets?: string[],
    snippets?: string[];
    sections?: string[];
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
  transform?: {
    styles?: Array<{
      input: string;
      rename?: string;
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
