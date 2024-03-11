import { defineApplicationConfig } from '@vben/vite-config';
// import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    plugins: [
      // basicSsl(),
      // basicSsl({
      //   /** 认证名称 */
      //   name: 'test',
      //   /** 自定义信任域 * /
      //   domains : [ '*.custom.com' ] ,
      //   /** 自定义认证目录 */
      //   certDir: '/Users/.../.devServer/cert',
      // }),
    ],
    server: {
      // host: true,
      cors: true,
      host: 'localhost',
      port: 5173,
      // https: true,
      proxy: {
        '/sys-api': {
          // target: 'http://localhost:9100',
          target: 'https://peckperk-oms.prerule.cn',
          changeOrigin: true,
          // rewrite: (path) => path.replace(new RegExp(`^/sys-api`), ''),
          // only https
          ws: true,
          secure: false,
        },
        '/fms-api': {
          // target: 'http://localhost:9102',
          target: 'https://peckperk-oms.prerule.cn',
          changeOrigin: true,
          ws: true,
          //rewrite: (path) => path.replace(new RegExp(`^/fms-api`), ''),
        },
        '/mms-api': {
          // target: 'http://localhost:9104',
          target: 'https://peckperk-oms.prerule.cn',
          changeOrigin: true,
          ws: true,
          //rewrite: (path) => path.replace(new RegExp(`^/mms-api`), ''),
        },
      },
    },
  },
});
