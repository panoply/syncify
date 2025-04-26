import type ADMZIP from 'adm-zip';
import type CLEANCSS from 'clean-css';
import type GRAYMATTER from 'gray-matter';
import type TERSER from 'html-minifier-terser';
import type YAML from 'js-yaml';
import type MARKDOWN from 'markdown-it';
import type POSTCSS from 'postcss';
import type SASS from 'sass-embedded';
import type TOML from 'smol-toml';
import type SVGO from 'svgo';

import { PluginCreator } from 'postcss';
import { Config } from 'tailwindcss';

export type ImportID =
 | 'toml'
 | 'yaml'
 | 'svgo'
 | 'cleancss'
 | 'postcss'
 | 'sass'
 | 'tailwind'
 | 'markdown'
 | 'matter'
 | 'admzip'
 | 'terser'

export interface ImportMap {
  'smol-toml': 'toml';
  'js-yaml': 'yaml';
  'svgo': 'svgo';
  'tailwindcss': 'tailwind';
  '@tailwindcss/postcss': 'tailwind';
  'postcss': 'postcss';
  'sass-embedded':'sass';
  'clean-css': 'cleancss';
  'markdown-it': 'markdown';
  'adm-zip': 'admzip',
  'gray-matter': 'matter',
  'html-minifier-terser': 'terser'
}

export type Dependencies =
 | 'smol-toml'
 | 'js-yaml'
 | 'adm-zip'
 | 'gray-matter'
 | 'html-minifier-terser'
 | 'svgo'
 | 'tailwindcss'
 | '@tailwindcss/postcss'
 | 'postcss'
 | 'sass-embedded'
 | 'clean-css'
 | 'markdown-it'

export interface Import extends Record<string, any> {
  <T extends Dependencies>(id: T, options?: { as?: boolean }): (
  T extends 'smol-toml' ? Promise<typeof TOML> :
  T extends 'js-yaml' ? Promise<typeof YAML> :
  T extends 'adm-zip' ? Promise<typeof ADMZIP> :
  T extends 'gray-matter' ? Promise<typeof GRAYMATTER> :
  T extends 'html-minifier-terser' ? Promise<typeof TERSER> :
  T extends 'svgo' ? Promise<typeof SVGO> :
  T extends 'tailwindcss' ? Promise<PluginCreator<Partial<Config>>> :
  T extends 'postcss' ? Promise<typeof POSTCSS> :
  T extends 'sass-embedded' ? Promise<typeof SASS> :
  T extends 'clean-css' ? Promise<typeof CLEANCSS> :
  T extends 'markdown-it' ? Promise<typeof MARKDOWN> : never)
  toml: typeof TOML;
  yaml: typeof YAML;
  svgo: typeof SVGO;
  cleancss: typeof CLEANCSS;
  postcss: typeof POSTCSS;
  sass: typeof SASS;
  tailwind: PluginCreator<Partial<Config>>;
  markdown: typeof MARKDOWN;
  matter: typeof GRAYMATTER;
  admzip: typeof ADMZIP
  terser: typeof TERSER
}
