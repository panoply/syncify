---
title: 'Usage - Version Control'
layout: base
permalink: '/usage/version-control/index.html'
anchors:
  - 'Modes'
---

# Version Control

Syncify provides a constraint-based version control strategy that is loosely inspired by, yet significantly diverges from, [SemVer](https://semver.org/). Unlike most development paradigms, Shopify theme development offers a unique, almost poetic flexibility in versioning. With no mandated standard, developers have extensive freedom in managing version control for themes.

The official [recommendation](https://shopify.dev/docs/storefronts/themes/best-practices/version-control) from Shopify on version control for themes is blurred, and describes Git source control practices rather than specific number-based versioning strategies tailored for themes. Syncify offers developers a clearer directive on this front so they can differentiate between theme versioning themes and Git workflows.

Version control with Syncify is a tuple, modular arithmetic model. The least significant digit (LSD, or `patch`) and the penultimate digit (`minor` version) are subject to modulus operations for constraint management. This system enables dynamic versioning thresholds, offering maintainers precise control over theme updates and modifications.

# Version Increments

The modular arithmetic model that Syncify appropriates allows users to define specific thresholds for version increments. This facilitates a controlled approach to versioning that can be tailored to fit project requirements. By default, Syncify will use a modulus of **10** on `patch` and `minor` numbers and any number reaching **10** will be reset to **0** and an increment will be applied on the next higher place value.

The custom nature of this approach allows you to specify thresholds that dictate when to roll over to the next significant version level (`minor` or `major`) based on predefined constraints.

### Example of Version Progression

1. **Starting Version**: `1.24.9`
2. **Patch Increment**: The patch number increases from `9` to `10`.
3. **Version After Increment**: Since the patch number exceeds its limit, it resets, resulting in `1.25.0`.

This method establishes a **capped versioning system**, where predetermined limits guide version progression.

## Configuration

Syncify's default setting caps the patch at `10`. You can configure these limits as follows:

```json
{
  "versioning": {
    "patchLimit": 15,
    "minorLimit": 30
  }
}
```

### Configuration Details

- **patchLimit**: Sets the maximum patch number before incrementing the minor version.
- **minorLimit**: Sets the maximum minor version before incrementing the major version.

## Summary

The **Modular Arithmetic Model** in Syncify offers a systematic way to manage version numbers, allowing for customized version control aligned with project specifics.

---

This version maintains a professional tone suitable for documentation, focusing on clear explanations and minimal excitement.
