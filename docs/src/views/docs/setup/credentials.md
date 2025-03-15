---
title: 'Credentials'
layout: base.liquid
permalink: '/setup/credentials/index.html'
anchors:
  - 'Credentials'
  - 'Using .ENV file'
  - 'Using Keychain'
  - 'Store Passwords'
---

# Credentials

Shop credentials can be stored within the global syncify keychain or using `.env` file on a per-project basis. You can also provide credentials at runtime using `process.env` variables. The preferred approach is to store this information within a `.env` file. Syncify supports 3 different credential storage options.

---

# Using .ENV file

When using a `.env` file to manage shop credentials, you can specify keys in either uppercase or lowercase format, but they **must** start with the shop's name followed by an underscore (`_`). For example, if your shop is named **"MyShop"**, keys should look like `MYSHOP_API_KEY` or `myshop_api_key`. When dealing with multiple storefronts, simply repeat this pattern for each store.

> It's crucial to include `.env` files in `.gitignore` or using tools like dotenv for loading variables, and regularly updating API keys to maintain security.

Using an **API Access Token**

```js
YOUR-SHOP-NAME_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwz' // your-shop-name.myshopify.com
```

Using multiple stores **API Authorization**

```js
YOUR-SHOP-ONE_API_TOKEN = 'shpat_abcdefghijklmnopqrstuvwxz'  // your-shop-one.myshopify.com
YOUR-SHOP-TWO_API_TOKEN = 'shpat_zwxvutsreqponmlkjihgfedcb'  // your-shop-two.myshopify.com
```

---

# Using Keychain

The `.env` file approach provides a project-level reference for token management, but for developers managing multiple Shopify stores, the Syncify Keychain offers a more streamlined solution. The Syncify Keychain securely stores tokens on your local device and automatically associates them with the appropriate Syncify projects, enhancing token management across different store setups.

> The keychain method is fully manageable via the command line, where you can perform actions like setting up, associating, disconnecting, or migrating tokens using the keychain command.

Setup or control keychain up within **existing** syncify project

```bash
$ sy keychain # Run in a project that has already been setup
```

Keychain option will prompt when **setting up** a syncify project

```bash
$ sy setup # Automatically when setting up a new syncify project
```

---

# Store Passwords

If you are are working in partner account or password protected store, you can have Syncify automatically log you in during development phases. You can provide passwords within `.env` files following the same format as credentials.

Using `.env` file for password:

```js
YOUR-SHOP-NAME_PASSWORD = 'example' // your-shop-name.myshopify.com
```

Using `package.json` file for password:

```json
{
  "syncify": {
    "password": {
      "your-shop": "abc123"
    }
  }
}
```

> The [Shopify Autofill Pass](#) browser extension can be used to automatically fill and submit Shopify password pages for development preview stores.
