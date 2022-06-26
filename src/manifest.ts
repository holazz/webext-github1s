import pkg from '../package.json'

import type { ManifestV3Export } from '@crxjs/vite-plugin'

export async function getManifest(): Promise<ManifestV3Export> {
  return {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    homepage_url: 'https://github.com/holazz/webext-github1s',
    permissions: ['storage', 'activeTab'],
    host_permissions: ['https://github.com/*'],
    action: {
      default_icon: 'src/assets/icon.png',
      default_popup: 'src/popup/index.html',
    },
    content_scripts: [
      {
        all_frames: false,
        matches: ['https://github.com/*/*'],
        js: ['src/content-scripts/index.ts'],
        run_at: 'document_end',
      },
    ],
    icons: {
      16: 'src/assets/icon.png',
      32: 'src/assets/icon.png',
      48: 'src/assets/icon.png',
      128: 'src/assets/icon.png',
    },
  }
}
