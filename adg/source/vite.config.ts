import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         -> regular multi-file production build (dist/)
// `npm run build:single`  -> one self-contained HTML (dist-single/) with JS, CSS and fonts inlined.
//                            Images stay in /img so the file stays small.
// `npm run build:pages`   -> same single file, written to ../index.html (adg/index.html) for GitHub Pages.
export default defineConfig(({ mode }) => {
  const single = mode === 'single' || mode === 'pages'
  return {
    base: './',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: mode === 'pages' ? '..' : mode === 'single' ? 'dist-single' : 'dist',
      // Never empty ../ — it holds this source folder.
      emptyOutDir: mode !== 'pages',
      assetsInlineLimit: single ? 100_000_000 : 4096,
    },
  }
})
