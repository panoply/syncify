declare module '@accede-web/tablist' {

  export type IEvents = 'show' | 'hide'

  export class ITablist {

    constructor(selector: HTMLElement)

    /**
     * Bind all events and apply required attributes
     */
    public mount(): void

    /**
     * Unbind keyboard and mouse events
     */
    public unmount(): void

    /**
     * Destroy fold instances, remove event listeners and ARIA attributes.
     */
    public destroy(): void

    /**
     * Bind a callback to either the show or hide event triggered when
     * changing tab. Both tab and tabPanel HTMLElement are passed on the callback
     */
    public on(events: IEvents, fn:(tab: HTMLElement, tabPanel: HTMLElement) => void): void

    /**
     * Event Listener (OFF)
     */
    public off(events: IEvents, fn:(tab: HTMLElement, tabPanel: HTMLElement) => void): void

    /**
     * Panel Folds
     */
    get current(): {
      tab: HTMLElement,
      tabPanel: HTMLElement
    }

  }

  export default class Tablist extends ITablist {}

}
