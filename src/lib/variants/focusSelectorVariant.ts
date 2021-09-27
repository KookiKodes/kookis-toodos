import type { Transition } from 'svelte-motion';

export const transition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
};

const variants = {
  from: {
    scale: 1,
  },
  to: {
    scale: 1.05,
    transition,
  },
};

export default variants;
