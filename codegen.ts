import type { CodegenConfig } from '@graphql-codegen/cli';
import type { SyncifyPluginConfig } from '@syncify/codegen';

const shouldIntrospect = process.argv.includes('--introspect');

/**
 * Generates Types and Introspection
 *
 * The .vscode/graphql/schema.json hold the introspection and the
 * generates types are exposed in the types directory.
 *
 * The Syncify development store is used to obtain the introspection.
 */
export default <CodegenConfig>{
  schema: process.argv.includes('--introspect')
    ? 'https://shopify.dev/admin-graphql-direct-proxy/2025-01'
    : './.vscode/graphql/schema.json',
  generates: {
    './types/dts/graph.d.ts': {
      plugins: [
        '@syncify/codegen'
      ],
      config: <SyncifyPluginConfig>{
        depthInclusion: 1,
        pickTypes: <const>[

          // ONLINE STORE THEME
          'OnlineStore',
          'OnlineStoreTheme',
          'OnlineStoreThemeConnection',
          'OnlineStoreThemeEdge',
          'OnlineStoreThemeFile',
          'OnlineStoreThemeFileBody',
          'OnlineStoreThemeFileBodyText',
          'OnlineStoreThemeFileConnection',
          'OnlineStoreThemeFileEdge',
          'OnlineStoreThemeFileOperationResult',
          'OnlineStoreThemeFileReadResult',
          'OnlineStoreThemeFilesUpsertFileInput',
          'OnlineStoreThemeFilesUserErrors',
          'OnlineStoreThemeInput',

          // THEME FILE MUTATIONS
          'ThemeFilesUpsertPayload',
          'ThemeFilesCopyPayload',
          'ThemeFilesDeletePayload',

          // STORE THEMES
          'ThemeCreatePayload',
          'ThemeCreateUserError',
          'ThemeDeleteUserError',
          'ThemePublishPayload',
          'ThemePublishUserError',

          // ACCESS SCOPES
          'AccessScope',
          'AppInstallation',

          // PAGE
          'Page',
          'PageConnection',
          'PageCreateInput',
          'PageCreatePayload',
          'PageCreateUserError',
          'PageDeletePayload',
          'PageDeleteUserError',
          'PageUpdateInput',
          'PageUpdatePayload',
          'PageUpdateUserError',
          'PageEdge'

          // REDIRECTS
          // 'UrlRedirect',
          // 'UrlRedirectConnection',
          // 'UrlRedirectCreatePayload',
          // 'UrlRedirectDeletePayload',
          // 'UrlRedirectEdge',
          // 'UrlRedirectImportCreatePayload',
          // 'UrlRedirectImportPreview',
          // 'UrlRedirectImportSubmitPayload',
          // 'UrlRedirectImportUserError',
          // 'UrlRedirectInput',
          // 'UrlRedirectUpdatePayload',
          // 'UrlRedirectUserError',

          // // // NAVIGATION
          // 'Menu',
          // 'MenuConnection',
          // 'MenuCreatePayload',
          // 'MenuCreateUserError',
          // 'MenuDeletePayload',
          // 'MenuDeleteUserError',
          // 'MenuEdge',
          // 'MenuItem',
          // 'MenuItemCreateInput',
          // 'MenuItemUpdateInput',
          // 'MenuUpdatePayload',
          // 'MenuUpdateUserError'

        ],
        skipTypename: true,
        commentDescriptions: true
      }
    },
    ...(shouldIntrospect
      ? {
        './.vscode/graphql/schema.json': {
          plugins: [
            'introspection'
          ],
          config: {
            minify: true // Optional: minify the JSON output
          }
        }
      }
      : {}
    )
  }
};
