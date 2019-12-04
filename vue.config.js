module.exports = {
	publicPath: '/',
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'https://storeserverapi.zhougonglai.now.sh',
	},
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				publish: ['github'],
				appId: 'cn.zhougonglai.messager',
				productName: '消息',
			},
		},
	},
};
