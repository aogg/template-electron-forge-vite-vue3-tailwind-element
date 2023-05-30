import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import pug from 'pug'

// https://vitejs.dev/config
export default defineConfig({

    plugins: [
        vue(),
        {
            name: 'vite-plugin-pug',
            enforce: 'pre',
            transform(code, id) {
                if (/\.(pug)$/.test(id)) {
                    const compiled = pug.compile(code, {
                        filename: id,
                        basedir: process.cwd(),
                        doctype: 'html'
                    })
                    return {
                        code: `export default ${JSON.stringify(compiled())};`,
                        map: null
                    }
                }
            }
        }
    ],
});
