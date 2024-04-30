const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => ({
	entry: "./src/index.tsx",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	devtool: env.production ? "hidden-source-map" : "inline-source-map",
	mode: env.production ? "production" : "development",
	devServer: {
		static: "./dist",
		port: 3000,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new webpack.DefinePlugin({
			ENV: JSON.stringify(env.production ? "production" : "development"),
		}),
	],
	resolve: {
		extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
		alias: {
			"@bank": path.resolve(__dirname, "src/"),
		},
	},
});
