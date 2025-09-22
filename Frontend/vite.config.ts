import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // theme:{
  //   extend:{
  //     color:{
  //       primary:"green-500",
  //       secondary:"gray-100"
  //     }
  //   }
  // },
  plugins: [react(),tailwindcss()],
})
