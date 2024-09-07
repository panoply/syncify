---
title: 'Authentication'
layout: base.liquid
permalink: '/setup/authentication/index.html'
anchors:
  - 'Authentication'
  - 'Scopes'
  - 'Credentials'
  - 'Using a .env file'
  - 'Using env variables'
  - 'Using Syncify .env file'
---

# Authentication

After installing Syncify you will need to configure a connection to your Shopify store. Syncify requires you provide either an Admin API Access Token (recommended) or API Key and Secret as credentials. You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) to obtain this information from Shopify. If you are coming from [Theme Kit](https://shopify.dev/themes/tools/theme-kit) you might be able to port those settings but it is recommended that you generate API access information specifically for usage with Syncify.

# Scopes

You need to provide Syncify read and write access to a couple of admin endpoints so it can perform operations. Below are the required scopes you will need to enable within in your private app.

{% include 'include/authentication' %}

# Credentials

Shop credentials can be stored within a `.env` or `.env.syncify.json` file. You can also provide credentials at runtime using `process.env` variables. The preferred approach is to store this information within a `.env` file. Syncify supports 3 different credential storage options.

### Using .ENV file

When using a `.env` file, you can provide shop credentials in either uppercase of lowercase format. The `.env` values **must** begin with the shop name following an underscore `_` character. If you are syncing to multiple storefronts just follow the pattern for each store. Developers who leverage

Using an **API Access Token**

```js
YOUR-SHOP-NAME_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz' // your-shop-name.myshopify.com
```

Using an **API Key** and **API Secret**

```js
YOUR-SHOP-NAME_API_KEY = 'abcdefghijklmnopqrstuvwz'      // your-shop-name.myshopify.com
YOUR-SHOP-NAME_API_SECRET = 'abcdefghijklmnopqrstuvwz'   // your-shop-name.myshopify.com
```

Using multiple stores **API Authorization**

```js
YOUR-SHOP-ONE_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz'  // your-shop-one.myshopify.com
YOUR-SHOP-TWO_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz'      // your-shop-two.myshopify.com

YOUR-SHOP-THREE_API_KEY = 'abcdefghijklmnopqrstuvwz'        // your-shop-three.myshopify.com
YOUR-SHOP-THREE_API_SECRET = 'abcdefghijklmnopqrstuvwz'     // your-shop-three.myshopify.com
```
