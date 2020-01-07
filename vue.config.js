module.exports = {
	publicPath: '/',
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'https://storeserverapi.zhougonglai.now.sh',
	},
	pluginOptions: {
		electronBuilder: {
			customFileProtocal: 'messager://./',
			builderOptions: {
				productName: 'Messager',
				appId: 'cn.zhougonglai.messager',
			},
		},
	},
};
