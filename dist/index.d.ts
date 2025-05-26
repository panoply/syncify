/// <reference path="../node_modules/@types/clean-css/index.d.ts" />
/// <reference path="../node_modules/svgo/lib/svgo.d.ts" />
/// <reference path="../node_modules/postcss/lib/postcss.d.ts" />
/// <reference path="../node_modules/tailwindcss/types/index.d.ts" />
/// <reference path="../node_modules/esbuild/lib/main.d.ts" />
/// <reference path="../node_modules/type-fest/index.d.ts" />

import { BuildOptions } from 'esbuild';
export { BuildOptions as ESBuildOptions } from 'esbuild';
import { OptionsOutput } from 'clean-css';
import { AcceptedPlugin, Plugin, Transformer, TransformCallback } from 'postcss';
import { Options } from 'sass-embedded';
import { Config as Config$1 } from 'tailwindcss';
import { Config as Config$2 } from 'svgo';
export { Config as SVGOConfig } from 'svgo';
import { Options as Options$1 } from 'markdown-it';

/* -------------------------------------------- */
/* BASE DIRECTORIES                             */
/* -------------------------------------------- */

type Directories = {
  /**
   * The resolved `input` directory path
   *
   * @default 'source/'
   */
  input?: string;
  /**
   * The resolved `output` directory path
   *
   * @default 'theme/'
   */
  output?: string;
}

type Git = {
  /**
   * Specifies the default branch where your project exists. This branch will be be used to trigger
   * the auto-merging behaviour when running `git pull`. Your `output` (theme) directory will not
   * exist within this branch unless explicitly excluded from `.gitignore` file.
   *
   * > Please refer to the [Syncify Git Integration](https://syncify.sh/usage/git) for more information.
   *
   * @default 'master'
   */
  default?: string;
  /**
   * Specifies the production branch name, which is primary sync branch. This is the branch
   * that Syncify will auto-publish the flat **output** directory too, and is not to be confused
   * with the branch where your **input** (source) lives. Instead, this is the branch used by the
   * [Shopify Github Integration](https://shopify.dev/docs/storefronts/themes/tools/github).
   *
   * > **PLEASE NOTE**
   * >
   * > Syncify assumes that the default branch of your respository is named `master` (as per the original
   * > and correct naming convention for Git). The `main` branch is **NOT** considered the "main" branch
   * > but instead it is used as the distributed flat-structure point of your theme as per the `role` name
   * > used for live themes published in your store.
   * >
   * > Please refer to the [Syncify Git Integration](https://syncify.sh/usage/git) for more information.
   *
   * @default 'main'
   */
  branch?: string;
  /**
   * A glob pattern of files (or directories) which apply conflict-free merging. These entires force-merge
   * into **input** (source) upon `git pull` operations. You'd use the option for `.json` configuration
   * specific files such as templates that auto-write settings from the editor.
   *
   * ```js
   * {
   *   // all templates will overwrite source.
   *   force: ['templates/*.json' ]
   * }
   * ```
   *
   * @default []
   */
  force?: string[];
  /**
   * Defines branch relationships for mirroring. Each key is a branch name, and the value is an
   * array of branches that will mirror content changes published via the Shopify Github Integration.
   *
   * Mirrors allow developers to define dynamic branch reflections, for example:
   *
   * ```js
   * {
   *   stage: ['pre']        // ensures the stage branch mirrors the pre branch.
   *   dev: ['main','pre']  // ensures the dev branch mirrors both main and pre branches.
   * }
   * ```
   *
   * @default {}
   */
  mirror?: { [branch: string]: string[] }
}

/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

@category Type
*/
type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint;

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- It has to be an `interface` so that it can be merged.
	interface SymbolConstructor {
		readonly observable: symbol;
	}
}

/**
Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.

@example
```
import type {Simplify} from 'type-fest';

type PositionProps = {
	top: number;
	left: number;
};

type SizeProps = {
	width: number;
	height: number;
};

// In your editor, hovering over `Props` will show a flattened object with all the properties.
type Props = Simplify<PositionProps & SizeProps>;
```

Sometimes it is desired to pass a value as a function argument that has a different type. At first inspection it may seem assignable, and then you discover it is not because the `value`'s type definition was defined as an interface. In the following example, `fn` requires an argument of type `Record<string, unknown>`. If the value is defined as a literal, then it is assignable. And if the `value` is defined as type using the `Simplify` utility the value is assignable.  But if the `value` is defined as an interface, it is not assignable because the interface is not sealed and elsewhere a non-string property could be added to the interface.

If the type definition must be an interface (perhaps it was defined in a third-party npm package), then the `value` can be defined as `const value: Simplify<SomeInterface> = ...`. Then `value` will be assignable to the `fn` argument.  Or the `value` can be cast as `Simplify<SomeInterface>` if you can't re-declare the `value`.

@example
```
import type {Simplify} from 'type-fest';

interface SomeInterface {
	foo: number;
	bar?: string;
	baz: number | undefined;
}

type SomeType = {
	foo: number;
	bar?: string;
	baz: number | undefined;
};

const literal = {foo: 123, bar: 'hello', baz: 456};
const someType: SomeType = literal;
const someInterface: SomeInterface = literal;

function fn(object: Record<string, unknown>): void {}

fn(literal); // Good: literal object type is sealed
fn(someType); // Good: type is sealed
fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`
```

@link https://github.com/microsoft/TypeScript/issues/15300
@see SimplifyDeep
@category Object
*/
type Simplify<T> = {[KeyType in keyof T]: T[KeyType]} & {};

/**
Omit any index signatures from the given object type, leaving only explicitly defined properties.

This is the counterpart of `PickIndexSignature`.

Use-cases:
- Remove overly permissive signatures from third-party types.

This type was taken from this [StackOverflow answer](https://stackoverflow.com/a/68261113/420747).

It relies on the fact that an empty object (`{}`) is assignable to an object with just an index signature, like `Record<string, unknown>`, but not to an object with explicitly defined keys, like `Record<'foo' | 'bar', unknown>`.

(The actual value type, `unknown`, is irrelevant and could be any type. Only the key type matters.)

```
const indexed: Record<string, unknown> = {}; // Allowed

const keyed: Record<'foo', unknown> = {}; // Error
// => TS2739: Type '{}' is missing the following properties from type 'Record<"foo" | "bar", unknown>': foo, bar
```

Instead of causing a type error like the above, you can also use a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to test whether a type is assignable to another:

```
type Indexed = {} extends Record<string, unknown>
	? '✅ `{}` is assignable to `Record<string, unknown>`'
	: '❌ `{}` is NOT assignable to `Record<string, unknown>`';
// => '✅ `{}` is assignable to `Record<string, unknown>`'

type Keyed = {} extends Record<'foo' | 'bar', unknown>
	? "✅ `{}` is assignable to `Record<'foo' | 'bar', unknown>`"
	: "❌ `{}` is NOT assignable to `Record<'foo' | 'bar', unknown>`";
// => "❌ `{}` is NOT assignable to `Record<'foo' | 'bar', unknown>`"
```

Using a [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#further-exploration), you can then check for each `KeyType` of `ObjectType`...

```
import type {OmitIndexSignature} from 'type-fest';

type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType // Map each key of `ObjectType`...
	]: ObjectType[KeyType]; // ...to its original value, i.e. `OmitIndexSignature<Foo> == Foo`.
};
```

...whether an empty object (`{}`) would be assignable to an object with that `KeyType` (`Record<KeyType, unknown>`)...

```
import type {OmitIndexSignature} from 'type-fest';

type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType
		// Is `{}` assignable to `Record<KeyType, unknown>`?
		as {} extends Record<KeyType, unknown>
			? ... // ✅ `{}` is assignable to `Record<KeyType, unknown>`
			: ... // ❌ `{}` is NOT assignable to `Record<KeyType, unknown>`
	]: ObjectType[KeyType];
};
```

If `{}` is assignable, it means that `KeyType` is an index signature and we want to remove it. If it is not assignable, `KeyType` is a "real" key and we want to keep it.

@example
```
import type {OmitIndexSignature} from 'type-fest';

interface Example {
	// These index signatures will be removed.
	[x: string]: any
	[x: number]: any
	[x: symbol]: any
	[x: `head-${string}`]: string
	[x: `${string}-tail`]: string
	[x: `head-${string}-tail`]: string
	[x: `${bigint}`]: string
	[x: `embedded-${number}`]: string

	// These explicitly defined keys will remain.
	foo: 'bar';
	qux?: 'baz';
}

type ExampleWithoutIndexSignatures = OmitIndexSignature<Example>;
// => { foo: 'bar'; qux?: 'baz' | undefined; }
```

@see PickIndexSignature
@category Object
*/
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? never
		: KeyType]: ObjectType[KeyType];
};

