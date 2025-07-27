import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss({
    theme: {
      extend: {
        colors: {
          primary: '#005fa8',
          accent: '#00bfff',
          charcoal: '#2b2b2b',
        },
      },
    },
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
  }),],
})
