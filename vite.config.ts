import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // server: {
    //     proxy: {
    //         '/reports': {
    //             target: 'https://f5rrhw9z-8080.euw.devtunnels.ms',
    //             changeOrigin: true,
    //             secure: false,
    //         },
    //     },
    // },
})
