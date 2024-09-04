---
title: 'Store References'
layout: base.liquid
permalink: '/setup/store-references/index.html'
navs:
  - 'Store References'
---

# Store References

Once you've configured credentials, you will need to provide store references. Stores references are provided within your projects `package.json` file on the `syncify > stores` key property. Syncify exposes a helpful command which you can use to automatically setup stores and themes.

Open up your terminal and run the following command:

```bash
$ pnpm syncify themes
```

You will be prompted:

```json
{
  "syncify": {
    "stores": {
      "domain": "shop-1", // equivalent of shop-1.myshopify.com
      "themes": {
        "dev": 123456789,
        "prod": 123456789,
        "test": 123456789
      }
    }
  }
}
```

The option accepts an **object** or **array** type. Each item will hold reference to your shopify store/s and their theme/s. For each store you define, you will provide the **shop** name, theme **target** name and **id**. The `themes` object uses a **key** > **value** structure, where the **key** represent a theme name (target) and the value a theme id.

The information you provide to this option can be used via the CLI when targeting and executing operations. Please refer to the [commands](#commands) portion of this readme for more information on CLI usage.

> **Note**
>
> The theme target name does need to match that defined in your online store and can be anything you like.
