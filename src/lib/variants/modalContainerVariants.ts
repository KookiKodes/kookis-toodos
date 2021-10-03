export const transition = {
  type: 'spring',
  damping: 12,
};

export default {
  from: {
    opacity: 0.1,
    scale: 0.5,
    zIndex: 50,
    y: 50,
  },
  to: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  end: {
    opacity: 0,
    scale: 0.5,
    y: 50,
    transition: {
      delay: 0,
    },
  },
};
