---
title: 'Store and Theme Targets'
layout: base.liquid
permalink: '/setup/targets/index.html'
anchors:
  - 'Targets'
  - 'Supported Files'
  - 'Using NPM Package File'
  - 'Using Theme Specific File'
---

# Targets

After setting up your credentials and granting the necessary authentication access, you'll need to specify targets. Targets are references for your stores and themes which are **required** by Syncify. These can be included in your project's `package.json` file under the **syncify** → **stores** key `{js} { "syncify": { "stores": {} } }`, or for those who prefer to keep this data separate, you can use a `theme.toml` or `theme.yaml` file.

Syncify offers convenient command/s to automatically link stores and themes to your project.

:::: grid row mt-3
::: grid col-12 col-md-6 fs-sm

```bash
$ sy theme    # Linking stores and themes
```

:::
::::

> Target association requires authentication access. Syncify will complain if you attempt to link stores or themes without credentials.

---

# Supported Files

The preferred method for storing target information is within the `package.json` file, which presumes the use of node.js and npm modules. However, if you're not using node or you simply prefer to maintain these references in a separate file, you can opt for the `theme.toml` or `theme.yaml` file.

> Remember, the way you define your store and theme targets will vary depending on which file format you choose. Syncify recommends the `package.json` method.

### Using NPM Package File

The `package.json` file can be used to store and manage information related to your store/s and themes, and it's the recommended method for configuration. Inside this file, you can specify your targets within an object located at the `syncify > stores` property. Here, you will list each of your Shopify stores along with their associated themes. For each store, you need to specify the shop name, the target name for the theme, and the theme's id.

The structure within the package.json file for managing your Shopify stores and themes looks like this:

:::: grid row mt-5
::: grid col-12 col-md-6 pr-4 mb-5

#### Single Store + Multiple themes

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
::: grid col-12 col-md-6 pl-4 mb-5

#### Multiple Stores

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

### Using Theme Specific File

The `theme.toml` or `theme.yaml` files serve as alternative methods for defining store and theme targets, particularly if you're not using NPM modules or prefer to keep store references in a dedicated file. Here are the structures these files should follow:

:::: grid row mt-5
::: grid col-12 col-md-6 pr-4 mb-5

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
::: grid col-12 col-md-6 pl-4 mb-5

#### Using Yaml File

<!--prettier-ignore-->
```yaml
shop-1:
  dev: 123456789
  prod: 123456789
shop-2:
  prod: 123456789
  stage: 123456789
```

:::
::::

These files enable you to manage your Shopify store configurations independently of your `package.json`, offering flexibility tailored to your project's needs or personal preferences. However, it's recommended to use these methods as a **last resort** since they necessitate additional parsing steps, which can potentially impact runtime performance.

---
