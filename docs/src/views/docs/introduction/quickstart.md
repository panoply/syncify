---
title: 'Quickstart'
layout: base.liquid
permalink: '/quickstart/index.html'
anchors:
  - 'Quickstart'
  - 'Key Features'
  - 'Developer Driven Innovation'
  - 'Rationale'
---

# Quickstart

For experienced developers or those who prefer to jump right in, getting started with a Syncify-powered project takes only a few straightforward steps. While it is strongly encouraged that you review the documentation for a more in-depth understanding, Syncify is designed to be intuitive and developer-friendly. Whether you're tackling a new project or integrating Syncify into an existing workflow, the well-structured API and extensive type definitions make it easy to adapt and evolve without a steep learning barrier.

### Pre-requisites

Before going ahead with the quickstart, please ensure you have the following:

1. Git v2.2^
2. Node v20^
3. Pnpm v9.1^

### Authentication

Syncify requires access to your Shopify store. The setup [authentication](/setup/authentication/) guide can assist you in obtaining an API Token. This guide will assume that you have a Shopify API Key at hand or reference to one.

# Setup

If you haven't already, let's install Syncify.

```bash
$ pnpm init
$ pnpm add @syncify/cli --save-dev
```

Next, we will run the `setup` command. The setup command will prompt you and allow you to choose a [Strap](https://github.com/syncifycli/) to hack with. Fill in the information, select a strap and then have Syncify publish the strap to your store.

```bash
$ pnpm sy setup
```

That's it, now let's quickly go over some basic commands.

# Usage

The main commands and modes you'll use will be **watch** and **build** so let's go over them.

```bash
$ pnpm sy -w            # Watch
$ pnpm sy -w --hot      # Watch with HOT Reloading
$ pnpm sy -b            # Build the theme
$ pnpm sy -p            # Publish theme to store
$ pnpm sy -u            # Upload files to theme
```
