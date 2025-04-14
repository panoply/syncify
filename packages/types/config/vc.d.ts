/**
 * Version Control
 */
export type VC = {
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
