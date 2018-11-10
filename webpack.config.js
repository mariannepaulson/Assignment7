const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
                // loader: 'babel-loader',
                // options: { presets: ['env'] }
            },

            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },

            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                        {
                            loader: 'url-loader'
                        },
                    ]
            }

            // {
            //     test: /\.(pdf|jpg|png|gif|svg|ico)$/,
            //     use: [
            //         {
            //             loader: 'url-loader'
            //         },
            //     ]
            // }
            // {
            //     test: /\.(jpg|png|gif|svg|pdf|ico)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[path][name]-[hash:8].[ext]'
            //             },
            //         },
            //     ]
            // }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
};
