import { createStore } from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';

/**
 * Local Storage (store.js)
 *
 * Utility helpers for localStorage.
 * This is a custom store.js store
 * for interacting with local storage.
 */
export const store = createStore([ localStorage ]);
