import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
    rolldownOptions: {
    input: {
    main: resolve(rootDir, 'index.html'),
    ascetic: resolve(rootDir, 'ascetic.html'),
    example: resolve(rootDir, 'example.html'),
            },
        },
    },
});