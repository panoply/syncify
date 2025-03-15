import type { FileTargets, Store, Theme } from 'types';

import { assign, murmur, o } from '~utils';

/**
 * Extended array implementation used for store references
 */
export class Stores extends Array<Store> {

  private static readonly map: Record<string, number> = o();

  /**
   * Returns the first store entry
   */
  get default (): Store { return this[0]; }

  /**
   * Extended implementation of `[].push()` which will allow store name querying.
   */
  push (store: Store): number {
    const index = super.push(store);
    Stores.map[store.name] = index - 1; // Assuming index - 1 was intentional
    return index;
  }

  /**
   * Update a store record by name
   *
   * @example
   * // Assume a the following:
   * [
   *  { name: 'foo', domain: 'foo.myshopfy.com' },
   *  { name: 'bar', domain: 'foo.myshopfy.com' }
   * ]
   *
   * // We can query using name
   * //
   * $.stores.set('bar', { token: 'abcdefg' })
   */
  set (name: string, store: Partial<Store>): Store {
    const index = Stores.map[name];
    return index !== undefined ? assign(this[index], store) : undefined;
  }

  /**
   * Get store by name, e.g:
   *
   * @example
   * // Assume a the following:
   * [
   *  { name: 'foo', domain: 'foo.myshopfy.com' },
   *  { name: 'bar', domain: 'foo.myshopfy.com' }
   * ]
   *
   * // We can query using name
   * //
   * $.stores.get('bar') // equivalent of $.stores[1]
   */
  get (name: string): Store {
    const index = Stores.map[name];
    return index !== undefined ? this[index] : undefined;
  }

  /**
   * Does store exist by name
   *
   * @example
   * // Assume a the following:
   * [
   *  { name: 'foo', domain: 'foo.myshopfy.com' },
   *  { name: 'bar', domain: 'foo.myshopfy.com' }
   * ]
   *
   * // We can query using name
   * //
   * $.stores.has('bar') // equivalent of $.stores[1]
   */
  has (name: string): boolean {
    const index = Stores.map[name];
    return index !== undefined && this[index] !== undefined;
  }

}

/**
 * Extended array implementation used for theme target references
 */
export class Targets extends Array<Theme> {

  private static raw: FileTargets = o();
  private static readonly map: Record<number, number> = o();

  get raw () { return Targets.raw; }
  set raw (raw: FileTargets) { Targets.raw = raw; }

  /**
   * Returns the first entry in the stack
   */
  get default (): Theme { return this[0]; }

  /**
   * Generate a uid MurMur hash, can be used in isolation
   */
  uid (storeName: string, themeId: number) {

    return murmur(storeName, themeId);

  }

  /**
   * Extends push and assigns the `Targets.map` name query helper.
   */
  push (theme: Theme): number {
    const index = super.push(theme);
    Targets.map[theme.uid] = index - 1; // Assuming index - 1 was intentional
    return index;
  }

  /**
   * Updates a theme target in the stack based
   */
  set (uid: number, theme: Partial<Theme>): Theme | undefined {
    const index = Targets.map[uid];
    return index !== undefined ? assign(this[index], theme) : undefined;
  }

  /**
   * Get a theme target in the stack
   */
  get (uid: number): Theme | undefined {
    const index = Targets.map[uid];
    return index !== undefined ? this[index] : undefined;
  }

  /**
   * Whether or not theme exists in the stack
   */
  has (uid: string): boolean {
    const index = Targets.map[uid];
    return index !== undefined && this[index] !== undefined;
  }

}
