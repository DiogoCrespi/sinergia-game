import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Aumentar limite de tamanho para arquivos grandes (modelos 3D)
    fs: {
      // Permitir servir arquivos fora da raiz do projeto
      strict: false,
    },
  },
  // Configurações de build
  build: {
    // Aumentar limite de aviso para arquivos grandes
    chunkSizeWarningLimit: 1000,
  },
})
