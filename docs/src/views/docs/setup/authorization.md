---
title: 'Authorization'
layout: base.liquid
permalink: '/setup/authorization/index.html'
navs:
  - 'Authorization'
  - 'Scopes'
  - 'Themes'
  - 'Files'
  - 'Pages'
  - 'Content'
---

# Authorization

After installing Syncify you will need to configure a connection to your Shopify store. Syncify requires you provide either an Admin API Access Token (recommended) or API Key and Secret as credentials. You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) to obtain this information from Shopify. If you are coming from [Theme Kit](https://shopify.dev/themes/tools/theme-kit) you might be able to port those settings but it is recommended that you generate API access information specifically for usage with Syncify.

### Scopes

You need to provide Syncify read and write access to a couple of admin endpoints so it can perform operations. Below are the required scopes you will need to enable within in your private app.

:::: grid row jc-between
::: grid col-auto

#### Themes

- write_themes
- read_themes

:::
::: grid col-auto

#### Files

- write_files
- read_files

:::
::: grid col-auto

#### Pages

- write_online_store_pages
- read_online_store_pages

:::
::: grid col-auto

#### Themes

- write_themes
- read_themes

:::
::: grid col-auto

#### Content

- write_online_store_content
- read_online_store_content

:::
::::

---

:::: grid row jc-center
::: grid col-12

<video controls width="100%" style="border: 5px solid #2d333a;border-radius: 10px;">
<source src="https://brixtol.cloud/open-source/shopify-token.mp4" type="video/mp4">
</video>

:::
::::

---
