/* Tailwind CDN configuration — must load right after the Tailwind CDN script */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        sand:  '#E0CEBD',
        taupe: '#C0A392',
        cream: '#F6F0EA',
        ink:   '#39322D',
        mute:  '#8C7F74',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
};
