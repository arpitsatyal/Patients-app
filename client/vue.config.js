const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/backend': {
        target: 'http://localhost:4200',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/backend': '/' },
      },
    },
  },
})
