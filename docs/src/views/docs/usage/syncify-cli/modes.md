---
title: 'Usage - Modes'
layout: base
permalink: '/usage/modes/index.html'
anchors:
  - Modes
  - sy init
  - sy create
  - sy build
  - sy watch
  - sy pull
  - sy push
  - sy pack
  - sy duplicate
  - sy publish
  - sy keychain
  - sy help
  - sy git
  - sy version
  - sy inspect
  - sy prune
  - sy doctor
prev:
  url: '/setup/targets/'
  title: 'Targets'
next:
  url: '/usage/modes/'
  title: 'Modes'
---

# Modes

Modes in Syncify define distinct execution tasks that drive your Shopify theme development workflow. Each mode corresponds to a specific command, enabling developers to perform actions like building, syncing, or managing themes with precision. There are a range of modes available, designed to tackle everything from setup to deployment.

:: row jc-center
:: col-12

```bash
Modes:
  sy init                     # Interactive helper for setting up Syncify
  sy create                   # Generate a fresh Syncify theme strap boilerplate
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
```

::
::

:: row mt-5
:: col-12 col-md-12 fs-sm

## sy init

The sy init mode launches an interactive helper to guide you through configuring Syncify for your environment. This command prompts for essential details—like store credentials, theme selection, and directory preferences—streamlining the initial setup process. It’s particularly useful for first-time users or when onboarding Syncify to a new project, ensuring a smooth integration without the guesswork.

## sy create

The sy create mode generates a fresh Syncify theme strap boilerplate, providing a ready-to-use starting point for Shopify theme development. This command sets up a structured foundation with pre-configured files and directories, incorporating Syncify’s best practices. It’s ideal for developers kicking off a new project who want to bypass manual setup and dive straight into customization, leveraging a template designed for performance and extensibility.

## sy build

The sy build mode processes your theme’s input source files and generates a Shopify-compatible output structure. It compiles assets, applies optimizations, and organizes files according to your configuration. Optionally, you can pair it with filters to target specific files or directories, making it versatile for both full builds and incremental updates. Use this mode when preparing a theme for deployment or testing locally.

## sy watch

The sy watch mode runs Syncify in a continuous monitoring state, watching the input directory for file changes. When modifications occur, it rebuilds the affected files, writes them to the output directory, and uploads them to your Shopify store. This real-time syncing is perfect for active development, especially when paired with flags like --hot for live reloads, keeping your local and remote environments aligned effortlessly.

## sy pull

The sy pull mode syncs your local environment with remote theme files from a Shopify store. It prompts for confirmation and supports optional glob patterns to selectively retrieve specific files or directories. Use it with flags like --merge for comprehensive updates or --align for faster JSON-only pulls. This mode is essential when reconciling remote changes—whether from the theme customizer or external edits—into your local project.

## sy push

The sy push mode uploads theme files from your local output directory to a Shopify store. It’s designed for deploying updates and can be combined with filters to push only specific files, offering precise control over what goes live. This mode is your go-to for publishing changes after building or testing, ensuring your store reflects the latest version of your work.

## sy pack

The sy pack mode creates a versioned ZIP file of your theme based on the current output directory. This generates a portable, deployable package suitable for backups, sharing, or manual uploads to Shopify. It’s a handy tool for archiving milestones or distributing themes to clients, with versioning built in to track progress.

## sy duplicate

The sy duplicate mode clones an existing theme within a Shopify store, creating an identical copy under a new name. This is useful for testing variations, staging updates, or preserving a working version before making experimental changes. It keeps your workflow flexible by letting you iterate without risking the original theme.

## sy publish

The sy publish mode sets a theme’s role to "main," making it the live, customer-facing version on your Shopify store. This command finalizes your deployment process, activating the theme after building and pushing updates. It’s a critical step for going live, ensuring your work is front and center for the store’s audience.

## sy keychain

The sy keychain mode manages access credentials, such as tokens and store/theme associations, within Syncify’s keychain system. It allows you to add, update, or remove authentication details securely, simplifying multi-store or multi-theme workflows. This mode is key for maintaining smooth connections across projects without manual credential juggling.

## sy help

The sy help mode displays a list of available commands and their descriptions. When paired with an --examples argument, it provides practical usage snippets, making it a quick reference for both new and seasoned users. Run this when you need a refresher on Syncify’s capabilities or inspiration for leveraging its features.

## sy git

The sy git mode configures Syncify’s integration with Git, setting up connections and branch workflows for version control. It streamlines automation tasks—like committing builds or syncing with CI pipelines—tying your development process to a Git-based strategy. Use this mode to align Syncify with your team’s source control practices.

## sy version

The sy version mode handles theme versioning, incrementing numbers with options like --patch, --minor, or --major. By default, it applies a simple bump. This keeps your releases organized and traceable, whether you’re marking small fixes or significant updates, and pairs well with sy pack for distribution.

## sy inspect

The sy inspect mode outputs detailed information about your project and Syncify installation, including configuration, paths, and dependencies. It’s a diagnostic tool for verifying your setup or troubleshooting issues, giving you a clear snapshot of your environment at any point in the development cycle.

## sy prune

The sy prune mode clears and resets Syncify’s project cache, eliminating stale references that might cause inconsistencies. This is a maintenance task to keep your builds clean and reliable, especially after significant changes to files or configurations. Run it when you suspect cached data is skewing results.

## sy doctor

The sy doctor mode analyzes your local project for potential issues and suggests fixes. It checks configurations, file integrity, and Syncify’s health, acting as a troubleshooting assistant. Use this when something feels off—whether it’s build errors or sync failures—to diagnose and patch problems efficiently.

::
::

---
