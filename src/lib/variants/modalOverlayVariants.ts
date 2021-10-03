import colors from 'tailwindcss/colors';

export const transition = {
  duration: 0.5,
};

export default {
  from: {
    background: colors.gray[900] + '00',
    backdropFilter: 'blur(0px)',
  },
  to: {
    background: colors.gray[900] + '66',
    backdropFilter: 'blur(6px)',
  },
  end: {
    background: colors.gray[900] + '00',
    backdropFilter: 'blur(0px)',
  },
};
