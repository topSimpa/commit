// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";


export default {
    entry: "./src/commit.js",
    output: {
        filename: "commit.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/commit.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/commit.html",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            }
        ]
    }
};