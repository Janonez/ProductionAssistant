import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import postcss, { type Plugin } from 'postcss'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'

const { fileManifest } = createRequire(import.meta.url)('../../../ProductionAssistant.Desktop/lib/renderer-build.js')

const isolateStyles: Plugin = {
  postcssPlugin: 'production-assistant-style-boundaries',
  OnceExit(root) {
    const file = root.source?.input.file?.replaceAll('\\', '/') ?? ''
    const legacy = /\/src\/[^/]+\.css$/.test(file) && !file.endsWith('/typography.css') && !file.endsWith('/operation-sidebar.css') && !file.endsWith('/settings-modal.css')
    if (legacy) {
      root.walkRules(rule => { rule.selector = rule.selector.replaceAll(':root', ':scope') })
      const scope = postcss.atRule({ name: 'scope', params: '(body) to ([data-shadcn-surface])' })
      scope.append(root.nodes.slice())
      root.append(scope)
    }
    if (file.endsWith('/styles/shadcn-shell.css')) {
      // Scope Tailwind's actual preflight/base, leaving legacy business controls intact.
      root.walkAtRules('layer', layer => {
        if (layer.params !== 'base' || !layer.nodes?.length) return
        const scope = postcss.atRule({ name: 'scope', params: '([data-shadcn-surface])' })
        scope.append(layer.nodes.slice())
        layer.append(scope)
      })
    }
  },
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), {
    name: 'metis-build-identity',
    writeBundle: {
      order: 'post',
      handler({ dir }) {
        if (!dir) throw new Error('Renderer 构建缺少输出目录')
        const indexPath = join(dir, 'index.html')
        const index = readFileSync(indexPath, 'utf8')
        if (!index.includes('</head>')) throw new Error('Renderer 入口缺少 head 结束标签')

        // Hash the output before stamping its ID, including any files copied from public.
        const digest = createHash('sha256').update(JSON.stringify(fileManifest(dir))).digest()
        digest[6] = (digest[6] & 0x0f) | 0x80
        digest[8] = (digest[8] & 0x3f) | 0x80
        const hex = digest.subarray(0, 16).toString('hex')
        const buildId = [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-')

        writeFileSync(indexPath, index.replace('</head>', `  <meta name="metis-build-id" content="${buildId}" />\n  </head>`))
        writeFileSync(join(dir, 'build-info.json'), JSON.stringify({ buildId }))
      },
    },
  }],
  css: { postcss: { plugins: [isolateStyles] } },
  build: { outDir: 'dist', emptyOutDir: true }
})
