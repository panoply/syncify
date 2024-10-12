---
title: 'Versioning'
layout: base
permalink: '/cli/versioning/index.html'
prev:
  label: 'Targeting'
  uri: '/cli/targeting'
next:
  label: 'Resources'
  uri: '/cli/filtering'
navs:
  - 'Versioning'
  - 'Semantic'
  - 'Examples'
flags:
  - '--patch'
  - '--minor'
  - '--major'
---

# Versioning

Syncify provides a constraint-based version control strategy, that is loosely inspired, yet diverging significantly from [SemVer](https://semver.org/). Unlike most development paradigms, Shopify theme development offers a unique, almost poetic flexibility in versioning. There's no mandated standard, which provides developers with extensive freedom in managing version control in themes.

The official [recommendation](https://shopify.dev/docs/storefronts/themes/best-practices/version-control) from Shopify on version control for themes is blurred, and describes Git source control practices rather than specific versioning strategies tailored for themes. Syncify offers developers a clearer directive on this front so they can differentiate between theme versioning themes and Git workflows.

Version control with Syncify is a tuple, modular arithmetic model. The least significant digit (LSD, or `patch`) and the penultimate digit (`minor` version) are subject to modulus operations for constraint management. This system enables dynamic versioning thresholds, offering maintainers precise control over theme updates and modifications.

```bash
Command:
  $ sy version             # Interactive version control prompt
  $ sy version --bump      # Increments theme version on the

Argument:
  $ sy version patch       # Increments the package.json version patch, e.g, 1.0.0 > 1.0.1
  $ sy version minor       # Increments the package.json version minor, e.g, 1.0.0 > 1.1.0
  $ sy version major       # Increments the package.json version major, e.g, 1.0.0 > 2.0.0
```

# Semantic

# Examples

### --patch

### --minor

### --major
