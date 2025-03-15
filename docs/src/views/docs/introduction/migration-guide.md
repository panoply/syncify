---
title: 'Migration Guide'
layout: base.liquid
permalink: '/migration-guide/index.html'
anchors:
  - 'Migration Guide'
  - 'Tooling'
  - 'Authorisation'
  - 'Next Steps'
---

# Migration Guide

Developers who are considering or planning to migrate from the Shopify CLI to Syncify CLI can follow this guide. It's important that developers first make the determination on whether Syncify is the right choice for them and/or their team. Though there are many benefits to Syncify, developers should take into consideration that it is an independent solution.

> Syncify does not require any Shopify backed or maintained tooling and you can freely uninstall any Shopify specific global dependencies if you are working exclusively on theme development.

# Tooling

Although these integrations are not strictly necessary, Syncify is designed to work with a suite of additional tools designed to improve its functionality. By incorporating these tools, you can make the most out of Syncify's capabilities and your overall development experience.

### VSCode Extension

For developers using VSCode, it is recommended to replace the Shopify (Theme Check) Extension with the [VSCode Liquid](#) Extension. This extension offers built-in support for Syncify, including all the linting and validation features of the Theme Check, plus additional tools tailored for Syncify theme development.

### Browser Extension

Developers should consider installing the Syncify browser extensions or add-ons for major browsers. These tools enhance the development process and support features like **Hot Reload** for real-time theme updates, thereby streamlining your workflow.

---

# Authorisation

The Shopify CLI employs tokens that are typically generated through the [Shopify Theme App](#). However, Syncify requires dedicated tokens for its operations. This necessity arises from the authorization scopes required by Syncify, which offers more sophisticated synchronization capabilities and interface options compared to the Shopify CLI. You can obtain dedicated storefront tokens directly from the Shopify Admin (refer to the [authentication](/setup/authentication/) section).

### Using ENV

Authorization tokens should be stored in `.env` files located at the root of your project directory. It's crucial to maintain the confidentiality of these files; they must not be committed to public GitHub repositories or exposed in any way.

### Using Keychain

For developers juggling multiple Shopify stores, Syncify offers a [Keychain](#) option. The Syncify keychain securely saves tokens on your local device and automatically links them to the correct Syncify projects, simplifying token management across various store configurations.

---

# Github Integration
