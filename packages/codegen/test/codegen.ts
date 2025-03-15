import type { CodegenConfig } from '@graphql-codegen/cli';
import type { SyncifyPluginConfig } from '@syncify/codegen';

const config: CodegenConfig = {
  schema: './introspection/shopify.schema.json',
  generates: {
    // './types/all.d.ts': {
    //   schema: './introspection/shopify.schema.json',
    //   plugins: [
    //     '@graphql-codegen/typescript',
    //     '@graphql-codegen/typescript-operations'
    //   ],
    //   config: {
    //     skipTypename: true,
    //     commentDescriptions: true
    //   }
    // },
    './types/graph.d.ts': {
      plugins: [
        '@syncify/codegen'
      ],
      config: <SyncifyPluginConfig>{
        pickTypes: <const>[
          'AbandonedCheckout',
          'AbandonedCheckoutConnection'
        ],
        depthInclusion: 1,
        skipTypename: true,
        commentDescriptions: true
      }
    }
  }
};

export default config;
