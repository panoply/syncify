# Syncify using Tailwind

Example usage for Tailwind with Syncify. There are few different ways you can leverage Tailwind in style transforms, this example uses a `tailwind.config.ts` (TypeScript) file. You may optionally choose to use a `.js`, `.cjs` or `.mjs` file.

> **Note**
> The file extension used does not matter because Syncify will process all configuration files the same way.

<pre><code><strong>PASSWORD</strong>  →   <code>access</code>
<strong>PREVIEW</strong>   →   <a href="https://syncify.myshopify.com?preview_theme_id=137588572401">https://syncify.myshopify.com?preview_theme_id=137588572401</a>
</code></pre>

### Showcasing

- Preset VSCode Workspace
- Shared Schema File
- Tailwind Style Transform
- Custom Directory Structure

### Overview

The base stylesheet is contained within the `assets/style` directory. The `sections/page.liquid` file will showcase Tailwind usage within a theme file. The Tailwind configuration file applies some additional extends to the theme, but you'll notice that the `content[]` paths are left undefined. Syncify will populate content paths for you when none are provided.
