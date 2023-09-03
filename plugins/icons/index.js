export default function () {

  const { icons } = config.views;

  if (u.isBoolean(icons.useCustomTag)) {
    $.svg.icons.useCustomTag = icons.useCustomTag;
  } else {
    typeError('icons', 'replacer', icons.useCustomTag, 'boolean');
  }

  if (has('vscodeCustomData', icons)) {

    if (!u.isBoolean(icons.vscodeCustomData)) {
      typeError('icons', 'vscodeCustomData', icons.vscodeCustomData, 'boolean');
    }

    if ($.svg.icons.useCustomTag && icons.vscodeCustomData) {

      if (!existsSync(cache.vscode.uri)) {
        try {
          await mkdir(cache.vscode.uri);
        } catch (e) {
          throw new Error(e);
        }
      }

      let name: string = 'icon';

      if (has('tagName', icons)) {
        if (u.isString(icons.tagName)) {

          const test = /[a-z](?:[a-zA-Z-]+)?/.test(icons.tagName);

          if (test && !u.is(last(icons.tagName).charCodeAt(0), 45)) {
            name = icons.tagName;
          } else {
            invalidError('icons', 'tagName', icons.tagName, '[a-z] | [a-z]-[a-z]');
          }
        } else {
          typeError('icons', 'tagName', icons.tagName, 'string');
        }
      }

      const schema = {
        version: 1.1,
        tags: [
          {
            name,
            description: {
              kind: 'markdown',
              value: 'Replacer SVG icon name helper. Replaces all matched tags with the SVG file.'
            },
            attributes: [
              {
                name: 'name',
                values: [],
                description: 'The SVG icon name or id',
                valueSet: 'is'
              },
              {
                name: 'from',
                values: [],
                description: 'Where to import the icon from',
                valueSet: 'is'
              }
            ],
            references: [
              {
                name: 'Syncify Reference',
                url: 'https://syncify.myshopify.com/pages/icons#vscode-html-data'
              }
            ]
          }
        ]
      };

      await writeJson(cache.vscode.data.icons, schema, { spaces: 0 });

      const file = await createVSCodeDir(bundle as Bundle);
      const settings = pathExistsSync(file) ? await readJson(file) : {};

      if (!settings['html.customData']) settings['html.customData'] = [];

      if (!includes(cache.vscode.data.icons, settings['html.customData'])) {

        settings['html.customData'].push(cache.vscode.data.icons);

        await writeJson(file, settings, {
          spaces: $.json.indent
        });
      }

    }
  }
}
