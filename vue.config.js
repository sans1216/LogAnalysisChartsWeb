module.exports = {
  outputDir: 'dist',   //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  runtimeCompiler: true,
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8080',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {  //使用"/api"来代替"http://f.apiplus.c"
        target: 'http://10.11.40.91:8080/', //源地址
        changeOrigin: true, //改变源
        pathRewrite: {
          '^/api': '' //路径重写
          }
      }
    }
  }



}
