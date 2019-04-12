
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '<%%= htmlWebpackPlugin.options.static %%>/v2/app/<%= options.directoryname %>/':'/',
  // 输出文件目录
  outputDir: 'build',
  lintOnSave: true,
  devServer: {
    "open": true,
    "host": "127.0.0.1",
    "port": 8080,
    "proxy": null
  }
}