/**
Pick only index signatures from the given object type, leaving out all explicitly defined properties.

This is the counterpart of `OmitIndexSignature`.

@example
```
import type {PickIndexSignature} from 'type-fest';

declare const symbolKey: unique symbol;

type Example = {
	// These index signatures will remain.
	[x: string]: unknown;
	[x: number]: unknown;
	[x: symbol]: unknown;
	[x: `head-${string}`]: string;
	[x: `${string}-tail`]: string;
	[x: `head-${string}-tail`]: string;
	[x: `${bigint}`]: string;
	[x: `embedded-${number}`]: string;

	// These explicitly defined keys will be removed.
	['kebab-case-key']: string;
	[symbolKey]: string;
	foo: 'bar';
	qux?: 'baz';
};

type ExampleIndexSignature = PickIndexSignature<Example>;
// {
// 	[x: string]: unknown;
// 	[x: number]: unknown;
// 	[x: symbol]: unknown;
// 	[x: `head-${string}`]: string;
// 	[x: `${string}-tail`]: string;
// 	[x: `head-${string}-tail`]: string;
// 	[x: `${bigint}`]: string;
// 	[x: `embedded-${number}`]: string;
// }
```

@see OmitIndexSignature
@category Object
*/
type PickIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? KeyType
		: never]: ObjectType[KeyType];
};

