---
title: 'Syncify CLI'
layout: base
permalink: '/usage/syncify-cli/index.html'
prev:
  url: '/setup/targets/'
  title: 'Targets'
next:
  url: '/usage/modes/'
  title: 'Modes'
anchors:
  - Syncify CLI
  - Binaries
  - Command List
  - Generators
---

# Syncify CLI

Syncify is engineered as a Command Line Interface (CLI) tool, presenting a Terminal User Interface that combines functionality with an elegant design. It supports prompt-based navigation and short code flags for streamlined interaction.

The CLI leverages information from your project's `package.json`, which needs to reside in the root directory. Given its integration with Shopify, Syncify also requires a `.env` file with your store's credentials (find setup instructions at [authentication](/setup/authentication/)).

> This guide aims to introduce you to Syncify's basic command line operations, and help you understand how to execute different tasks and carry out operations for your local machine to your remote Shopify store and theme.

---

# Binaries

The CLI can be installed globally or locally depending on your preference. If installed globally, the `sy` (or `syncify`) binary becomes universally accessible from any project directory on your device. For those opting for project-specific installations, it is recommended that your provide `{json} "script":{}` shortcuts for your package manager to access the Syncify executable binary, for example:

### Global Install

Those who have opted for a global installation do not need to add a script shortcut. One of the benefits of using a global installation is that Syncify will perform periodic checks for version updates and notifies you when an update is available. In localized installations, this feature will not apply.

### Local Install

For those opting for project-specific installations, it is recommended that your provide `{json} "script":{}` shortcuts for your package manager to access the Syncify executable binary, for example:

```json
{
  "scripts": {
    "sy": "syncify" // Adding the executable to our package.json scripts
  }
}
```

> Developers are encouraged to use a global installation and avoid local project-level installs. The global binary makes your life easier and prevents excessive HD size.

---

# Command List

The following list includes frequently used commands and flags for the Command Line Interface (CLI). While the CLI offers a comprehensive array of commands, most developers typically rely on just four to five of these commands for their theme development tasks and operations.

{% raw %}

```bash
Default:
  $ sy                        # The binary command line name
  $ syncify                   # Alias of sy, meaning it can be used instead of sy

Modes:
  sy create                   # Generate a fresh Syncify theme strap boilerplate
  sy setup                    # Interactive helper for setting up Syncify
  sy build                    # Builds the theme from input source, can be used with filter
  sy watch                    # Watches theme for changes and builds theme from source
  sy pull                     # Pull prompt, sync remote versions with local (optional glob accepted)
  sy push                     # Uploads theme file/s to online store, use together with filter
  sy pack                     # Generate a versioned zip file based on current output
  sy duplicate                # Duplicates an existing theme in a store
  sy publish                  # Changes a theme role to main making it the live theme on a store
  sy keychain                 # Keychain control for token and store/theme access credentials
  sy help                     # Prints a list of commands, accepts examples argument
  sy git                      # Configure syncify git connections and branch workflows
  sy version                  # Version increment, accepts patch, minor or major (defaults to bump)
  sy inspect                  # Prints information about project and current installation
  sy prune                    # Purges and resets project cache to prevent stale references
  sy doctor                   # Helps diagnose and patch any potential issues in local projects

Flags:
  -h, --hot                   # Invokes watch mode but with HOT Reloading enabled
  -i, --input   <path>        # Overwrite config and specify the input source directory
  -o, --output  <path>        # Overwrite config and specify the output directory for themes
  -c, --config  <path>        # Overwrite directory path where config files exist

Targeting:
  -F, --filter  <glob>        # Glob match pattern file or directory matcher
  -T, --target  <args>        # Theme target names or store name and theme target names

Operations:
  --terse                     # Enables terse minification, will be enabled when running prod
  --clean                     # Removes all output files, use before bundling or watching
  --merge                     # Merges remote versions and current local source (input)
  --align                     # Performs subset json file merging with remote versions
  --prune                     # Resets local store, recommended to run every so often
  --bind                      # Polls remote sources during watch mode and updates local version
  --silent                    # Silence the logger, omit only errors

Environments:
  --dev, --development        # Run in development mode (default)
  --prod, --production        # Run in production mode, terse minification applies if enabled

Miscellaneous:
  -v, --version               # Prints the Syncify version used in your project

```

{% endraw %}

---

# Generators

With a fresh installation of Syncify, the first step is to utilize the setup and strap generator prompts. These prompts help you quickly create Syncify-ready projects with minimal effort. The cool thing about modern package managers is that you don’t even need Syncify installed to generate projects because tools like `npm`, `yarn` and `pnpm` offer `dlx` capabilities that can run it headless.

##### Setup

Open up your terminal and run the following command:

```bash
$ pnpm dlx @syncify/cli sy setup
```

##### Strap

If you have a project already created or `.env` file exists you can ran the `strap` command. This will provide you with a list of usage example and themes to generate.

```bash
$ sy strap
```

##### Themes

If you have a project already created or `.env` file exists you can ran the `strap` command. This will provide you with a list of usage example and themes to generate.

```bash
$ sy themes
```

---
