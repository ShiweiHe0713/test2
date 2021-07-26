// this is to test the syncing
const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve (dir) {
 return path.join(__dirname, dir)
}

// check Git
function getGitHash () {
 try {
  return GitRevision.version()
 } catch (e) { }
 return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
 // webpack build externals
 externals: {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
 },
 css: [],
 // https://unpkg.com/browse/vue@2.6.10/
 js: [
  '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
  '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
  '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
  '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
 ]
}

// vue.config.js
const vueConfig = {
 //publicPath: '/bi',//相对静态资源路径。
 //publicPath: '/bi',
 configureWebpack: {
  // webpack plugins
  plugins: [
   // Ignore all locale files of moment.js
   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
   new webpack.DefinePlugin({
    APP_VERSION: `"${require('./package.json').version}"`,
    GIT_HASH: JSON.stringify(getGitHash()),
    BUILD_DATE: buildDate
   }),

  ],
  // if prod, add externals
  externals: isProd ? assetsCDN.externals : {}
 },

 chainWebpack: (config) => {
  config.resolve.alias
   .set('@$', resolve('src'))

  config.module
   .rule('svg')
   .exclude.add(resolve('src/assets'))
   .end()

  config.module
   .rule('icons')
   .test(/\.svg$/)
   .include.add(resolve('src/assets'))
   .end()
   .use('svg-sprite-loader')
   .loader('svg-sprite-loader')
   .options({
    symbolId: 'icon-[name]'
   })
   .end()

  /**
  const svgRule = config.module.rule('svg')
  svgRule.uses.clear()
  svgRule
    .oneOf('inline')
    .resourceQuery(/inline/)
    .use('vue-svg-icon-loader')
    .loader('vue-svg-icon-loader')
    .end()
    .end()
    .oneOf('external')
    .use('file-loader')
    .loader('file-loader')
    .options({
      name: 'assets/[name].[hash:8].[ext]'
    })
    */
  // if prod is on
  // assets require on cdn
  if (isProd) {
   config.plugin('html').tap(args => {
    args[0].cdn = assetsCDN
    return args
   })
  }
 },

 css: {
  loaderOptions: {
   less: {
    modifyVars: {
     // less vars，customize ant design theme

     // 'primary-color': '#F5222D',
     // 'link-color': '#F5222D',
     'border-radius-base': '2px'
    },
    // DO NOT REMOVE THIS LINE
    javascriptEnabled: true
   }
  }
 },
 devServer: {
  port: 3001,
  disableHostCheck: true,
  host: 'localhost',
  proxy: {
   '/biapi': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
    pathRewrite: {
     '^/biapi': '/'
     //pathRewrite: //重写之后url为 http://192.168.1.16:8085/xxxx
     //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
    }
   },
   '/image': {
    target: 'http://127.0.0.1:7001',
    changeOrigin: true,
    pathRewrite: {
     '^/image': '/'
     //pathRewrite: //重写之后url为 http://192.168.1.16:8085/xxxx
     //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
    }
   },
  }
 },
 lintOnSave: false,
 productionSourceMap: false,
 transpileDependencies: []
}
/**
devServer: {
 port: 3001,
 disableHostCheck: true,
 proxy: 'http://localhost:7001',
 
 proxy: {
  '^/api': {
   target: 'http://127.0.0.1:7001',
   changeOrigin: true,
  },

 }, 
},
lintOnSave: false,
productionSourceMap: false,
transpileDependencies: []
}*/
// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
 console.log('VUE_APP_PREVIEW', true)
 // add `ThemeColorReplacer` plugin to webpack plugins
 vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
