module.exports = {
	publicPath:
		process.env.NODE_ENV === 'development'
			? '/'
			: 'https://storeserverapi.zhougonglai.now.sh',
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'https://storeserverapi.zhougonglai.now.sh',
	},
};
