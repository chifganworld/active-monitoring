var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, '/web/static/js')
    ],
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: [
      './web/static/js/app.jsx',
      './web/static/css/app.scss'
    ]
  },

  output: {
    path: path.join(__dirname, '/priv/static'),
    filename: 'js/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /static\/vendor/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0', 'flow'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({use: 'css-loader'})
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'sass-loader?sourceMap',
              options: {
                includePaths: [
                  path.join(__dirname, '/web/static/vendor/css'),
                  path.join(__dirname, '/node_modules')
                ]
              }
            }
          ]
        })
      }
    ]
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([{ from: './web/static/assets' }])
  ]
}
