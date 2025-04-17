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

All Syncify projects require target references. These are entries that define the stores and themes your project engages with. This information can be specified in an external file or within your `package.json` under the syncify → stores key.

- `{yaml} package.json` <small class="fs-sm fc-gray pl-1">← &nbsp;&nbsp;recommended</small>
- `{yaml} stores.yaml`
- `{yaml} stores.toml`

Targets are used by Syncify to establish remote context for theme syncing, management, deployment, and resource related operations. If you have configured credentials and granted authentication access as outlined in the [authentication](/setup/authentication/) and [credentials](/setup/credentials/) sections, you can go ahead and define targets by running the `sy link` command.

---

# Targeting Unpublished Roles

TODO: Inform on how Syncify targets unpublished theme roles VS how the Shopify CLI targets dev theme roles.

---

# Defining Targets

Defining targets within a `package.json` file is the **recommended** method to use for managing store and theme references. You can specify project targets within an object located on the syncify → stores property. For each store, you need to provide the shop name, the target name for the theme, and the theme id. The structure within the package.json file for managing your Shopify stores and themes looks like this:

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

# Alternatives

The `stores.toml` or `stores.yaml` files serve as alternative methods for defining targets, particularly if you're not using NPM modules or prefer to keep store references in a dedicated file. These files enable you to manage your Shopify store configurations independently of your `package.json`. Here are the structures these files should follow:

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

---

# Managing Targets

Target management can be performed in several modes, with dedicated prompts for cherry-picking references provided by the `sy link` and `sy unlink` commands. These commands are designed to streamline the process of managing targets. The `sy link` command associates a new store or theme with a target, while the `sy unlink` command removes an existing target association. Both commands automate the process of defining and managing targets, making it easier for developers to configure project settings.

> The `sy link` command will extract the theme identifiers from store/s and write them to target reference points.
