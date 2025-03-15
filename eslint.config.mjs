import shared from '@syncify/eslint-config';

export default [
  {
    ignores: [
      '**/dist',
      'types/gql/shopify.d.ts',
      'tests/**/theme',
      'test/e2e/theme',
      './packages/hot/index.js',
      '*.js'

    ]
  },
  ...shared,
  {
    rules: {
      'no-return-assign': 'off',
      'object-curly-newline': 'off',
      'no-import-assign': 'off',
      'no-new-func': 'off',
      'no-control-regex': 'off',
      indent: [
        'error',
        2,
        {
          MemberExpression: 0,
          SwitchCase: 1,
          CallExpression: {
            arguments: 1
          }
        }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'type',
            'builtin', // Node.js builtins and external libraries
            'external',
            'internal',
            'object',
            [ 'parent', 'sibling' ], // Parent and sibling imports
            'index',
            'unknown'
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true

          },
          named: {
            enabled: true,
            import: true,
            export: true,
            require: true,
            cjsExports: true,
            types: 'types-last'
          },
          pathGroups: [
            {
              pattern: '~/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '$',
              group: 'unknown',
              position: 'after'
            }
          ],
          'newlines-between': 'always' // Enforce newline between groups
        }
      ]
    }
  }
];
