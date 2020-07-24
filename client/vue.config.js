module.exports = {
  publicPath: '/brar/',
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: false,
    proxy: {
      "/api": {
        // 开发环境注释该语句
        target: "http://47.100.168.127:4359/api",
        // 需要部署时注释该语句
        // target: "http://localhost:4359/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        },
      },
    },
  },
};