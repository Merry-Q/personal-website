import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const projects = JSON.parse(readFileSync(resolve(root, 'portfolio.json'), 'utf8'));
const cases = projects.filter(project => project.case);
// Keep every existing local case link functional in the production build as well.
export default defineConfig({
  plugins: [{
    name: 'preserve-case-classic-scripts',
    apply: 'build',
    generateBundle() {
      // These existing standalone scripts have no imports. Preserve their original
      // execution mode instead of converting the separate case pages to modules.
      for (const project of cases) {
        const fileName = project.case.replace(/^\//, '') + 'script.js';
        this.emitFile({ type: 'asset', fileName, source: readFileSync(resolve(root, fileName), 'utf8') });
      }
    },
  }],
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        ...Object.fromEntries(cases.map(project => [
          project.id, resolve(root, project.case.replace(/^\//, ''), 'index.html'),
        ])),
      },
    },
  },
});
