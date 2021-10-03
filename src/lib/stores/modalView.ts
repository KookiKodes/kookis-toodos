import { writable } from 'svelte/store';

interface ModalState {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

function createModalView() {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    on: () => set(true),
    off: () => set(false),
    toggle: () => update((current) => !current),
  };
}

export const modalView = createModalView();
