import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      // // 配置文件扩展名
      // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    server: {
      proxy: {
        '/v1/api': {
          target: env.VITE_BASE_URL, // 替换为你的 API 服务器地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/v1\/api/, ''),
        }
      }
    }
  }

})
