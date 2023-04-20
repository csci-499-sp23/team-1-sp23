import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  commonjsOptions: {
    esmExternals: true,
 },
 build: {
  rollupOptions:{
    external: [
      'react-icons/md', 
      'react-icons/gi', 
      'react-icons/sl', 
      'react-icons/bi', 
      'react-icons/tb', 
      'react-icons/hi2', 
      'react-icons/ri',
      'react-icons/fa',
      'react-icons/si',
      'react-icons/go',
    ],
  }
 }
})
