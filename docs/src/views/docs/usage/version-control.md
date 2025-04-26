---
title: 'Usage - Version Control'
layout: base
permalink: '/usage/version-control/index.html'
anchors:
  - 'Version Control'
  - 'Modular Arithmetic Model'
  - 'Default Behaviour'
  - 'Version Source'
  - 'Progression Example'
  - 'Configuration'
  - 'Options'
  - 'CLI Commands'
---

# Version Control

Syncify introduces a strategic version control system based on the Modular Arithmetic Model (**MaM**), a unique approach inspired by, but distinct from, [SemVer](https://semver.org/). The MaM tactic in its appropriation by Syncify to Theme development is designed around the idea that progression should be predictive and controlled. This is acheived by offering a flexible and adaptable versioning strategy that can be customized to fit your development flow.

Shopify theme development offers significant flexibility in versioning but lacks a standardized convention or universally accepted approach. The [official Shopify recommendation](https://shopify.dev/docs/storefronts/themes/best-practices/version-control) focuses more on Git practices than on number-based versioning for themes, offering little clarity on the best approach.

Syncify attempts to address this gap by providing a clear directive for consistent and predictable versioning. The rationale behind standardizing theme versioning is that every change—whether minor or major—should be reflected in the version number, ensuring clarity and consistency throughout the development lifecycle.

While one might argue that adhering to a strict versioning standard could hinder productivity in the context of Shopify theme development, Syncify’s approach is more flexible and less rigid than the component-level versioning often seen in SemVer. This flexibility allows developers to manage versioning according to their needs, while Syncify offers a structured solution that clearly distinguishes between theme versioning and Git workflows.

---

# Modular Arithmetic Model

Syncify’s MaM approach simplifies versioning with modulus-based constraints. The least significant digit (LSD, or `patch`) and the penultimate digit (`minor`) are controlled by modulus operations. This approach gives developers precise control over updates and modifications while maintaining flexibility.

> The MaM model allows users to define thresholds for version increments, enabling a controlled, tailored approach to versioning. There is no imposed strictness, so you can always reset versions numbers.

### Default Behavior

By default, Syncify applies a modulus of `{js} 10` to the **patch** and **minor** numbers, which in turn control the **major** version increments. In practical terms, when either the **patch** or **minor** number reaches `{js} 10`, it is reset to `{js} 0`, and the next higher version level (either **minor** or **major**) is incremented. For example, if the **patch** number hits 10, it resets to 0, and the **minor** number increments. Similarly, if the **minor** number reaches `{js} 10`, it resets to `{js} 0`, and the **major** number is incremented.

This system of version progression is fully customizable. You can adjust the modulus threshold to define when to roll over to a new version level, whether it's **minor** or **major**. This flexibility allows you to tailor the versioning behavior to your development needs while maintaining predictable progression.

# Version Source

The version source for themes is primarily determined by the existence of a `package.json` file in your project. If present, Syncify uses the `{json} "version"` specified in `package.json` as the reference for versioning. However, if no package.json file exists, Syncify defaults to using the `{json} "theme_version"` value contained within `settings_schema.json`.

The `{ts} { references: [] }` option available on the `versioning` setting allows you to control which reference Syncify uses for versioning. By default, `package.json´ takes precedence when both files are present. However, you can optionally configure Syncify to use the settings_schema.json version value as its increment reference instead.

> Additionally, you can set up version binding to implement custom versioning rules based on the source file you choose, providing flexibility in managing version control across different project structures.

# Progression Example

Here’s how versioning would progress with `minorLimit` set to `{js} 30` and `patchLimit` set to `{js} 9`, starting from a theme version of `{js} 1.28.8`. This setup specifies that the patch version will reset before reaching `{js} 9`, and the minor version will roll over after it hits `{js} 30`. Using the starting version `{js} 1.28.8`, we can see how the versioning system functions as these limits are reached and thresholds are crossed.

{% include 'version-example' %}

This creates a **capped versioning system**, where the `minorLimit` and `patchLimit` are predefined thresholds that control how version numbers progress. These limits ensure that version increments occur predictably, maintaining a clear versioning structure as your project evolves.

---

# Configuration

Syncify's default setting caps the patch at `10` for both **patch** and **minor** increments. Freedom to control versioning behaviour creates a **capped versioning system**, where limits define how version numbers progress. Hooking into the Modular Arithmetic Model through the `versioning` setting offers a systematic way to manage how version increments should behave.

<!--prettier-ignore-->
```js
import { defineConfig } from '@syncify/config';

export default defineConfig({
  vc: {
    patchLimit: 10,      // When patch exceeds 10, minor increments, e.g: 1.8.9 > 1.9.0
    minorLimit: 10,      // When minor exceeds 10, major increments, e.g: 1.9.0 > 2.0.0
    references: []       // Specify the version sources to reference
  }
})
```

# Options

All `vc` settings are optional and control how Syncify manages version progression. When the option is not defined, Syncify will use its default versioning options. By default, Syncify applies **MaM** increments at a modulas of `10` before progressing **minor** and **major** version bumps. However, if you prefer to disable this versioning all together, you can pass a boolean `false` to the `versioning` option and it will prevent Syncify from applying any version progression, giving you full control over this aspect.

> Disabling MaM version progression may lead to unexpected results when using the [publish](#) feature. It is recommended to use the default settings during the pre-release phase of Syncify.

##### Patch Limit `{ts} { patchLimit: number }`

Sets the maximum patch number before incrementing the minor version. Passing a value of `0` will result in **minor** version increments only. Defaults to `10`.

##### Minor Limit `{ts} { minorLimit: number }`

Sets the maximum minor version before incrementing the major version. Passing a value of `0` will result in **major** version increments only. Default to `10`.

##### References `{ts} { references: string[] }`

Sets the version source references that will increment. This setting is optional and accepts 2 values, `package.json` and/or `settings_schema.json`. By default, Syncify sets the `references` option to an empty array, which will result in Syncify automaticaly determining which version source is available based on their existence in your project.

---

# CLI Commands

The `sy version` command provides a flexible interface for managing theme versioning. You can use it interactively or with specific arguments to control version progression. The interactive prompt (`sy version`) allows manual version control, while the `--bump`
flag automatically increments the version based on configuration.

```bash
Command:
  sy version             # Interactive version control prompt
  sy version --bump      # Increments theme version on the

Argument:
  sy version patch       # Increments the package.json version patch, e.g, 1.0.0 to 1.0.1
  sy version minor       # Increments the package.json version minor, e.g, 1.0.0 to 1.1.0
  sy version major       # Increments the package.json version major, e.g, 1.0.0 to 2.0.0
```

> Additional arguments like `patch`, `minor`, or `major` enable direct updates to the version in `package.json`, reflecting changes like 1.0.0 → 1.0.1, 1.0.0 → 1.1.0, or 1.0.0 → 2.0.0, respectively.
