import { writable, Writable } from "svelte/store";

type FocusState = [Writable<HTMLElement>, (elem: HTMLElement) => void];

const focusedElem = writable(null);

const setFocusedElem = (elem: HTMLElement) => focusedElem.set(elem);

const focusState: FocusState = [focusedElem, setFocusedElem];

export default focusState;
