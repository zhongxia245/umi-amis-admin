import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash', // 可选 browser、hash 和 memory。
  treeShaking: true,
  base: '/umi-amis-admin/',
  publicPath: '/umi-amis-admin/',
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: { webpackChunkName: true },
        title: 'admin',
        dll: true,
        routes: {
          exclude: [/components\//, /utils\//],
        },
      },
    ],
    [
      'umi-plugin-dll',
      {
        exclude: ['@babel/runtime'],
        include: ['amis'],
      },
    ],
  ],
};

export default config;
