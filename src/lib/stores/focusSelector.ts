import { writable } from 'svelte/store';

function createFocusElem() {
  const { subscribe, set } = writable(null);

  return {
    subscribe,
    withFocusSelector: (elem: HTMLElement) => set(elem),
  };
}

export const focusElem = createFocusElem();
