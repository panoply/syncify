export const test = 'Valid syntax: paginate [collection] by number';

export const message = "Liquid syntax error (line 3): in tag 'paginate' - Valid syntax: paginate [collection] by number";

export const source = `<div>
  <div class="link">
      {% paginate  %}
        {% for product in collection.products %}

        {% endfor %}
      {% endpaginate %}
                                                </div>
</div>
{% # WE HOT RELOAD LAYOUT FILES %}
{% comment %} <nav>
<a class="link" href="/collections">Collection</a>
<a class="link" href="/customers/login">Login</a>
</nav>

<h1>Hello World!</h1> {% endcomment %}`;