// Merges two objects without worrying about index signatures.
type SimpleMerge<Destination, Source> = {
	[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
} & Source;

/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```
import type {Merge} from 'type-fest';

interface Foo {
	[x: string]: unknown;
	[x: number]: unknown;
	foo: string;
	bar: symbol;
}

type Bar = {
	[x: number]: number;
	[x: symbol]: unknown;
	bar: Date;
	baz: boolean;
};

export type FooBar = Merge<Foo, Bar>;
// => {
// 	[x: string]: unknown;
// 	[x: number]: number;
// 	[x: symbol]: unknown;
// 	foo: string;
// 	bar: Date;
// 	baz: boolean;
// }
```

@category Object
*/
type Merge<Destination, Source> =
Simplify<
SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>>
& SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>
>;

/**
Allows creating a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.

Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus, when such type is used in an IDE with autocompletion, no suggestions are made for the declared literals.

This type is a workaround for [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore.

@example
```
import type {LiteralUnion} from 'type-fest';

// Before

type Pet = 'dog' | 'cat' | string;

const pet: Pet = '';
// Start typing in your TypeScript-enabled IDE.
// You **will not** get auto-completion for `dog` and `cat` literals.

// After

type Pet2 = LiteralUnion<'dog' | 'cat', string>;

const pet: Pet2 = '';
// You **will** get auto-completion for `dog` and `cat` literals.
```

@category Type
*/
type LiteralUnion<
	LiteralType,
	BaseType extends Primitive,
> = LiteralType | (BaseType & Record<never, never>);

type HOTShared = {
 /**
   * Specify the static server port. By default, Syncify uses port `41001` to
   * avoid any conflicts with other running hosts of tools.
   *
   * @default 41001
   * @example 'http://localhost:41001/some-asset.js'
   */
  server?: number;
  /**
   * Specify the websocket port. By default, Syncify uses port `51001` to
   * avoid any conflicts with other running hosts of tools.
   *
   * @default 51001
   * @example 'ws://localhost:51001/ws'
   */
  socket?: number;
 /**
   * Determines the reload method Syncify should use. Syncify provides 3
   * reload tactics and defaults to using `hot`.
   *
   * > `hot`
   * >
   * > Performs real HMR and partial swaps (recommended)
   *
   * > `live`
   * >
   * > Similar to `hot` but each change will swap the entire `<body>`
   *
   * > `refresh`
   * >
   * > Replicates the Shopify CLI behaviour (fake reloading). Hard refreshes on every change.
   *
   * @default 'hot'
   */
  method?: LiteralUnion<'hot' | 'live' | 'refresh', string>;
  /**
   * Whether or not the Syncify UI status label should render.
   *
   * @default true
   */
  label?: boolean;
  /**
   * Controls whether ot the HOT Snippet injection is auto-removed from layout/s.
   * When set to `false`, the HOT render snippet is persisted on process exit whereas
   * the default behaviour is to remove it from layouts.
   *
   * Setting this `false` will improve start-up runtime in `--hot` mode by a few hundred ms.
   *
   * @default true
   */
  eject?: boolean
  /**
   * Accepts a string list of flags that enable Syncify to
   * wrangle CFH slop in development mode along with normalisation.
   *
   * > `--no-preview-bar`
   * >
   * > Automatically hides the preview bar
   *
   * > `--no-web-pixels-manager`
   * >
   * > Prevents the WPM evaluation from ocurring and blocks the CFH injection scripting
   *
   * > `--no-checkout-preloads`
   * >
   * > Prevents the checkout preload tags from injecting. In development, you don't need them.
   *
   * > `--no-shopify-features`
   * >
   * > Prevents the Shopify Features scripting from evaluating and blocks the CFH injections.
   *
   * > `--no-trekkie`
   * >
   * > Prevents Trekkie from evaluating, helping per-page navigation performance in development.
   *
   * > `--no-perfkit`
   * >
   * > Prevents Perfkit scripting from evaluating and the CFH injections.
   *
   * @default
   * [
   *   '--no-preview-bar',
   * ]
   */
  flags?: [
     '--no-preview-bar'?,
     '--no-web-pixels-manager'?,
     '--no-checkout-preloads'?,
     '--no-shopify-features'?,
     '--no-trekkie'?,
     '--no-perfkit'?
  ];
}

type HOTExtension = HOTShared & {
  /**
   * > **!! NOT YET AVAILABLE !!**
   * >
   * > **This feature is planned and not yet available for usage**
   *
   * The type of client-side scripting method being used. If you are using the Syncify browser
   * extension then set this value to `extension`, otherwise use `inject`.
   *
   * @default 'injection'
   */
  client?: 'extension'
}

type HOTInject = HOTShared & {
  /**
   * The type of client-side scripting method being used. If you are using the Syncify browser
   * extension then set this value to `extension`, otherwise use `inject`.
   *
   * @default 'injection'
   */
  client?: 'inject'
  /**
   * Set a list of theme layout files for snippet injection. This option is only applicable
   * when `client` is set to `inject`.
   *
   * > **NOTE**
   * >
   * > Option does not accept path structures, only file names are to be provided
   * >
   * > ```js
   * > // 𐄂 DO NOT DO THIS
   * > ['source/layout/theme.liquid']
   * >
   * > // ✓ THIS IS GOOD
   * > ['theme.liquid']
   * > ```
   *
   * @default
   * [
   *   'theme.liquid'
   * ]
   */
  layouts?: string[];
}

type HOT = HOTInject | HOTExtension

/* -------------------------------------------- */
/* LOGGER                                       */
/* -------------------------------------------- */

interface Logger {
  /**
   * Whether or not file stats should print
   *
   * > Helpful when building for production (`--prod`)
   *
   * @default true
   */
  stats?: boolean;
  /**
   * Whether or not to print warnings
   *
   * @default true
   */
  warnings?: boolean;
  /**
   * Suppress CLI logs
   *
   * @default false
   */
  silent?: boolean;
  /**
   * Whether or not to clear the screen between changes.
   *
   * @default true
   */
  clear?: boolean;
}

/**
 * String or Array of strings
 */
type Path = string | string[];

/**
 * Section and Snippet Rename Paths
 */
type Rename = {
  /**
   * Uses the filename as per the source, idenitical behaviour as that of `[name]`.
   *
   * @example
   * {
   *   sections: {
   *    '[dir]-[name]': [
   *      'sections/foo/*', // sections in this directory will prefix foo-
   *      'sections/bar/*' // sections in this directory will prefix bar-
   *    ],
   *    '[name]': [
   *      './sections/**'   // all other sections will use source name
   *    ],
   *   },
   *   snippets: {
   *    '[dir]-[name]': [
   *      'snippets/foo/*', // snippets in this directory will prefix foo-
   *      'snippets/bar/*' // snippets in this directory will prefix bar-
   *    ],
   *    '[name]': [
   *      './snippets/**',  // all other snippets will use source name
   *    ]
   *   }
   * }
   */
  '*'?: Path;
  /**
   * Use the filename as per the source. Passing `[name]` only will result in fallback
   * behaviour, as that of `'*'`.
   *
   * @example
   * @example
   * {
   *   sections: {
   *    '[dir]-[name]': [
   *      'sections/foo/*', // sections in this directory will prefix foo-
   *    ],
   *    'xxx-[name]': [
   *      'sections/bar/*', // sections in this directory will prefix xxx-
   *    ],
   *    '[name]': [
   *      './sections/**'  // all other sections will use source filename
   *    ]
   *   },
   *   snippets: {
   *    '[dir]-[name]': [
   *      'snippets/foo/*', // snippets in this directory will prefix foo-
   *    ],
   *    'xxx-[name]': [
   *      'snippets/bar/*', // snippets in this directory will prefix xxx-
   *    ],
   *    '[name]': [
   *      './snippets/**'  // all other sections will use source filename
   *    ]
   *   }
   * }
   */
  '[name]'?: Path;
  /**
   * Prefix directory name and suffix filename in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout-header.liquid'
   */
  '[dir]-[name]'?: Path;
  /**
   * Prefix directory name and suffix filename in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'layout_header.liquid'
   */
  '[dir]_[name]'?: Path;
  /**
   * Prefix filename and suffix directory in **kebab-case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header-layout.liquid'
   */
  '[name]-[dir]'?: Path;
  /**
   * Prefix filename and suffix directory in **snake_case** format.
   *
   * @example
   * 'layout/header.liquid' > 'header_layout.liquid'
   */
  '[name]_[dir]'?: Path;
}

/**
 * Snippet Renames accept `.` separated values
 */
type RenameSnippets = Rename & {
  /**
   * Prefix filename and suffix directory with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'header.layout.liquid'
   */
  '[name].[dir]'?: Path;
  /**
   * Prefix directory and suffix filename with `.` dot separator.
   *
   * @example
   * 'layout/header.liquid' > 'layout.header.liquid'
   */
  '[dir].[name]'?: Path;
}

type Paths = {
  /**
   * A glob string, glob array or rename `output → input` key/value object of files to be uploaded as snippets.
   *
   * @default 'source/snippets/*.{liquid}'
   * @example
   *
   * //OPTION 1 - Globs
   * {
   *   snippets: 'source/snippets/*.liquid'
   * }
   *
   * //OPTION 2 - Globs Array
   * {
   *   snippets: [
   *    'source/snippets/*.liquid',
   *    'source/snippets/xxx/*'
   *   ]
   * }
   *
   * //OPTION 3 - Rename Object
   * {
   *   snippets: {
   *    // Output will be: snippets/foo.bar.liquid
   *    '[dir].[name]': 'source/snippets/foo/bar.liquid',
   *    // Output will be: snippets/quz-baz.liquid
   *    '[name]-[dir]': 'source/snippets/baz/qux.liquid'
   *   }
   * }
   *
   *
   * //OPTION 4 - Rename Object Glob Array
   * {
   *   snippets: {
   *    // Output will be: snippets/foo.bar.liquid
   *    // Output will be: snippets/baz.qux.liquid
   *    '[dir].[name]': [
   *       'source/snippets/foo/bar.liquid',
   *       'source/snippets/baz/qux.liquid'
   *    ]
   *   }
   * }
   */
  snippets?: Path | RenameSnippets
  /**
   * A glob string, glob array or rename `output → input` key/value object of files to be uploaded as sections.
   *
   * > **NOTE**
   * > This path reference will also sync section group files.
   *
   * @default 'source/sections/*.{liquid,json}'
   * @example
   *
   * //OPTION 1 - Globs
   * {
   *   sections: 'source/sections/*.liquid'
   * }
   *
   * //OPTION 2 - Globs Array
   * {
   *   sections: [
   *    'source/sections/*.liquid',
   *    'source/sections/xxx/*'
   *   ]
   * }
   *
   * //OPTION 3 - Rename Object Glob
   * {
   *   sections: {
   *    // Output will be: sections/foo.bar.liquid
   *    '[dir].[name]': 'source/sections/foo/bar.liquid',
   *    // Output will be: sections/quz-baz.liquid
   *    '[name]-[dir]': 'source/sections/baz/qux.liquid'
   *   }
   * }
   *
   * //OPTION 4 - Rename Object Glob Array
   * {
   *   sections: {
   *    // Output will be: sections/foo.bar.liquid
   *    // Output will be: sections/baz.qux.liquid
   *    '[dir].[name]': [
   *       'source/sections/foo/bar.liquid',
   *       'source/sections/baz/qux.liquid'
   *    ]
   *   }
   * }
   *
   * //OPTION 5 - Define a custom stash
   * {
   *   sections: [
   *    'source/sections/*.liquid',
   *    'source/sections/xxx/*',
   *    { stash: '*' }  // pull stashes will write to source/sections/*
   *   ]
   * }
   */
  sections?: Path | Rename;
  /**
   * A glob string or glob array of files to be uploaded as blocks
   *
   * @default 'source/blocks/*.{liquid}'
   */
  blocks?: Path;
  /**
   * A glob string or glob array of files to be uploaded as templates.
   *
   * @default 'source/templates/*.{liquid,json}'
   */
  templates?: Path;
  /**
   * A glob string or glob array of files to be uploaded asas metaobject templates
   *
   * @default 'source/templates/metaobject/*.{liquid,json}'
   */
  metaobject?: Path;
  /**
   * A glob string or glob array of files to be uploaded as template/customers
   *
   * @default 'source/templates/customers/*.{liquid,json}'
   */
  customers?: Path;
  /**
   * A glob string or glob array of files to be uploaded as assets
   *
   * @default 'source/assets/*'
   */
  assets?: Path;
  /**
   * A glob string or glob array of files to be uploaded as layouts
   *
   * @default 'source/layout/*.liquid'
   */
  layout?: Path;
  /**
   * A glob string or glob array of files to be uploaded as configs, i.e, `settings_schema.json`
   *
   * @default 'source/config/.json'
   */
  config?: Path;
  /**
   * A glob string or glob array of files to be uploaded as config, i.e, `en.default.json`
   *
   * @default 'source/locales/*.json'
   */
  locales?: Path;
  /**
   * A glob string or glob array of files to be uploaded as **shared schema** `.json` or `.schema` files.
   *
   * @default 'source/+/schema/*.{json,schema}'
   */
  schema?: Path;
  /**
   * **NOT YET AVAILABLE**
   *
   * **This option will be available in later versions**
   *
   * ---
   *
   * The resolved `metafields` directory path
   *
   * @default 'source/+/metafields/**'
   */
  metafields?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * A glob string or glob array string to be uploaded, published and controlled as `pages`
   *
   * @default 'source/+/pages/*.{md,html}'
   */
  pages?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/blogs/*'
   */
  blogs?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/menus/*.json'
   */
  navigation?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/policies/*.{html,md}'
   */
  policies?: Path;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * @default 'source/+/files/**'
   */
  files?: Path;
}

type ScriptRename = `${'assets' | 'snippets'}/${string}`

type TargetBrowser = (
  | 'chrome'
  | 'deno'
  | 'edge'
  | 'firefox'
  | 'hermes'
  | 'ie'
  | 'ios'
  | 'node'
  | 'opera'
  | 'rhino'
  | 'safari'
);

type TargetBrowserVersion = (
  | `${TargetBrowser}${number}`
  | `${TargetBrowser}${number}.${number}`
  | `${TargetBrowser}${number}.${number}.${number}`
);

type TargetESVersion = (
  | 'es3'
  | 'es5'
  | 'es6'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'es2021'
  | 'es2022'
  | 'esnext'
);

type ESBuildAllowedOptions = Pick<BuildOptions, (
  | 'alias'
  | 'assetNames'
  | 'banner'
  | 'bundle'
  | 'charset'
  | 'chunkNames'
  | 'entryNames'
  | 'conditions'
  | 'define'
  | 'external'
  | 'footer'
  | 'format'
  | 'globalName'
  | 'inject'
  | 'ignoreAnnotations'
  | 'tsconfigRaw'
  | 'tsconfig'
  | 'treeShaking'
  | 'target'
  | 'jsx'
  | 'keepNames'
  | 'jsxDev'
  | 'jsxFactory'
  | 'jsxFragment'
  | 'jsxImportSource'
  | 'jsxSideEffects'
  | 'loader'
  | 'minify'
  | 'mangleCache'
  | 'mangleQuoted'
  | 'mangleProps'
  | 'minifyIdentifiers'
  | 'minifySyntax'
  | 'minifyWhitespace'
  | 'mangleQuoted'
  | 'metafile'
  | 'drop'
  | 'splitting'
  | 'supported'
  | 'sourcesContent'
  | 'sourceRoot'
  | 'sourcemap'
  | 'pure'
  | 'plugins'
  | 'publicPath'
)>


type ESBuildTarget = (
  | TargetBrowser
  | TargetBrowserVersion
  | TargetESVersion
);

/**
 * Public exposed configurations
 */
type ESBuildConfig = Merge<ESBuildAllowedOptions, {
    /**
     * The format to be generated. Because we are targeting
     * browser environments, Syncify does not allow for CJS (commonjs)
     * bundles to be produced.
     *
     * @default 'esm'
     */
    format?: 'esm' | 'iife';
    /**
     * Whether or not sourcemaps should be generated.
     * Syncify will process sourcemap generation internally,
     * so this option only accepts a boolean value.
     *
     * @default true
     */
    sourcemap?: boolean;
  }
>;

/* -------------------------------------------- */
/* TRANSFORM                                    */
/* -------------------------------------------- */

type ScriptSharedConfig = {
  /**
   * JS/TS input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * ---
   *
   * @default undefined
   */
  input: string | string[];
  /**
   * This sets the target environment for the generated JavaScript. It
   * tells esbuild to transform JavaScript syntax which is too new for
   * these environments into older JavaScript syntax that works in this
   * environment\s.
   *
   * ---
   *
   * @default 'es2016'
   */
  target?: ESBuildTarget | ESBuildTarget[];
  /**
   * Instructs ESBuild to treat these modules as external. The import/s
   * will be preserved and evaluated at run time instead.
   *
   * ---
   *
   * @see
   * https://esbuild.github.io/api/#external
   *
   * @default
   * []
   */
  external?: string[];
  /**
   * Rename the JavaScript file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]` or `[name]`, `[dir]` and/or `[ext]`.
   *
   * ---
   *
   * @default undefined
   */
  rename?: string;
  /**
   * Optionally write the javascript file inline as a snippet. This will transform
   * the JS and contained code will be output within `<script></script>` tags as a
   * `snippet.liquid` file.
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * When `snippet` is `true` you can provide an additional list of attributes to
   * be applied to inlined `<script>` tag which code will be output within. This only applies
   * to snippet generation and entries will be ignored if snippet is `false`.
   *
   * **Example Definition**
   *
   * ```js
   * // Attribute definitions
   * {
   *   attrs: [
   *    ['id', 'foo']
   *    ['data-attr', 'bar'],
   *    ['{{ object.prop }}'],
   *    ['{% if xxx %}', 'data-xxx', '{% endif %}']
   *   ]
   * }
   * ```
   *
   * **Example Output**
   *
   * ```liquid
   * <script
   *  id="foo"
   *  data-attr="bar"
   *  {{ object.prop }}
   *  {% if xxx %}data-xxx{% endif %}></script>
   * ```
   *
   * // Output
   * @default []
   */
  attrs?: Array<string[]>;
  /**
   * Entry points (paths/files) to watch that will trigger a rebuilds of
   * the defined _input_ file. By default, Syncify will watch all import entries
   * imported by the _input_.
   *
   * @default []
   */
  watch?: string[]
  /**
   * [ESBuild](https://esbuild.github.io/) Override
   *
   * ESBuild file transforms will use the options provided to `processor.esbuild`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.esbuild`.
   *
   * You can also skip pre-processing with esbuild by passing a _boolean_
   * `false` which will inform Syncify to skip processing scripts with ESBuild.
   *
   * @default true // if esbuild is not installed this is false
   */
  esbuild?: boolean | ESBuildConfig;
}

type ScriptFormatESM = ScriptSharedConfig & {

  /**
   * The format to be generated. Because we are targeting
   * browser environments, Syncify does not allow for CJS (commonjs)
   * bundles to be produced.
   *
   * @default 'esm'
   */
  format?: 'esm';
}

type ScriptFormatIIFE = ScriptSharedConfig & {
  /**
   * The format to be generated. Because we are targeting
   * browser environments, Syncify does not allow for CJS (commonjs)
   * bundles to be produced.
   *
   * @see https://esbuild.github.io/api/#format
   * @default 'esm'
   */
  format?: 'iife';
  /**
   * Sets the name of the global variable which is used to store the
   * exports from the entry point.
   *
   * @see https://esbuild.github.io/api/#global-name
   * @default undefined
   */
  globalName?: string;
}

type ScriptTransform = ScriptFormatESM | ScriptFormatIIFE;

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

type ScriptTransformer = (
  | string
  | string[]
  | ScriptTransform
  | ScriptTransform[]
  | Record<ScriptRename, string>
  | Record<ScriptRename, string[]>
  | Record<ScriptRename, Omit<ScriptTransform, 'rename'>>
)

/* -------------------------------------------- */
/* PROCESSOR CONFIGS                            */
/* -------------------------------------------- */

type StyleRename = `${'assets' | 'snippets'}/${string}`

type PostCSSConfig = (
  | AcceptedPlugin
  | Plugin
  | Transformer
  | TransformCallback
  | any
);

type SassOptions = Pick<
  Options<'sync'>,
  | 'fatalDeprecations'
  | 'functions'
  | 'futureDeprecations'
  | 'quietDeps'
  | 'silenceDeprecations'
>

/**
 * Style Minification
 */
type StyleTerse = OptionsOutput & {
 /**
  * Whether or not to purge unused CSS class names
  *
  * @default false
  */
  purgeUnusedCSS?: boolean;
  /**
  * Whether or not to obfuscate CSS class names
  *
  * @default false
  */
  obfuscateClassNames?: boolean;
  /**
  * List of class names that should be excluded from
  * obfuscation and shortnaming.
  */
  obfuscateWhitelist?: string[];
  /**
  * The alphabet used to generate the new class names.
  *
  * > **NOTE**
  * >
  * > There is no `d` in the default alphabet to avoid adblock issues.
  *
  * @default 'abcefghijklmnopqrstuvwxyz0123456789'
  */
  obfuscateAlphabet?: string;
  /**
  * Excluded files from terser minification
  *
  * @default []
  */
  exclude?: string[]
}

type TailwindConfig = Config$1 & {
  config: string[]
}

type SASSConfig = SassOptions & {
  /**
   * Whether or not to generate sourcemaps
   *
   * @default true
   */
  sourcemap?: boolean;
  /**
   * The style compiled CSS should be output.
   *
   * @default 'compressed'
   */
  style?: 'expanded' | 'compressed';
  /**
   * Whether or not to print warnings to CLI - Warnings will require
   * an `stdin` invocation to view. Setting this to `false` will hide
   * warnings all together.
   *
   * @default true
   */
  warnings?: boolean;
  /**
   * A list of paths to include, ie: node_modules.
   *
   * @default ['node_modules']
   */
  include?: string[];
}

/* -------------------------------------------- */
/* TRANSFORM                                    */
/* -------------------------------------------- */

type StyleTransform<T = string | string[]> = {
  /**
   * SVG input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * @default undefined
   */
  input: T;
  /**
   * Glob stylesheet paths/files to watch. When changes
   * are applied to matched files, then the defined `input`
   * will be compiled.
   *
   * @default []
   */
  watch?: string[];
  /**
   * Rename the stylesheet file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   *
   * ---
   *
   * @default undefined
   */
  rename?: string;
  /**
   * Optionally output the CSS as a snippet. This will transform
   * the stylesheet inline, wrap output within `<style></style>`
   * tags and write it to `snippets`.
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * When `snippet` is `true` you can provide an additional list of attributes to
   * be applied to `<style>` tag which code will be output within. This only applies
   * to snippet generation and entries will be ignored if snippet is `false`.
   *
   * **Example Definition**
   *
   * ```js
   * // Attribute definitions
   * {
   *   attrs: [
   *    ['id', 'foo']
   *    ['data-attr', 'bar'],
   *    ['{{ object.prop }}'],
   *    ['{% if xxx %}', 'data-xxx', '{% endif %}']
   *   ]
   * }
   * ```
   *
   * **Example Output**
   *
   * ```liquid
   * <style
   *  id="foo"
   *  data-attr="bar"
   *  {{ object.prop }}
   *  {% if xxx %}data-xxx{% endif %}></style>
   * ```
   *
   * // Output
   * @default []
   */
  attrs?: string[][];
  /**
   *
   * [TailwindCSS](https://tailwindcss.com/) Override
   *
   * Tailwind transforms will use the `tailwind.config.js` configuration
   * file in your projects root (or defined `config` path). If you have not
   * provided a tailwind config file, then syncify will use options defined
   * via `processor.tailwind`. You can optionally override configuration
   * on a per-transform basis and any options defined here will be merged with
   * those defined in your `tailwind.config.js` or `processor.tailwind`.
   *
   * @default true // if tailwind is not installed this is false
   */
  tailwind?: boolean | Partial<TailwindConfig>;
  /**
   * [PostCSS](https://postcss.org/) Override
   *
   * CSS File transforms will use the options provided to `processor.postcss`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.postcss`.
   *
   * You can also skip pre-processing with postcss by passing a _boolean_
   * `false` which will inform Syncify to not pass output to PostCSS. By
   * default, Syncify will pass all compiled SASS and files with `.css`
   * extensions to PostCSS.
   *
   * @default true // if postcss is not installed this is false
   */
  postcss?: boolean | PostCSSConfig[];
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Override
   *
   * SASS File transforms will use the options provided to `processor.sass`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.sass`.
   *
   * You can also skip SASS transfroms by passing a _boolean_ `false` which will
   * inform Syncify to not pass output to SASS, which is the default if SASS is not
   * installed.
   *
   * By default, Syncify will forward all input files using `.scss` or `.sass`
   * or extension to SASS Dart. If you have PostCSS installed then Syncify will
   * automatically pass SASS files to PostCSS in the post-process.
   *
   * @default true // if sass is not installed this is false
   */
  sass?: boolean | SASSConfig;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * Terse Style (CSS) Minification
   *
   * > Uses [clean-css](https://github.com/clean-css/clean-css) minification
   * > Uses [purge-css](https://github.com/FullHuman/purgecss)
   */
  terse?: boolean | OptionsOutput;
}

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

type StyleTransformer = (
  | string
  | string[]
  | StyleTransform
  | StyleTransform[]
  | Record<StyleRename, string>
  | Record<StyleRename, string[]>
  | Record<StyleRename, Pick<StyleTransform, 'postcss' | 'sass' | 'tailwind' | 'snippet' | 'watch' | 'input'>>
)

/* -------------------------------------------- */
/* SHARED                                       */
/* -------------------------------------------- */

type RenamePaths = `${'assets' | 'snippets'}/${string}`

type SVGFile = {
  /**
   * SVG input source paths. Accepts `string` or `string[]` glob patterns.
   * Resolution is relative to your defined `input` directory.
   *
   * @default ''
   */
  input: string | string[];
  /**
   * The SVG export format. Syncify can produce 2 different SVG formats.
   * All SVG file types will pre-process and transform using [SVGO](https://github.com/svg/svgo).
   * This option cannot be undefined and is required.
   *
   * ---
   *
   * > `file`
   * >
   * > SVG transforms using a `file` format will produce individual `.svg` files from
   * that can be output as an`asset` or inlined into a `snippet`
   *
   * > `sprite`
   * >
   * > SVG transforms using a `sprite` format will produce an SVG Sprite that can be
   * output as an `asset` or inlined into a `snippet`
   */
  format: 'file';
  /**
   * Rename the svg file/s. The same name as source file will be used
   * when undefined. Accepts namespaces, `[file]`, `[dir]` and `[ext]`.
   *
   * ---
   *
   * @default undefined
   *
   * @example
   * 'source/svgs/arrow.svg' > 'arrow.svg' // if snippet is false
   * 'source/svgs/checkmark.svg' > 'checkmark.liquid' // if snippet is true
   */
  rename?: string;
  /**
   * Whether to generate svg as snippet or asset. When `true` the
   * svg source will be written as a snippet
   *
   * @default false
   */
  snippet?: boolean;
  /**
   * [SVGO](https://github.com/svg/svgo) Override
   *
   * SVG File transforms will use the options provided to `processor.svgo`
   * but you can optionally override those defaults on a per-transform
   * basis. Any configuration options defined here will be merged with
   * the options defined in `processor.svgo`.
   *
   * @default
   * processor.svgo // When processor configuration is defined
   */
  svgo?: Config$2;
}

type SVGSprite = Omit<SVGFile, 'format'> & {
  /**
   * The SVG export format. Syncify can produce 2 different SVG formats.
   * All SVG file types will pre-process and transform using [SVGO](https://github.com/svg/svgo).
   * This option cannot be undefined and is required.
   *
   * ---
   *
   * > `file`
   * >
   * > SVG transforms using a `file` format will produce individual `.svg` files from
   * that can be output as an`asset` or inlined into a `snippet`
   *
   * > `sprite`
   * >
   * > SVG transforms using a `sprite` format will produce an SVG Sprite that can be
   * output as an `asset` or inlined into a `snippet`
   */
  format: 'sprite';
  /**
   * Add a DOCTYPE declaration to SVG documents
   *
   * @type {boolean}
   */
  sprite?: {
    /**
     * Apply a custome set of sprite attributes on the
     * parent `<svg>` element containing the `<symbol>` reference.
     *
     * **Example Definition**
     *
     * ```js
     * // Attribute definitions
     * {
     *   attrs: [
     *    ['id', 'foo']
     *    ['data-attr', 'bar'],
     *    ['{{ object.prop }}'],
     *    ['{% if xxx %}', 'data-xxx', '{% endif %}']
     *   ]
     * }
     * ```
     *
     * **Example Output**
     *
     * ```liquid
     * <svg
     *  id="foo"
     *  data-attr="bar"
     *  {{ object.prop }}
     *  {% if xxx %}data-xxx{% endif %}>
     *    <symbol id="a">....</symbol>
     *    <symbol id="b">....</symbol>
     *    <symbol id="c">....</symbol>
     * </svg>
     * ```
     *
     * // Output
     * @default []
     */
    attrs?: Array<string[]>;
    /**
     * Additional optional to be applied on containing `<symbol>`
     * elements in the sprite.
     */
    symbols?: {
      /**
       * The identifier applied to `<symbol>` elements. This
       * value will be the `<use>` referenced via `xlink:href`.
       * By default, Syncify prefixes `svg-` followed by SVG filename.
       *
       * > `[id]`
       * >
       * > Passing a value of `[id]` will instruct syncify to use the `id=""` value
       * > already applied and when missing fallback to the default `svg-`
       *
       *
       * **Example**
       *
       * ```liquid
       * <!-- REFERENCING -->
       * <svg><use xlink:href="#svg-a"></use></svg>
       * <svg><use xlink:href="#svg-b"></use></svg>
       * <svg><use xlink:href="#svg-c"></use></svg>
       *
       * <!-- EXAMPLE SPRITE -->
       * <svg>
       *  <symbol id="a">...</symbol>
       *  <symbol id="b">...</symbol>
       *  <symbol id="c">...</symbol>
       * </svg>
       * ```
       */
      id?: LiteralUnion<`${string}-[name]` | `[name]-${string}` | '[id]', string>;
      /**
       * Whether or not containing `<symbol>` elements should be annotated
       * with `xmlns` attributes. Defaults to `false`.
       *
       * **Example Output**
       *
       * ```liquid
       * <svg>
       *  <symbol id="a" xmlns="http://www.w3.org/2000/svg">...</symbol>
       *  <symbol id="b" xmlns="http://www.w3.org/2000/svg">...</symbol>
       *  <symbol id="c" xmlns="http://www.w3.org/2000/svg">...</symbol>
       * </svg>
       * ```
       *
       * @default false
       */
      xmlns?: boolean;
    }
  }
}

type SVGTransform = SVGFile | SVGSprite

/* -------------------------------------------- */
/* TRANSFORMER                                  */
/* -------------------------------------------- */

type SVGTransformer = (
  | string
  | string[]
  | SVGTransform
  | SVGTransform[]
  | Record<RenamePaths, string>
  | Record<RenamePaths, string[]>
  | Record<RenamePaths, SVGTransform>
)

/**
 * Processor Default Configurations
 *
 * Holds reference to default config options for each supported processor.
 */
type Processors = {
  /**
   * [ESBuild](https://esbuild.github.io/) Config
   */
  esbuild?: ESBuildConfig;
  /**
   * [PostCSS](https://postcss.org/) Plugins
   */
  postcss?: PostCSSConfig[];
  /**
   * [TailwindCSS](https://tailwindcss.com/) Config
   */
  tailwind?: TailwindConfig[];
  /**
   * [SASS Dart](https://sass-lang.com/documentation/js-api/) Config
   */
  sass?: SASSConfig;
  /**
   * [SVGO](https://github.com/svg/svgo) Config
   */
  svgo?: Config$2;
  /**
   * [Markdown](https://github.com/markdown-it/markdown-it) Config
   */
  markdown?: Options$1;
}

/**
 * JSON File Minification
 */
type JSONTerse = {
  /**
   * Minify `.json` files writing to `theme/assets`
   *
   * @default true
   */
  assets?: boolean;
  /**
   * Minify `settings_schema.json` and `settings_data.json` config files.
   *
   * @default true
   */
  config?: boolean;
  /**
   * Minify `locale` and `.json` files.
   *
   * @default true
   */
  locales?: boolean;
  /**
   * Minify `metafield` and `.json` files.
   *
   * @default true
   */
  metafields?: boolean;
  /**
   * Minify `metaobject` and `.json` files.
   *
   * @default true
   */
  metaobject?: boolean;
  /**
   * Minify section group `.json` files
   *
   * @default true
   */
  groups?: boolean;
  /**
   * Minify `template` and `.json` files.
   *
   * @default true
   */
  templates?: boolean;
  /**
   * An optional list of paths/files to exclude from minification.
   *
   * @default []
   */
  exclude?: string[]
}

type JSONTransform = {
  /**
   * If line termination should be Windows (CRLF) format.
   * Unix (LF) format is the default.
   *
   * @default false
   */
  crlf?: boolean;
  /**
   * The indentation level
   *
   * @default 2
   */
  indent?: number;
  /**
   * Whether to use tabbed `\t` identation characters. When `true`, tabs will apply
   * at the division of `2` relative to the `indent` option value.
   *
   * @default false
   */
  useTab?: boolean;
  /**
   * Whether or not comments should be stripped or preserved.
   * This effects how Syncify handles both local and remote sources.
   *
   * @default false
   */
  stripComments?: boolean;
  /**
   * Whether or not Syncify should apply alpha-numeric sorting to object properties
   * or not. This will apply deep sorting, so all objects within a structure will adhere.
   *
   * Apply object sorting on a specific list of entries in the JSON structure. Target deeply nested
   * property objects and their values using dot `.` separated expressions by passing sting list.
   *
   * ```js
   * { sortObjects: ['a.b'] } // sort only these objects
   *
   * // BEFORE
   * { a: { b: { z: '2', x: '1' } }, c: { b: '2', a: '1' } }
   *
   * // AFTER
   * { a: { b: { x: '1', z: '2', } }, c: { b: '2', a: '1' } }
   * ```
   *
   * @default false
   */
  sortObjects?: boolean | string[];
  /**
   * Whether or not Syncify should apply alpha-numeric sorting to arrays in JSON.
   * You should avoid setting this to `true` and use with caution.
   *
   * Apply array sorting on a specific list of entries in the JSON structure. Target deeply nested
   * properties and their values using dot `.` separated expressions by passing sting list.
   *
   * @default false
   */
  sortArrays?: boolean | string[];
  /**
   * Define a list of property names with object values that should be excluded and skipped
   * from sorting. This option only applies when `sortObjects` and/or `sortArrays` is set to
   * `true` and will have no effect if `sortObjects` and/or `sortArrays` is not enabled.
   *
   * @default []
   */
  noSortList?: string[];
  /**
   * An optional string list of paths/filenames to exclude
   * from processing, ie: pass through
   *
   * @default []
   */
  exclude?: string[];
  /**
   * JSON minification options. By default, this option is set to `false`
   * which disables minification being applied to `.json` file types. Setting
   * this to `true` will enabled JSON minification to apply.
   *
   * > **NOTE**
   * >
   * > Terse operations require the explicit `--prod` OR `--terse` flags be provided.
   * > Failure to pass such flags will result in minification being skipped.
   */
  terse?: boolean | JSONTerse;
}

type LiquidTerse = {
  /**
   * Removes redundant whitespace Liquid dash trims from Liquid tags and objects.
   *
   * @default false
   */
  stripTrims?: boolean;
  /**
   * Minifies inner contents of `<script>` and `{% javascript %}` tags
   *
   * @default true
   */
  minifyJS?: boolean;
  /**
   * Minifies inner contents of `<style>`, `{% style %}` and `{% stylesheet %}` tags
   *
   * @default true
   */
  minifyCSS?: boolean;
  /**
   * Minifies inner contents of `{% schema %}` tags
   *
   * @default true
   */
  minifySchema?: boolean;
  /**
   * Remove all occurances of HTML and Liquid comments
   *
   * @default true
   */
  removeComments?: boolean;
  /**
   * Collapse all whitespace and newlines
   *
   * @default true
   */
  collapseWhitespace?: boolean;
  /**
   * Excluded files from minification
   *
   * @default []
   */
  exclude?: string[]
}

/**
 * Liquid Minification
 */
type LiquidTransform = {
  /**
   * Liquid and HTML minification options. By default, the option is set to `false`
   * which disables minification being applied to `.liquid` file types. Setting
   * this to `true` will enabled minification.
   *
   * > **NOTE**
   * >
   * > Terse operations require explicit `--prod` OR `--terse` flags be provided.
   * > Failure to pass such flags will result in minification being skipped.
   */
  terse?: boolean | LiquidTerse;
}

/* -------------------------------------------- */
/* TRANSFORMS                                   */
/* -------------------------------------------- */

type Transforms = {
  /**
   * **Style File transforms**
   *
   * Style transformations perform CSS processing. Syncify supports various cascades,
   * including SASS, Tailwind and PostCSS.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/style/)
   *
   * @example
   *
   * // OPTION 1 - Rename with single input
   * {
   *   style: {
   *    'assets/stylesheet.css': 'path/to/file.scss', // write to assets dir and compile with sass
   *    'snippets/style.liquid': 'path/to/foo.css' // write as snippet
   *   }
   * }
   *
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   style: {
   *    'assets/stylesheet.css': [
   *      'path/to/source/file-1.scss',
   *      'path/to/source/file-2.scss',
   *    ]
   *   }
   * }
   *
   * // OPTION 3 - Rename with overrides
   * {
   *   style: {
   *    'assets/filename.min.css': {
   *       input: 'path/to/source/file.scss',
   *       includePaths: ['node_modules'],
   *       watch: []
   *    }
   *   }
   * }
   *
   * // OPTION 4 - Single config
   * {
   *   style: {
   *     input: 'path/to/source/file.scss',
   *     rename: 'filename.min.css',
   *     postcss: [ plugin() ] // use some postcss plugin with this file
   *     sass: {
   *       includePaths: [
   *        'node_modules/bootstrap' // include this path
   *       ]
   *     }
   *   }
   * }
   *
   * // OPTION 5 - Multiple configs
   * {
   *   style: [
   *    {
   *      input: 'path/to/source/file-1.css',
   *      snippet: true,
   *      rename: 'some-name.liquid',
   *      postcss: [ plugin() ], // use some plugin with this file
   *      sass: false // do not process with sass
   *    },
   *    {
   *      input: 'path/to/source/file-2.scss',
   *      postcss: false, // do not process with postcss
   *      sass: true, // use processor defined settings
   *      watch: [
   *       'path/to/files/*.scss'
   *      ]
   *    }
   *   ]
   * }
   */
  style?: StyleTransformer;

  /**
   * **JavaScript/TypeScript Transforms**
   *
   * Script inputs can be defined a few different ways depending on your preference.
   * You can also override ESBuild `processor` defined options on a per-file basis.
   * Options 1, 2 and 3 are typically the preferred structures.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/script/)
   *
   * @example
   *
   * // OPTION 1 - Rename with single input
   * {
   *   script: {
   *    'assets/filename.min.js': 'path/to/source/file.ts', // write to assets dir
   *    'snippets/js-file.liquid': 'path/to/source/foo.ts' // write as snippet
   *   }
   * }
   *
   * // OPTION 2 - Rename with multiple inputs
   * {
   *   script: {
   *    'assets/[file].min.[ext]': [
   *      'path/to/source/file-1.ts', // outputs assets/file-1.min.js
   *      'path/to/source/file-2.ts', // outputs assets/file-2.min.js
   *    ]
   *   }
   * }
   *
   * // OPTION 3 - Rename with overrides
   * {
   *   script: {
   *    'assets/filename.min.js': {
   *       input: 'path/to/source/file.ts',
   *       splitting: true,
   *       treeShaking: false
   *    }
   *   }
   * }
   *
   * // OPTION 4 - Single config
   * {
   *   script: {
   *     input: 'path/to/source/file.ts',
   *     rename: 'filename.min.js',
   *     esbuild: {}
   *   }
   * }
   *
   * // OPTION 5 - Multiple configs
   * {
   *   script: [
   *    {
   *      input: 'path/to/source/file-1.ts',
   *      rename: 'filename.min.js',
   *      esbuild: {}
   *    },
   *    {
   *      input: 'path/to/source/file-2.ts',
   *      snippet: true
   *    }
   *   ]
   * }
   */
  script?: false | ScriptTransformer
  /**
   * **SVG File Transforms**
   *
   * Inline SVG files and Sprites generation. Uses SVGO under the hood
   * and can export as assets (or snippets).
   *
   *  [Syncify Documentation](https://syncify.sh/options/transform/svg/)
   */
  svg?: SVGTransformer;
  /**
   * **JSON File Transforms**
   *
   * Options defined here are used when writing to the file system and
   * uploading `.json` files to themes. When running `sy pull` or operations
   * that import from online stores, configuration defined here will be respected.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/json/)
   */
  json?: JSONTransform;
  /**
   * **Liquid File Transforms**
   *
   * Liquid transform options are terse-specific and related to minification operations.
   * Syncify uses HTML Minifier Terser under the hood, it has been configured to work with
   * Liquid files.
   *
   * [Syncify Documentation](https://syncify.sh/options/transform/liquid/)
   *
   * > **NOTE**
   *
   * > Liquid transforms will only be carried out under the `--prod` or `--terse` flag.
   * > If this option is set to `false` then no minification will be applied to `.liquid` files.
   */
  liquid?: LiquidTransform;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * **Markdown File Transforms**
   *
   * Supported markdown transforms accepted for resource specific operations.
   */
  markdown?: SVGTransformer;

}

/**
 * Version Control
 */
type VC = {
  /**
   * Sets the maximum patch number before incrementing the minor version. Passing a value of `0` will
   * result in **minor** version increments only.
   *
   * @default 10
   */
  patchLimit?: number;
  /**
   * Sets the maximum minor version before incrementing the major version. Passing a value of 0 will
   * result in **major** version increments only.
   *
   * @default 10
   */
  minorLimit?: number;
  /**
   * Sets the version source references that will increment. By default, Syncify will ensure both
   * the `package.json` (if present) and `settings_schema.json` version numbers match, but you may
   * prefer to use a single source.
   *
   * @default
   * [
   *   'package.json'
   *   'settings_schema.json'
   * ]
   */
  references?: [
    'package.json'?,
    'settings_schema.json'?
  ]
}

/* -------------------------------------------- */
/* IMPORTS                                      */
/* -------------------------------------------- */



/* -------------------------------------------- */
/* EXPORTS                                      */
/* -------------------------------------------- */

/**
 * **Syncify Configuration**
 *
 * The `defineConfig` named export used within `syncify.config.js` (or `.ts`) configuration files.
 */
type Config = Directories & {
  /**
   * Specify the text-editor you use for development. This is optional and when
   * left undefined, Syncify will attempt guess your preferred editor.
   */
  editor?: LiteralUnion<
    | 'vscode'
    | 'sublime'
    | 'cursor'
    | 'atom'
    | 'webstorm'
    | 'intellij'
    | 'textmate'
    | 'xcode'
    | 'nano'
    | 'notepad++'
    | 'gedit'
    | 'vim'
  , string>;
  /**
   * Define customize input structures. Paths will automatically resolve
   * the `input` directory you provide.
   */
  paths?: Paths;
  /**
   * > **NOT YET AVAILABLE**
   * >
   * > **This option will be available in later versions**
   *
   * ---
   *
   * Syncify plugins are planned in future releases!
   */
  plugins?: never;
  /**
   * **Clean**
   *
   * Whether of not Syncify should clean output before building.
   */
  clean?: boolean;
  /**
   * **HOT**
   *
   * Hot reloading options. Pass the `--hot` flag to enable.
   *
   * > Passing `--hot` will enable **watch** mode. You do not need to pass `-w`
   * > or `--watch` when `--hot` is provided as it will be assumed.
   */
  hot?: HOT;
  /**
   * **Log**
   *
   * Console log options
   */
  log?: Logger;
  /**
   * **Git**
   *
   * Git automation and workflow configuration for controlling the integration pipline. Settings
   * defined here will be used to provide a streamlines tactic for theme publishing, version
   * control and source control.
   */
  git?: false | Git
  /**
   * **Version Control**
   *
   * Syncify introduces a strategic version control system based on the Modular Arithmetic Model (**MaM**),
   * a unique approach inspired by, but distinct from, [SemVer](https://semver.org/). The MaM tactic in
   * its appropriation by Syncify to Theme development is designed around the idea that progression should
   * be predictive and controlled. The [Version Control](https://syncify.sh/usage/version-control/) documentation
   * guide provides a strong overview for how Syncify applies versioning to themes.
   */
  vc?: false | VC
  /**
   * **Transform**
   *
   * The asset transform pipeline configurations
   */
  transform?: Transforms;
  /**
   * **Processor**
   *
   * Configurations for the `transform` processors. Define options for a transform to inherit.
   * You can override these on a per-transform basis. Optionally, you can use the default presets
   * which syncify has pre-configured for optimal output.
   */
  processor?: Processors;
}

declare global {

  export interface Window {
    /**
     * Syncify HOT Reloading
     */
    Syncify: {
      /**
       * The HOT Module version number
       */
      readonly version: string;
      /**
       * Returns the current `template` name according to Liquid objects
       */
      readonly template: string;
      /**
       * Sends a message to the server of websocket to informs upon the current template.
       * In most cases, this will be dispatched automatically, but in some cases you may
       * control the rendering cycle and need to issue this programmatically.
       */
      route: (params?: { directory: string; template: string; }) => void;
      /**
       * Check to see if Syncify is ready or not
       */
      isReady: boolean;
      /**
       * Whether or not the websocket is connected
       */
      isConnected: boolean;
      /**
       * A Map of web components registered in the DOM.
       */
      WebC: Map<string, string>;
      /**
       * List of errors encountered
       */
      errors: Array<{
        /**
         * Error title
         */
        title: string;
        /**
         * Description
         */
        description: string;
        /**
         * Group
         */
        group: string;
      }>
      /**
       * Page section maps
       */
      sections: {
        /**
         * Returns the object where section ids are properties
         * and the values are an array list of dynamic applied ids.
         * Returns `null` if no section exist.
         */
        list: () => {
          /**
           * Map holds the dynamic identifiers
           */
          map: {
            [id: string]: string[];
          },
          /**
           * Alias is template defined sections
           */
          alias: {
            [template: string]: {
              [section: string]: string[];
            }
          }
        }
        /**
         * Method for loading section id maps. Helpful when executing
         * OTW (Over the wire) page replacements like SPX. When invoked,
         * it will obtains all the section ids in the document body.
         *
         * This is called at runtime in HOT method. Returns the object map
         * of matches or `null` if no sections exist.
         */
        load: (dom?: HTMLElement) => { [id: string]: string[]; };
        /**
         * Returns all elements matching the provided `id` which is obtained
         * via the websocket `data` parameter. Query Selects all matches. If
         * no matches are found, returns null.
         */
        get: (id: string[]) => NodeListOf<HTMLElement>;
      };
      /**
       * Full page refresh
       */
      refresh: () => void;
      /**
       * HOT reloads the `<body>`
       */
      reload: (callback?: (dom: Document) => void) => void;
      /**
       * List of event hooks to fire during HOT swaps
       */
      onReload: (callback: (instance: Window['Syncify']) => void) => void;
      /**
       * List of event hooks to fire during HOT swaps
       */
      onMorph: (callback: (oldDom: HTMLElement, newDom: HTMLElement) => boolean) => void;
    /**
       * List of event hooks to fire during HOT swaps
       */
      onAsset: (callback: (type: 'stylesheet' | 'script', url: string) => boolean) => void;
      /**
       * HOT Reloads all assets
       */
      assets: () => void;
      /**
       * Change the label style
       */
      style: {
        /**
         * The dynamic parent node
         */
        parent: (style: Partial<CSSStyleDeclaration>) => void;
        /**
         * The inner node which contains the event text
         */
        label: (style: Partial<CSSStyleDeclaration>) => void;
      }
    }

  }

  export const Syncify: Window['Syncify'];
}

/**
 * ENV Utilities
 *
 * Helper utility for checking environment variables and returning some other data references
 */
declare const env: {
  /**
   * Whether or not `--dev` mode is running
   */
  readonly dev: boolean;
  /**
   * Whether or not `--prod` mode is running
   */
  readonly prod: boolean;
  /**
   * Whether or not `--watch` mode is running
   */
  readonly watch: boolean;
};

/**
 * Syncify Define Config (named export)
 *
 * Used in `syncify.config.js` or `syncify.config.ts` files and provides type completions to the export.
 */
declare const defineConfig: (config: Config) => Config;

export { type Config, type Directories, type ESBuildConfig, type ESBuildTarget, type Git, type HOT, type JSONTerse, type JSONTransform, type LiquidTerse, type LiquidTransform, type Logger, type Paths, type PostCSSConfig, type Processors, type Rename, type SASSConfig, type SVGFile, type SVGSprite, type SVGTransform, type SVGTransformer, type SassOptions, type ScriptTransform, type ScriptTransformer, type StyleTerse, type StyleTransform, type StyleTransformer, type TailwindConfig, type Transforms, type VC, defineConfig, env };
