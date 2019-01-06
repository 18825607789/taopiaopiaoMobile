'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 将本地数据获取到当前服务器
const appMovieData = require('../movieData.json')
const appSoonData = require('../soonData.json')
const appCity = require('../city.json')
const cinemaDetail = require('../cinemaDetail.json')
const bankCard = require('../bankCard.json')
const MovieTicket = require('../movieTicket.json')
const movieSeats = require('../movieSeats.json')

// 接口
const movieData = appMovieData.data.returnValue
const soonData = appSoonData.data.returnValue
const cityData = appCity.data
const cinemaDetailData = cinemaDetail.data
const bankCardData = bankCard.data
const MovieTicketDate = MovieTicket.data
const movieSeatsData = movieSeats.data

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before: function (app) {
      app.get('/api/movieData', function (req, res) {
        res.json({
          errno: 0,
          data: movieData
        })
      })
      app.get('/api/soonData', function (req, res) {
        res.json({
          errno: 0,
          data: soonData
        })
      })
      app.get('/api/cityData', function (req, res) {
        res.json({
          errno: 0,
          data: cityData
        })
      })
      app.get('/api/cinemaDetailData', function (req, res) {
        res.json({
          errno: 0,
          data: cinemaDetailData
        })
      })
      app.get('/api/bankCardData', function (req, res) {
        res.json({
          errno: 0,
          data: bankCardData
        })
      })
      app.get('/api/MovieTicketDate', function (req, res) {
        res.json({
          errno: 0,
          data: MovieTicketDate
        })
      })
      app.get('/api/movieSeatsData', function (req, res) {
        res.json({
          errno: 0,
          data: movieSeatsData
        })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
