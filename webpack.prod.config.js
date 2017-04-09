const path = require('path')
const webpack = require('webpack')
const combineLoaders = require('webpack-combine-loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [    
    './app/main.js'
  ],
  output: {
    path:__dirname,
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV' : JSON.stringify('production'),
        'APIURL'   : JSON.stringify(process.env.APIURL)
      }
    })
  ],  
 
  module: {
    loaders: [
      { test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, 
        include: __dirname,
        query: {
          cacheDirectory: true,            
          presets: ["react", "es2015"]
        } 
      },{
        test: /\.css$/,
          loader: combineLoaders([
            {
              loader: 'style-loader'
            }, {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          ])
      },     
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { 
        test: /vendor\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      },      
      {
        test: /\.(eot|svg|ttf|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }      
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6', '.jsx'],
    root: [
      path.resolve('./app')
    ]
  },
}