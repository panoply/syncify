---
title: 'Limitations'
layout: base.liquid
permalink: '/reference/limitations/index.html'
anchors:
  - 'Limitations'
  - 'Key Limitations'
  - 'Syncify and Shopify Tooling'
  - 'Final Note'
---

# Limitations

Syncify is a specialized tool designed for a niche group of experienced developers working within the Shopify ecosystem. It was created to address the shortcomings of Shopify's open-source offerings, particularly that prevalent of the Shopify CLI, which often prioritizes novice users over experienced or enterprise-level developers but Syncify is no unicorn, and its design choices impose certain constraints.

Syncify is not intended to be a universal solution or to achieve widespread adoption. While it aims to improve with each release, it has specific limitations that users should understand to ensure it aligns with their project requirements. It's important that users deciding to use Syncify, also consider that its maintenance is the work of a sole developer and a small contribution team who are focused on shipping rock-solid improvements to existing capabilities that do not require daily oversight or impede upon productivity.

> The consistent breaking changes common with the Shopify CLI are not something you'll be dealing with in Syncify. Prior to Syncify becoming public, the core API was being used in production by teams for years.

---

# Key Limitations

Syncify's limitations stem from its focus on replacing, rather than complementing, existing Shopify tools. It prioritizes standalone processing and a streamlined workflow, which restricts compatibility with certain tools, directory layouts, and extensibility options. These trade-offs are intentional to cater to advanced developers but may not suit all projects.

#### Incompatibility with Shopify CLI

Syncify is a complete replacement for the Shopify CLI in theme development workflows. It is not designed to integrate or coexist with the Shopify CLI. Developers seeking a complementary tool for the Shopify CLI should explore other options.

#### Incompatibility with Vite

Syncify does not support integration with Vite and is unlikely to do so in the future. It is built to handle theme processing independently, eliminating the need for Vite. Developers requiring Vite’s capabilities should consider [Shopify Vite](https://github.com/barrel/shopify-vite) instead. While using Syncify alongside Vite is technically possible, it is not recommended due to potential conflicts and inefficiencies.

#### No Support for Flat Directory Structures

Syncify currently requires a hierarchical directory structure and does not support flat directory layouts. This limitation may pose challenges for projects accustomed to flat structures or those using the Shopify CLI. Support for flat structures is planned for future releases, but no timeline is confirmed.

#### Lack of Plugin API

Syncify does not currently offer a plugin API or allow developers to hook into its transform operations. This restricts customization for advanced use cases. Syncify is evaluating the addition of a plugin API for the next major release, but it is not available at this time.

---

# Syncify and Shopify Tooling

Shopify provides a suite of tools, such as [Shopify Theme Check](#) and the [Shopify Prettier plugin](#), designed to enhance developer experience within the Shopify CLI ecosystem. While many of these tools are compatible with Syncify, optimal performance is achieved with tools specifically designed for Syncify. Those working on Syncify, also maintains alternatives, including:

- [VSCode Liquid Extension](#)<br> An editor extension for Liquid and Shopify development, offering features comparable to Shopify Theme Check with more advanced and tailored enhancements.

- [Æsthetic Formatter](#)<br> An alternative code formatter tailored for Liquid and Markup, providing surperior functionality similar to Shopify’s Prettier plugin with extended capabilities.

---

# Final Note

Developers considering Syncify should evaluate their project needs and workflow preferences. Syncify is best suited for experienced Shopify developers seeking a powerful, standalone tool for theme development. For those reliant on the Shopify CLI, Vite, or flat directory structures, alternative solutions may be more appropriate until Syncify’s planned updates address these limitations.

> For the latest updates on Syncify and feature development, refer to the [Releases](#) section or [GitHub](https://github.com/panoply/syncify) repository.
