const colors = require('tailwindcss/colors');
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.svelte', './src/**/*.html'],
    options: {
      keyframes: true,
      // considers dynamic class bindings when purging unused classes
      // credit: https://github.com/matebek https://dev.to/matebek
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.blueGray,
      purple: colors.purple,
      pink: colors.pink,
      green: colors.green,
      yellow: colors.yellow,
      blue: colors.blue,
      transparent: 'transparent',
    },
    extend: {
      height: {
        'min-content': 'min-content',
      },
      minWidth: {
        screen: '100vw',
      },
      minHeight: {
        screen: '100vh',
      },
      maxWidth: {
        1440: '1440px',
        1080: '1080px',
      },
    },
  },
  variants: {
    extend: {
      ring: ['active'],
      scale: ['active', 'focus'],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
