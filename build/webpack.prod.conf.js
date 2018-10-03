'use strict'

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = process.env.NODE_ENV=== 'analysis' ? require('webpack-bundle-analyzer').BundleAnalyzerPlugin:null
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? {NODE_ENV: '"testing"'}
  : {NODE_ENV: '"production"'}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true
    })
  },
  output: {
    publicPath: './', 
    path: path.resolve(__dirname, '../dist'),
    filename: ('js/[name].[hash:8].js'),
    /*
     * chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
     * 比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件
     * 只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')})
     * 或者这样require.ensure(['./greeter'],function(require){alert(11);})
     * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
     * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
     * */
    chunkFilename: ('js/[name]-[id].[chunkhash:8].js')
  },
  //4.0配置
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: 'all',
      name:"libs/main"
    }
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist/*'), {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name]-[id].[hash:8].css',
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.ejs',
      title: 'React Demo',
      inject: true, // true->'head' || false->'body'
      minify: {
        //删除Html注释
        removeComments: true,
        //去除空格
        collapseWhitespace: true,
        //去除属性引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','libs/main','index']
    }),

    //page1
    new HtmlWebpackPlugin({
      filename: 'pages/index.html',
      template: './src/pages/page1.ejs',
      title: 'React Page1',
      inject: false, // 不设置script标签位的默认位置，主要是为了自己组织相对路径
      minify: {
        //删除Html注释
        removeComments: true,
        //去除空格
        collapseWhitespace: true,
        //去除属性引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest','libs/main','page1']
    }),

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    //{
    //       from: './src/favicon.ico'
    //     },
    new CopyWebpackPlugin([{
      from: './src/assets/',
      to: 'assets'
    }]),
    process.env.NODE_ENV=== 'analysis' ? new BundleAnalyzerPlugin() : ()=>{}
  ]
})

// 需要服务端做相关的gzip配置
/*
gzip on;
gzip_disable "msie6";
gzip_buffers 32 4k;
gzip_static on;
 */
// 页面请求后的Response Headers中的Content-Encoding的值为“gzip”，Request Headers中Accept-Encoding的值存在“gzip”值
if (true) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}


module.exports = webpackConfig
