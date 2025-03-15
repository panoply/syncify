export default {
  projects: {
    syncify: {
      schema: [
        '.vscode/graphql/schema.json'
      ],
      documents: [
        'syncify/http/**/*.ts'
      ],
      languageService: {
        cacheSchemaFileForLookup: false,
        enableValidation: true
      }
    }
  }
};
