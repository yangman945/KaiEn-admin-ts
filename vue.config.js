const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
// 从 js 中提取css 使css成为一个独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // 要访问的跨域的api的域名
        target: "http://ccp.cloudgd.net",
        changeOrigin: true,
        // ws: true,
        // changOrigin: true,
        // pathRewrite: {
        //   "^/api": "/api",
        // },
      },
    },
  },
  pluginOptions: {
    // 提取公共样式和变量
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/styles/scss/style.scss"),
        // path.resolve(__dirname, "./src/styles/_handle.scss"),
        // path.resolve(__dirname, "./src/styles/_variables.scss"),
        // path.resolve(__dirname, "./src/styles/mixins/_menu.scss"),
      ],
    },
  },
  chainWebpack(config) {
    // config.module
    //   .rule("scss")
    //   .test(/\.scss$/)
    //   .use(MiniCssExtractPlugin.loader, "css-loader")
    //   .loader("sass-loader")
    //   .options({ sourceMap: true })
    //   .end();
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule("svg")
      // 忽略
      .exclude.add(resolve("src/icons"))
      // 结束
      .end();
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule("icons")
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve("src/icons"))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use("svg-sprite-loader")
      // 具体的loader
      .loader("svg-sprite-loader")
      // loader 的配置
      .options({
        symbolId: "icon-[name]",
      })
      // 结束
      .end();
    config
      .plugin("ignore")
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      );
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
