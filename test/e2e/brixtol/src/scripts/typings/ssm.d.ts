
/**
 * Simple State Mananger
 */
declare module 'simplestatemanager' {

  interface States {
    /**
     * An ID for the method, this is only needed if you want to reference the state
     * somewhere else in your code, otherwise a ID will be automatically
     * assigned to your state.
     */
    id?: string;
    /**
     * The media query that you want to match when this state is to be active.
     */
    query: string;
    /**
     * A method to fire when you enter the state
     */
    onEnter?(): void
    /**
     * A method to fire when you resize the state
     */
    onResize?(): void
    /**
     * A method to fire when you leave the state (perhaps to clean up after the state)
     */
    onLeave?(): void
    /**
    * A method that runs when the state is first activated
    */
    onFirstRun?(): void
  }

  interface Instance {
    /**
     * Whether or not screen is active
     */
    active: boolean;
    /**
     * The screen identifier
     */
    id: string
    listener (e: any): void
    options: States
    query: string;
    test: MediaQueryList;
    valid: boolean
  }

  interface ConfigOptions {
    /**
     * Name - this is used to apply to a state
     */
    name?: string;
    /**
     * Function which will perform the test
     */
    test?(): void;
    /**
     * A method to fire when you enter the state
     *
     * - `resize`
     *   - _Run the test whenever the browser is resized_
     * - `match`
     *   - _Run the test whenever the query attached to the state becomes matched/unmatched._
     * - `once`
     *   - _Run the test once on the state it has been applied to, if the value
     * is not what is expected then the state is not added_
     */
    when?: 'resize' | 'match' | 'once'
     /**
     * A method to fire when you resize the state
     */
    onResize?(): void
    /**
     * A method to fire when you leave the state (perhaps to clean up after the state)
     */
    onLeave?(): void
    /**
    * A method that runs when the state is first activated
    */
    onFirstRun?(): void
  }

  export function isActive(id: string): boolean
  export function getState(id: string): Instance
  export function getStates(ids: string[]): Instance[]
  export function addState(state: States): void
  export function addStates(states: States[]): void
  export function removeState(state: string): void
  export function removeStates(states: string[]): void
  export function removeAllStates(): void
  export function addConfigOption(option: ConfigOptions): void

}
