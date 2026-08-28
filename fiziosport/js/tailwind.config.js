/* Tailwind tema — tokeni dizajn sistema Fizio Sport */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif']
      },
      colors: {
        sand: { 25: '#FDFBF6', 50: '#FAF6EC', 100: '#F4EDDE', 200: '#EBE0CA', 300: '#DDCDAF', 400: '#C8B48F', 500: '#AD966F' },
        ink:  { 100: '#EAE3D8', 200: '#D9D0C2', 300: '#BDB3A5', 400: '#9A9083', 500: '#776E62', 600: '#5A5248', 700: '#443E36', 800: '#2E2A25', 900: '#221F1B' },
        gold: { 100: '#F6E8C9', 300: '#E0BF7E', 500: '#C09A4E', 600: '#A57F38', 700: '#84642A' }
      },
      letterSpacing: { caps: '0.14em', tight2: '-0.02em', tight3: '-0.025em' },
      transitionTimingFunction: { calm: 'cubic-bezier(.22,.8,.28,1)' }
    }
  }
};
