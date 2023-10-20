export interface TemplateSections {
  [k: string]: {
    /**
     * A unique ID for the section. Accepts only alphanumeric characters.
     */
    id?: string
    /**
     * When true, the section is not rendered but can still be customized in the theme editor. Is false by default.
     */
    disabled?: boolean
    /**
     * The filename of the section file to render, without the extension.
     */
    type: string
    /**
     * Settings as defined in the schema of the section or the block.
     */
    settings?: {
      [k: string]: unknown
    }
    /**
     * An array of block IDs, ordered as they should be rendered.
     * The IDs must exist in the blocks object, and duplicates are not allowed.
     */
    block_order?: string[]
    /**
     * Settings as defined in the schema of the section or the block.
     */
    blocks?: {
      [k: string]: {
        /**
         * The type of block to render, as defined in the schema of the section file.
         */
        type: string
        /**
         * When true, the block is not rendered but can still be customized in the theme editor. Is false by default.
         */
        disabled?: boolean
        /**
         * Settings as defined in the schema of the section or the block.
         */
        settings?: {
          [k: string]: unknown
        }
        [k: string]: unknown
      }
    }
    [k: string]: unknown
  }
}

/**
 * JSON templates are data files that store a list of sections to be rendered,
 * and their associated settings. Merchants can add, remove, and reorder
 * these sections using the theme editor.
 */
export interface JSONTemplatesSchema {
  /**
   * A name for the template.
   */
  name?: string;
  /**
   * A name for the template.
   *
   * Value `false` to render the template without a layout.
   * Templates without a layout can't be customized in the theme editor.
   */
  layout?:string | false
  /**
   * The HTML wrapper element for the template's sections.
   */
  wrapper?: string;
  /**
   * The section order
   */
  order: string[]
  /**
   * The section data
   */
  sections: TemplateSections;
}
