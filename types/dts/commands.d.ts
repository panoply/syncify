export type CommandModes =
  | 'build'
  | 'watch'
  | 'create'
  | 'init'
  | 'targets'
  | 'link'
  | 'keychain'
  | 'projects'
  | 'prune'
  | 'git'
  | 'pull'
  | 'push'
  | 'delete'
  | 'version'
  | 'pack'
  | 'publish'
  | 'inspect'
  | 'help'
  | 'doctor'
  | 'suggest'

export type CommandFlags =
  | 'input'
  | 'output'
  | 'config'
  | 'dev'
  | 'new'
  | 'prod'
  | 'terse'
  | 'clean'
  | 'silent'
  | 'target'
  | 'filter'
  | 'hot'
  | 'batch'
  | 'bind'
  | 'align'
  | 'force'
  | 'patch'
  | 'merge'
  | 'minor'
  | 'major'
  | 'main'
  | 'unpublished'
  | 'help'
  | 'version'

export interface CommandValues {
  /**
   * Fully resolved input  (`--input, -i`) overwrite path
   */
  input?: string;
  /**
   * Fully resolved output (`--output, -o`) overwrite path
   */
  output?: string;
  /**
   * Fully resolved config (`--config, -o`) overwrite path
   */
  config?: string;
  /**
   * Number of batch upserts (`--batch`)
   */
  batch?: number;
  /**
   * Raw copy of the store/theme targets
   */
  target?: string[];
  /**
   * Raw copy of filter expression if provided.
   */
  filter?: string[];
  /**
   * Parse args reference of `--align`
   */
  align?: boolean;
  /**
   * Parse args reference of `--dev`
   */
  dev?: boolean;
  /**
   * Parse args reference of `--prod`
   */
  prod?: boolean;
  /**
   * Parse args reference of `--terse`
   */
  terse?: boolean;
  /**
   * Parse args reference of `--clean`
   */
  clean?: boolean;
  /**
   * Parse args reference of `--silent`
   */
  silent?: boolean;
  /**
   * Parse args reference of `--hot`
   */
  hot?: boolean;
  /**
   * Parse args reference of `--bind`
   */
  bind?: boolean;
  /**
   * Parse args reference of `--force`
   */
  force?: boolean;
  /**
   * Parse args reference of `--patch`
   */
  patch?: boolean;
  /**
   * Parse args reference of `--minor`
   */
  minor?: boolean;
  /**
   * Parse args reference of `--major`
   */
  major?: boolean;
  /**
   * Parse args reference of `--main`
   */
  main?: boolean;
  /**
   * Parse args reference of `--unpublished`
   */
  unpublished?: boolean;
  /**
   * Parse args reference of `--help`
   */
  help?: boolean;
  /**
   * Parse args reference of `--version`
   */
  version?: boolean;
}

export interface ParseArgs {
   /**
   * Whether this command accepts positional arguments.
   *
   * - If `strict` is `true`, this is `false`
   * - If `strict` is `false`, this is `true`
   *
   * @default false
   */
  allowPositional?: boolean;
  /**
   * Should an error be thrown when unknown arguments are encountered, or when arguments are
   * passed that do not match the type configured in `options`.
   *
   * @default true
   */
  strict?: boolean;
  /**
   * Return the parsed tokens. This is useful for extending the built-in behavior,
   * from adding additional checks through to reprocessing the tokens in different ways.
   *
   * @default false.
   */
  tokens?: boolean;
}

export interface ParseArgsOptions<T = string | boolean | string[] | boolean[]> {
  /**
   * Type of argument.
   */
  type: 'string' | 'boolean';
  /**
   * Whether this option can be provided multiple times.
   * If `true`, all values will be collected in an array.
   * If `false`, values for the option are last-wins.
   * @default false.
   */
  multiple?: boolean;
  /**
   * A single character alias for the option.
   */
  short?: string;
  /**
   * The default option value when it is not set by args.
   * It must be of the same type as the the `type` property.
   * When `multiple` is `true`, it must be an array.
   * @since v18.11.0
   */
  default?: T
}

export interface ParseCommand {
  /**
   * The command positional, i.e, the mode
   */
  mode: CommandModes;
  /**
   * Positional argument accepted by the command.
   *
   * @default undefined
   * @example
   * 'sy build scripts' // build accepts positional
   */
  accepts?: string[];
  /**
   * The configuration object passed to nodes `ParseArgs`
   */
  flags?: CommandFlags[];
  /**
   * Alias or equivalent flag expression that does the same thing.
   * Some modes can be actived via flags
   *
   * @example
   * // sy build can also be a flag in certain modes
   * 'sy watch --build'
   */
  alias?: CommandFlags[]
}
