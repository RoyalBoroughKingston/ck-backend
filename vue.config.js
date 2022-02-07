module.exports = {
  publicPath: "/",
  outputDir: "dist",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: true,
  pluginOptions: {
    s3Deploy: {
      awsProfile: "default",
      region: "eu-west-1",
      bucket: undefined,
      assetPath: "dist",
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: undefined,
      cloudfrontMatchers: "/*",
      uploadConcurrency: 5,
      pluginVersion: "3.0.0",
      registry: undefined,
      createBucket: false,
      staticHosting: false,
      assetMatch: "**",
      deployPath: "/",
      acl: "public-read"
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
