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
      bucket: "admin.connectedkingston.uk",
      region: "eu-west-1",
      pwa: false,
      enableCloudfront: false,
      cloudfrontMatchers: "/*",
      uploadConcurrency: 5
    }
  }
};
