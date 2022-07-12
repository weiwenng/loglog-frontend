
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://backloglog.herokuapp.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `@import "@/assets/_shared.scss";`,
      },
    },
  },
};