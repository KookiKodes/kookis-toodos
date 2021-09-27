import { Writable, writable } from "svelte/store";

interface Disclosure {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

type UseModalState = [Writable<boolean>, Disclosure];

const modalState = writable(false);

const off = () => modalState.set(false);
const on = () => modalState.set(true);
const toggle = () => modalState.update((state) => !state);

const useModalState: UseModalState = [modalState, { off, on, toggle }];

export default useModalState;
