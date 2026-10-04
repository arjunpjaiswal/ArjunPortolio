import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => {
  const standalone = process.env.SINGLEFILE === 'true' || mode === 'standalone'
  return {
    plugins: standalone ? [react(), viteSingleFile()] : [react()],
    build: {
      assetsInlineLimit: standalone ? 100000000 : 4096,
      cssCodeSplit: !standalone,
    },
  }
})
