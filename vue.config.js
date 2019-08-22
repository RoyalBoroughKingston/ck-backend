module.exports = {
  baseUrl: "/",
  outputDir: "dist",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: true,
  pluginOptions: {
    s3Deploy: {
      assetPath: "dist",
      region: "eu-west-1",
      pwa: false,
      enableCloudfront: true,
      cloudfrontMatchers: "/*",
      uploadConcurrency: 5
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
