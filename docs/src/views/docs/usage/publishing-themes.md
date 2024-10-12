---
title: 'Usage - Publishing Themes'
layout: base
permalink: '/usage/publishing-themes/index.html'
anchors:
  - 'Modes'
---

# Publishing Themes

Syncify supports theme publishing and can deploy projects to storefronts from the command line.

Version control in Shopify theme development is as crucial as it is in broader web development, albeit with unique considerations due to Shopify's platform-specific features. Utilizing systems like Git, developers can manage changes to Shopify themes efficiently, improves collaboration, provide a clear historical view of modifications and allows us to take advantage of rollback capabilities.

One of the commendable enhancements Shopify has offered to developers in recent years is the integration with the [GitHub App](https://github.com/apps/shopify), which significantly extends the possibilities for collaborative development and deployment processes. However, while this integration facilitates syncing between Shopify themes and GitHub repositories, it inherently isn't designed as a comprehensive and exclusive version control system.

Syncify offers a novel approach to version management inspired by, yet distinct from, [semantic versioning](https://semver.org/). It takes advantage of the great features already made possible with the Shopify Github App and adopts a versioning philosophy that, while drawing from the principles of semver, offers flexibility tailored for Shopify themes specifically. Unlike strict semantic versioning where changes are categorized into major, minor, and patch versions based on backward compatibility, Syncify's method is less rigid.

#### User-Defined Change Significance

Developers can assign a level of change (e.g., major, minor, tweak) based on practical impact rather than strict compatibility rules. This allows for more nuanced versioning that might reflect visual changes, performance tweaks, or minor bug fixes that might not fit neatly into traditional categories.

#### Contextual Version Tags

Instead of linear versioning, Syncify allows developers to tag versions with context. This contextual tagging aids in quickly identifying the nature of changes without needing to delve into commit histories.

#### Branch-Based Releases

Syncify encourages a workflow where each significant feature or change is developed in its branch. When merged into the main branch, it's tagged with a version that reflects its developmental history, making it easier to track and revert if necessary.

#### Integration with Deployment

Recognizing that Shopify themes are often deployed in live environments, Syncify's versioning integrates seamlessly with deployment processes. It ensures that every push to the live theme corresponds to a tagged version, facilitating easy rollbacks and updates.

This approach not only simplifies the management of Shopify theme versions but also enhances communication within development teams by providing a clear, flexible framework for understanding the scope and impact of changes over time. While it builds upon the foundation laid by Shopify's GitHub integration, Syncify's version control strategy offers a bespoke solution for the unique challenges faced by Shopify developers.

---

This description highlights Syncify's unique value proposition within the Shopify development landscape, focusing on adaptability and developer-centric versioning.
