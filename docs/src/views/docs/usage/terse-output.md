---
title: 'Usage - Terse Output'
layout: base
permalink: '/usage/terse-output/index.html'
anchors:
  - 'Theme Exports'
---

# Terse Output

In Syncify, "terse" means minification which is a process that removes excess characters like whitespace, newlines, and comments from Shopify theme and asset files without breaking functionality, while applying optimizations that modify code to improve rendering performance. It trims file sizes for production builds and only kicks in when you run a Syncify with the `{bash} --prod` or `{bash} --terse` flags. The outcome is leaner files that boost performance on Shopify servers and downstream in the browser.

```ts
import { defineConfig } from '@syncify/config';

export default defineConfig({
  // ...
  transform: {
    script: {
      terse?: boolean | {} // ESBuild minification options or boolean
    },
    style: {
      terse?: boolean | {} // CleanCSS minification options or boolean
    },
    json: {
      terse?: boolean | {} // JSON minification options or boolean
    },
    liquid: {
      terse?: boolean | {} // Liquid minification options or boolean
    }
  }
});
```

> The built-in defaults for terse operations are available under the `transform` options. Syncify uses third-parties to apply minification and you can optionally choose an alternative for asset-specific transforms through processors.

---

# Why use terse minification?

Syncify is built on the belief that theme development should stay under the control of experienced developers, not left vulnerable to haphazard changes. Merchants might tweak settings in the Shopify editor or customizer, but edits from less skilled collaborators or third-party tools can mess with your setup. Terse output helps prevent casual tampering, layering in a level of intricacy you're best equipped to handle using source files as the master copy.

Picture a Swiss watch, precise and efficient, but needing a watchmaker's know-how to adjust. Terse output does the same for your themes, locking in their integrity and tying their maintenance to your expertise, so your role remains essential as a free-lancer or agency acting on behalf of a merchant.

Deciding whether to minify in Shopify themes depends on your goals. Shopify doesn't explicitly push minification for Liquid templates, it leans harder on caching and code optimization as its go-to performance fixes. The parser speedup is minor, and in isolation, it might not seem worth it. But the benefits grow in setups where HTML size impacts things. It's a solid move for production environments, especially if you’re pairing Syncify with tools that benefit from leaner outputs.

> The catch is readability as minified code gets messy, making it tougher to debug or tweak, especially if you are planning to use the Shopify editor.

---

# Terse Assets VS Terse Liquid

Majority of projects can skip terse minification on `.liquid` files, as it really is edge-case and designed for truly custom themes and experienced developers. Assets suchs as `.js` and `.css` however, should **ALWAYS** apply terse distribution and one should avoid having Shopify pre-process on the edge such file types (always use `.min.js` or `.min.css` file extensions). When we look objectively at the benefits of terse for `.liquid` files, there are a couple of meaningful considerations one might like to consider, most noteably on the Liquid parser level.

The Liquid parser for Shopify works in two main stages: parsing and rendering. During parsing, it reads the template and compiles it into an executable form. Rendering then generates the final HTML, often using a cached version in production. Minification can influence both stages, though the impact varies.

##### Faster Initial Parsing + TTFB

A minified template has fewer characters to process, which could speed up the initial compilation step. For instance, fewer spaces and line breaks mean less data for the parser to scan, potentially saving a small amount of time before the template is cached.

##### Negligible in Cached Renders

In production, Shopify caches compiled templates, so the parser skips re-parsing for subsequent requests. Here, minification’s effect on parsing speed is negligible, as the heavy lifting is already done. However, rendering still involves generating HTML, and a minified template produces smaller output (e.g., less whitespace), which might slightly reduce processing time.

---

<div class="spx mb-4">

# A Compelling Use Case: SPX

</div>

A standout use case for terse output of `.liquid` files can be seen with [SPX](https://spx.js.org) (Single Page XHR), which is an open-source tool that was designed to turns server-side rendered Shopify themes into fast single-page apps using push~state and XHR. SPX fetches HTML content and stores it as raw strings in the browser state as "snapshots" to handle navigation without full reloads. When Liquid templates are minified, the HTML strings SPX saves get smaller.

Since SPX holds onto these strings for caching and state management, the smaller size cuts memory use in the browser. When
storing multiple pages, this reduction drastically improves fetch times issues over the network and effecient memory management. It also means SPX might handle these strings a bit faster when updating the DOM during navigation, though modern JavaScript engines keep that gain small.

> SPX is development and maintained by the same author of Syncify. Take a look at the [Silk Strap](#) for a starting point theme using SPX and Syncify.

Picture a Shopify theme with a product page packed with descriptions, images, and variants. Without minification, the HTML could carry hundreds of unnecessary whitespace characters. SPX storing that bloated HTML in the browser state eats up more memory and slows things down as users move around. Minify it with Syncify, and the HTML shrinks significantly, easing the load on memory and keeping the app responsive. This setup, where client-side performance leans on compact HTML makes SPX a clear example of why terse distribution matters for some themes. It's not just about the parser, it's about what happens downstream in the browser.
