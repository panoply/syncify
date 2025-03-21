export const description = (mode: string) => ({
  create: {
    reference: 'https://syncify.sh/cli/sy-create',
    overview: 'The create command is an interactive command prompt. You can (optionally) provide a strap name option to skip choice selection. Options with strikethrough are either deprecated or not yet available for use.'
  },
  build: {
    reference: 'https://syncify.sh/cli/sy-build',
    overview: 'Runs Syncify in build mode, processing files from the input directory to create a Shopify-compliant theme structure in the output directory, ready for deployment.'
  },
  watch: {
    reference: 'https://syncify.sh/cli/sy-watch',
    overview: 'Runs Syncify in watch mode, monitors the input directory for file changes. On modification, it updates the output directory and uploads to a Shopify theme/store, keeping both in sync with local files.'
  },
  push: {
    reference: 'https://syncify.sh/cli/sy-push',
    overview: 'Upload theme files and/or resources to an online store. Use the push command to perform various sync operations with local versions.'
  },
  pull: {
    reference: 'https://syncify.sh/cli/sy-pull',
    overview: 'Download theme files and/or resources from an online store. This command can be used to align remote versions with local ones and carry out merge operations.'
  },
  projects: {
    reference: 'https://syncify.sh/cli/sy-projects',
    overview: 'Lists details of all Syncify projects on the device. Syncify maintains a hard cache in the OS home directory, which is accessed when the command runs. Optionally, specify a project directory name to retrieve info for that project.'
  },
  inspect: {
    reference: 'https://syncify.sh/cli/sy-inspect',
    overview: 'Prints information about the Syncify installation on your device or within your project. This information can be provided when submitting issues or reporting bugs.'
  },
  __: null
}[mode || '__']);
