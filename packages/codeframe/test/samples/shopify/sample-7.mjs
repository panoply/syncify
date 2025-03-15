export const test = 'Expected end_of_string but found';
export const message = 'Liquid syntax error (line 4): Expected end_of_string but found dotdot in "{{ section..settings.theme }}"';
export const source = `<div
  id="navigation"
  {% if template.name == "index" %}
    class="container-fluid navbar-grid {{ section..settings.theme }}"
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
</div>`;
