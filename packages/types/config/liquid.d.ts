export interface LiquidTerse {
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
export interface LiquidTransform {
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
