---
title: 'Authentication'
layout: base.liquid
permalink: '/setup/authentication/index.html'
anchors:
  - 'Authentication'
  - 'Scopes'
---

# Authentication

After installing Syncify you will need to configure a connection to your Shopify store. Syncify requires you provide either an Admin API Access Token (recommended) or API Key and Secret as credentials. You will need to create a [private app](https://help.shopify.com/en/manual/apps/private-apps) to obtain this information from Shopify. If you are coming from [Theme Kit](https://shopify.dev/themes/tools/theme-kit) you might be able to port those settings but it is recommended that you generate API access information specifically for usage with Syncify.

# Scopes

You need to provide Syncify read and write access to a couple of admin endpoints so it can perform operations. Below are the required scopes you will need to enable within in your private app.

{% include 'include/authentication' %}
