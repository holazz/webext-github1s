import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { getManifest } from './src/manifest'

export default defineConfig(async () => ({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    AutoImport({
      imports: ['vue'],
    }),
    UnoCSS({
      shortcuts: {
        'icon-btn':
          'op75 hover:op100 cursor-pointer select-none transition-all',
        'form-item':
          'flex justify-between items-center mt3 text-xs op70 cursor-pointer',
      },
      presets: [presetUno(), presetAttributify()],
    }),
    crx({
      manifest: await getManifest(),
    }),
  ],
  optimizeDeps: {
    include: ['vue'],
  },
}))
