module.exports = {
  pluginOptions: {
    s3Deploy: {
      assetPath: 'dist',
      bucket: 'admin.connectedkingston.uk',
      region: 'eu-west-1',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5
    }
  }
}
