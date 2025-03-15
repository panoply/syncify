export const test = 'Syntax error in tag \'#\' - Each line of comments must be prefixed by the \'#\' character';

export const message = 'Liquid syntax error (line 34): Syntax error in tag \'#\' - Each line of comments must be prefixed by the \'#\' character';

export const source = `<!doctype html>
<html lang="{{   request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta
      http-equiv="X-UA-Compatible"
      content="IE=edge">
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1">

    <title>
      {{ page_title }}
    </title>

    <style>
      {{ settings.body_font | font_face }}
    </style>


    {{ 'base.min.css' | asset_url | stylesheet_tag }}

    <script
      type="module"
      src="{{ 'bundle.min.js' | asset_url }}"></script>

    {{ content_for_header}}

  </head>

  <body>

  {%  #
  d
  s  %}



  {% comment %} <nav>
    <a class="link" href="/collections">Collection</a>
    <a class="link" href="/customers/login">Login</a>
  </nav>

  <h1>Hello World!</h1> {% endcomment %}

    {{ content_for_layout}}

  </body>
</html>`;
