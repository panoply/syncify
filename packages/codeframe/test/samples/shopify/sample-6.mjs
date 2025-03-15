export const test = '\'endi\' is not a valid delimiter for if tags. use endif';
export const message = 'Liquid syntax error (line 7): \'endi\' is not a valid delimiter for if tags. use endif';
export const source = `<div
  id="navigation"
  {% if template.name == "index" %}
    class="container-fluid navbar-grid {{ section.settings.theme }}"
  {% else %}
    class="container-fluid navbar-grid"
  {% endi %}>

  {% liquid

    if template.name == 'product'
      if product.metafields.data.product_gender.value == 'Female'
        assign active = 'Woman'
      elsif product.metafields.data.product_gender.value == 'Male'
        assign active = 'Man'
      endif
    endif
  %}
</div>`;
