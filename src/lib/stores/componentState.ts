import { writable, get } from 'svelte/store';

export type IotaByKey<T extends string> = {
  [key in T]: number;
};

export type IotaByNumber<T extends string> = {
  [key: number]: T;
};

export type Iota<T extends string> = IotaByKey<T> & IotaByNumber<T>;

function iota<T extends string>(...args: string[]): Iota<T> {
  return args.reduce((iota, val: string, index) => {
    index + 1;
    const shifted: number = index << 1;
    Reflect.set(iota, val, shifted);
    Reflect.set(iota, shifted, val);
    return iota;
  }, {} as Iota<T>);
}

export function useComponentState<T extends string>(def: T, states: T[]) {
  const compState = writable<T>(def);
  let stateByte = 0;
  const compStates = iota<T>(...[def, ...states]);

  function switchState(state: T) {
    const newByte = compStates[state];
    stateByte = newByte;
    compState.set(state);
  }

  function on(state: T) {
    if (state !== def) {
      stateByte | compStates[state];
      const newByte = compStates[state],
        curByte = compStates[get(compState)];
      if (newByte > curByte) {
        compState.set(state);
      }
    }
  }

  function has(state: T): boolean {
    return (stateByte & compStates[state]) === compStates[state];
  }

  function off(state: T) {
    const byte = compStates[state];
    stateByte = stateByte & byte ? stateByte ^ byte : stateByte;
    if (stateByte > 1) {
      Object.keys(compStates).forEach((key) => {
        if (typeof key === 'string' && has(key as any)) {
          compState.set(key as any);
        }
      });
    } else compState.set(def);
  }

  function toggle(state: T) {
    const byte = compStates[state];
    stateByte = stateByte ^ byte;
    if (has(state)) on(state);
    else off(state);
  }

  console.log(stateByte);

  return {
    subscribe: compState.subscribe,
    switch: switchState,
    toggle,
    has,
  };
}
