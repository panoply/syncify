---
title: 'Stores'
layout: base.liquid
permalink: '/setup/stores/index.html'
prev:
  label: 'Introduction'
  uri: '/introduction/what-is-syncify/'
next:
  label: 'Key Concepts'
  uri: '/introduction/key-concepts/'
navs:
  - 'Credentials'
  - 'Using a .env file'
  - 'Using process.env variables'
  - 'Schema Store'
---

# Credentials

Shop credentials can be stored within a `.env` or `.env.syncify.json` file. You can also provide credentials at runtime using `process.env` variables. The preferred approach is to store this information within a `.env` file. Syncify supports 3 different credential storage options.

### Using `.env` or `syncify.env` file

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

### Using `process.env` variables

Syncify also supports runtime credential assignment. This approach allows you to set credentials via the command line or within a script executable. This is highly discouraged and rather insecure.

Using an **API Access Token**

```js
// Using an API Access Token
process.env['YOUR-SHOP-NAME_API_TOKEN'] = 'shpat_abcdefghijklmnopqrstuvwz';
```

Using an **API key** and **API Secret**

```js
// Using an API Key and API Secret
process.env['YOUR-SHOP-NAME_API_KEY'] = 'abcdefghijklmnopqrstuvwz';
process.env['YOUR-SHOP-NAME_API_SECRET'] = 'abcdefghijklmnopqrstuvwz';
```

### Using `env.syncify.json` file

Some developers may prefer to use an isolated reference point for credentials. In such cases you may provide credentials within a `env.syncify.json` file. This method can be helpful for projects which leverage Syncify across multiple stores. The file will need to added to your `.gitignore` for security purposes and entries are expressed in JSON using the following schema structure.

Using an **API Access Token**

```json
{
  "your-shop-name": "shpat_abcdefghijklmnopqrstuvwz"
}
```

Using an **API key** and **API Secret**

```json
{
  "your-shop-name": {
    "key": "abcdefghijklmnopqrstuvwz",
    "secret": "abcdefghijklmnopqrstuvwz"
  }
}
```

Using Multiple stores **API Authorization**

```json
[
  {
    "your-shop-one": "shpat_abcdefghijklmnopqrstuvwz"
  },
  {
    "your-shop-two": "shpat_abcdefghijklmnopqrstuvwz"
  },
  {
    "your-shop-three": {
      "key": "abcdefghijklmnopqrstuvwz",
      "secret": "abcdefghijklmnopqrstuvwz"
    }
  }
]
```
