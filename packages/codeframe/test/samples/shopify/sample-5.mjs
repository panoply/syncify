export const test = '[:pipe, "|"] is not a valid expression in "{{|test}}"';

export const message = 'Liquid syntax error (line 92): [:pipe, "|"] is not a valid expression in "{{|test}}"';

export const source = `<div
  id="navigation"
  {% if template.name == "index" %}
    class="container-fluid navbar-grid {{ section.settings.theme }}"
  {% else %}
    class="container-fluid navbar-grid"
  {% endif %}>

  {% liquid

    if template.name == 'product'
      if product.metafields.data.product_gender.value == 'Female'
        assign active = 'Woman'
      elsif product.metafields.data.product_gender.value == 'Male'
        assign active = 'Man'
      endif
    endif
  %}

  <div class="row jc-between ai-center px-1 px-md-3">
    <div class="col-auto d-none d-lg-unset">

    {% comment %}

      LEFT MENU

      Desktop menu/navigation which renders only in desktop viewports and
      will be hidden in mobile/tablet viewport as mobile menu takes its place.

    {% endcomment %}
      <nav class="nav-list list-left">
        <ul class="p-0 m-0">
          {% for link in linklists[section.settings.main_menu].links %}
            <li
              {% if link.active or active == link.title %}
                class="active"
              {% endif %}>
              <a
                href="{{ link.url }}"
                title="{{ link.title }}"
                spx-proximity="100"
                spx-scroll="0">
                {{ link.title }}
              </a>
            </li>
          {% endfor %}
        </ul>
      </nav>
    </div>

  {% comment %}

    MOBILE MENU

    Hamburger mobile drawer toggle, which renders in mobile only and is hidden
    until a table/mobile viewport has entered.
  {% endcomment %}
    <div class="col-auto col-sm d-unset d-lg-none fs-sm">
      <button
        type="button"
        class="btn btn-menu p-0 upper"
        aria-label="{{ 'layout.drawers.open_menu' | t }}"
        aria-expanded="false"
        spx-morph="false"
        spx@click="mobileMenu.toggle">

        {{ 'layout.navigation.menu' | t }}

      </button>
    </div>

  {% comment %}

    LOGO

    Renders the Brixtol Textiles logo. The column will persist in all viewports.

  {% endcomment %}

    <a
      href="{{ routes.root_url }}"
      title="{{ shop.name | upcase }}"
      class="navbar-logo mx-auto"
      spx-morph="false"
      spx-scroll="0"
      style="width: {{ section.settings.logo_size }}px;">

      <svg class="icon icon-logo">
        <use xlink:href="#svg-logo">
      </svg>
    </a>
    {{|test}}
  {% comment %}

    RIGHT MENU

    This column contains the right-side menu items, including the ajax cart
    toggle button and additional link lists.

  {% endcomment %}
    {% if section.settings.show_bag == true %}
      <div class="col-auto ml-auto tr">
        <nav
          id="navbar-right"
          class="nav-list list-right">
          <ul class="p-0 m-0">
            <li>
              <a
                href="{{ routes.cart_url }}"
                class="navbar-link navbar-cart no-hover mr-1"
                aria-label="{{ 'header.cart.aria_label' | t }}"
                aria-expanded="false"
                spx-disable="true"
                spx-morph="false"
                spx@click="bag.toggle">
                {{ 'header.cart.label' | t }}
              </a>
              <span
                class="cart-count"
                spx-morph="false"
                spx-node="cart.count">
                {{ cart.item_count }}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    {% endif %}

  {% comment %}

    LOCALE SELECTOR

    This button is used for locale selection and will expand the
    locale drawer section.

  {% endcomment %}
    <div class="col-auto bl pr-2 d-none d-lg-flex">
      <button
        type="button"
        class="nav-locale"
        aria-label="{{ 'locale.change_location' | t }}"
        aria-expanded="false"
        spx-morph="false"
        spx@click="drawerLocale.toggle">
        <img
          id="navbar-flag"
          src="{{ localization.country | image_url: width: 28 }}"
          alt="{{ localization.country.name }}"
          height="10"
          width="15">
        <span class="upper">
          {{ localization.language.iso_code }}
        </span>
      </button>
    </div>
  </div>
</div>
`;
