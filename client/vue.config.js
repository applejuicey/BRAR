module.exports = {
  publicPath: '/brar/',
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:4359/api",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        },
      },
    },
  },
};