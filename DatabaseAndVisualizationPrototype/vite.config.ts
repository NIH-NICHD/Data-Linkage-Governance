import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  build: {
    rollupOptions: {
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    }}
  },
  plugins: [
    RubyPlugin(),
  ],
  server: {
    hmr: {
      host: 'localhost',
    },
  },
})
