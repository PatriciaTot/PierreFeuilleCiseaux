const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PRODUCTION = false;
const OUTPATH = PRODUCTION ? './public' : './public';
module.exports = {
  entry: './scripts/pfc.js',
  mode : PRODUCTION ? 'production' : 'development',
  target: "node",
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  output: {
    path: path.resolve(__dirname, OUTPATH),
    filename: 'scripts/bundle.js'
  },

  devServer: {
    static: {
       publicPath: path.resolve(__dirname, 'dist'),
       watch : true
    },
    host: 'localhost',
    port : 8080,
    open : true
} ,
module: {
    rules : [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)/i,
      }
    ]
  },
  plugins: [  
    new HtmlWebpackPlugin({
	template: "./pfc.html",
	filename: "./pfc.html"
    }),
    new CopyPlugin({
        patterns: [
	    {
		from: './*.html',
		to:   '[name][ext]',
		noErrorOnMissing: true,
		globOptions:{
		    ignore:['**/pfc*.html']
		}
	    },
	    {
		from: 'images/*',
		to:   'images/[name][ext]',
		noErrorOnMissing: true
	    },
	    {
		from: 'style/*',
		to:   'style/[name][ext]',
		noErrorOnMissing: true
	    },
        ]
    })
],
};
