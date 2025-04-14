---
title: 'Store and Theme Targets'
layout: base.liquid
permalink: '/setup/targets/index.html'
anchors:
  - 'References'
  - 'Supported Files'
  - 'Using NPM Package File'
  - 'Using Theme Specific File'
---

# Targets

All Syncify projects require target references. These are entries that define the stores and themes your project engages with. This information can be specified in an external file or within your `package.json` under the syncify → stores key.

- `{yaml} package.json` <small class="fs-sm fc-gray pl-1">← &nbsp;&nbsp;recommended</small>
- `{yaml} store.yaml`
- `{yaml} store.toml`

Targets are used by Syncify to establish remote context for theme syncing, management, deployment, and resource related operations. If you have configured credentials and granted authentication access as outlined in the [authentication](/setup/authentication/) and [credentials](/setup/credentials/) sections, you can go ahead and define targets in one of the following files:

---

# Defining Targets

Syncify supports multiple methods for defining your store and theme targets. The recommended approach is to use the `package.json` file, however, for projects not using node.js, or if you prefer to separate your configuration, Syncify also supports `store.toml` and `store.yaml` files as alternatives.

> Remember, the way you define your store and theme targets will vary depending on which file format you choose. Syncify recommends the `package.json` method.

### Using NPM Package File

The package.json file can be used to store and manage information related to your store/s and themes, and it's the recommended method for configuration. Inside this file, you can specify your targets within an object located at the syncify → stores property. Here, you will list each of your Shopify stores along with their associated themes. For each store, you need to specify the shop name, the target name for the theme, and the theme id. The structure within the package.json file for managing your Shopify stores and themes looks like this:

:::: grid row mt-2
::: grid col-12 col-md-6 pr-4 mb-5 targets-height

##### Single Store + Multiple themes

```json
{
  "syncify": {
    "stores": {
      "shop-1": {
        "dev": 123456789,
        "prod": 123456789,
        "test": 123456789,
        "demo": 123456789,
        "example": 123456789
      }
    }
  }
}
```

:::
::: grid col-12 col-md-6 pl-4 mb-5 targets-height

##### Multiple Stores + Themes

```json
{
  "syncify": {
    "stores": {
      "shop-1": {
        "dev": 123456789,
        "prod": 123456789
      },
      "shop-2": {
        "dev": 1122334455,
        "prod": 998877334
      }
    }
  }
}
```

:::
::::

This configuration will be utilized by the CLI to target and execute operations on your specified stores and themes. The themes object follows a key-value structure where the key represents the name or target of the theme, and the value corresponds to the theme's ID. For a detailed guide on how to use this configuration with the CLI, including commands and practical examples, please refer to the [Syncify CLI](/usage/syncify-cli/) section.

---

### Using Theme Specific File

The `store.toml` or `store.yaml` files serve as alternative methods for defining store and theme targets, particularly if you're not using NPM modules or prefer to keep store references in a dedicated file. These files enable you to manage your Shopify store configurations independently of your `package.json`, offering flexibility tailored to your project's needs or personal preferences. Here are the structures these files should follow:

:::: grid row mt-5
::: grid col-12 col-md-6 pr-4 mb-2

#### Using Toml File

<!--prettier-ignore-->
```js
["shop-1"]
  dev = 123456789
  prod = 123456789
["shop-2"]
  prod = 123456789
  stage = 123456789
```

:::
::: grid col-12 col-md-6 pl-4 mb-2

#### Using Yaml File

<!--prettier-ignore-->
```js
'shop-1':
  dev: 123456789
  prod: 123456789
'shop-2':
  prod: 123456789
  stage: 123456789
```

:::
::::

> It recommended to use these methods as a **last resort** since they necessitate additional parsing steps, which can potentially impact runtime performance.
