---
title: 'Introduction'
layout: base.liquid
permalink: '/what-is-syncify/index.html'
anchors:
  - 'What is Syncify?'
  - 'Why Use Syncify?'
  - 'Core Principle'
  - 'How to use Syncify?'
---

# What is Syncify?

Syncify is a specialized CLI tool crafted for Shopify theme development, offering a robust alternative to the Shopify CLI. Designed for developers, agencies, and teams, it provides a high-performance, customizable solution that enhances productivity through a structured yet flexible approach to store development. Syncify integrates seamlessly with modern tooling, addressing the complex demands of e-commerce SaaS-facing webshop creation.

The inception of Syncify was driven by an apparent necessity within the Shopify developer community, which has long sought tools that work in harmony with the intricate demands of modern e-commerce SaaS-facing webshop development. Despite significant investment by Shopify, their open-source offerings for theme development via the Shopify CLI remains malnourished in features and functionality with most advancements focused on subset capabilities that cater to novices, often ignoring the needs of the experienced in this eco-system. Syncify is the independent open source alternative that has been engineered from the ground up to not only outperform Shopify's current offerings, but to bring developers a tool that actually works and does not impede upon their productivity.

---

# Why Use Syncify?

Syncify isn’t a universal substitute for the Shopify CLI - it’s designed for projects needing advanced features beyond basic tools. Before using it, ensure its capabilities match your goals. It offers specialized functionality too complex or specific for Shopify’s unopinionated framework, such as:

- Custom input → output directory structures for project organization.
- Compilation of TypeScript, JavaScript, TSX, and JSX for modern workflows.
- Support for Tailwind, PostCSS, and SASS in stylesheet management.
- Terse minification of Markup and Liquid for optimized performance.
- Static page generation via Markdown → Markup transformation.
- synchronization and data management of Metafield, Redirects, and Navigations.
- Version Controlled theme distribution ensuring consistency and traceability.
- Shared Schemas as a superset for advanced data modeling.
- Frontmatter support for Liquid driven template control.
- SVG transformation and sprite generation for efficient graphics.
- Multistore and theme parallel syncing for multi-environment management.
- Websocket HOT Reloads with CFH control and morphing for real-time feedback.
- Git-based automations with CI integration for streamlined workflows.

If you need a tool that tackles modern e-commerce complexities with performance-focused optimizations baked into the development process, Syncify is worth considering. It’s built for those who outgrow basic solutions.

> If you're content with the basic offerings of Shopify's CLI and none of the above capabilities are enticing or solve problems for you, then by all means, keep using the Shopify CLI solution. Syncify is an alternative, not a requirement.

---

# Core Principle

Syncify is built around a core principle: theme development should stay in the hands of skilled developers, not left open to unchecked edits. While merchants might adjust themes via the Shopify editor or customizer, changes could also come from other sources—like a less experienced collaborator or an external tool—potentially undermining your work. Syncify counters this by embedding context and complexity that only you, the developer, fully grasp, making it harder for merchants to replace you without losing that critical insight. This ensures theme longevity and positions you as an invaluable maintainer, fostering a dynamic where your expertise is both respected and relied upon.

To reinforce this, Syncify offers a terse, optimized output option for your themes, minimizing file sizes and discouraging direct modifications. Paired with file comments cautioning against theme editor use, this nudges adjustments toward the Shopify customizer while keeping the source under your control. Think of an Apple product: sleek and functional, but designed to require specialized knowledge for alterations. Syncify adopts this mindset—your themes remain intentional and robust, tying their success to your skills and making your role central to the process.

---

# How to use Syncify?

If Syncify is entirely new to you, start with the [installation](/setup/installation/) process, followed by understanding the [authentication](/setup/authentication/) procedures. These are essential first steps. For hands-on learning, check out the [Syncify Straps](https://github.com/SyncifyCLI) repository, for examples and themes designed to illustrate how Syncify can be leveraged in real-world scenarios.

1. [Installation Guide](/setup/installation/)
2. [Access Tokens and Authentication](/setup/authentication/)
3. [Examples in Syncify Straps](/syncify-straps/)
4. [Command Line Usage](/usage/syncify-cli/)

It's important new adopters understand that Syncify demands a mindset shift, especially if you’re used to Shopify CLI workflows. It doesn't replicate behaviour you already know, it redefines sync operations between local and remote sources with different approaches. It's goal is to provide skilled developers a solution that improves their productivity.
