module.exports = {
	publicPath: '/',
	transpileDependencies: ['vuetify'],
	devServer: {
		proxy: 'https://storeserverapi.zhougonglai.now.sh',
	},
	pluginOptions: {
		electronBuilder: {
			builderOptions: {
				appId: 'cn.zhougonglai.messager',
				productName: '消息',
			},
		},
	},
};
