module.exports = {
  publicPath: '/brar/',
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: false,
    proxy: {
      "/api": {
        target: "http://47.100.168.127:4359/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        },
      },
    },
  },
};