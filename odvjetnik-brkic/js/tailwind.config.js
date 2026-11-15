// NE KORISTI SE VIŠE. Tailwind v4 ne čita ovu datoteku — tema je prevedena u css/input.css (@theme).
// Datoteka ostaje samo kao zapis stare v3 konfiguracije.
// Tailwind tema: boje, fontovi i sjene ureda
tailwind.config={theme:{extend:{
  colors:{navy:{950:'#0B1422',900:'#0F1B2D',800:'#16263D',700:'#1F3352',200:'#C3CCD9'},gold:{700:'#7E6133',600:'#9A7740',500:'#B08D57',400:'#C6A774',200:'#E6D6BA'},ivory:{50:'#FBF9F5',100:'#F5F1E9'},stone:{200:'#E4DED3',300:'#CFC7B8',500:'#7D766A'},ink:{700:'#3B3A36',900:'#1C1B19'},success:{600:'#3F6B4E'},error:{600:'#9B3B2E'}},
  fontFamily:{display:['"Cormorant Garamond"','Georgia','serif'],sans:['"Source Sans 3"','"Helvetica Neue"','Arial','sans-serif']},
  boxShadow:{card:'0 8px 24px -12px rgba(15,27,45,.22)',overlay:'0 24px 48px -24px rgba(15,27,45,.35)'}
}}};
