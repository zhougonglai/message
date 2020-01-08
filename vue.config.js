module.exports = {
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'https://storeserverapi.zhougonglai.now.sh',
	},
	pluginOptions: {
		electronBuilder: {
			customFileProtocal: 'nn://./',
			builderOptions: {
				productName: 'NN',
				appId: 'cn.zhougonglai.nn',
			},
		},
	},
};
