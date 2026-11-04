import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import postcss, { type Plugin } from 'postcss'

const isolateStyles: Plugin = {
  postcssPlugin: 'production-assistant-style-boundaries',
  OnceExit(root) {
    const file = root.source?.input.file?.replaceAll('\\', '/') ?? ''
    const legacy = /\/src\/[^/]+\.css$/.test(file) && !file.endsWith('/typography.css') && !file.endsWith('/operation-sidebar.css')
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
  plugins: [react(), tailwindcss()],
  css: { postcss: { plugins: [isolateStyles] } },
  build: { outDir: 'dist', emptyOutDir: true }
})
