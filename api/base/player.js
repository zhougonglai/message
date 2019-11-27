const Mock = require('mockjs');

module.exports = (req, res) => {
	res.json(
		Mock.mock({
			'data|4-8': [
				{
					user_id: '@id',
					nickname: '@cname',
					label: '@cword(5,15)',
					'gender|1': [0, 1],
					age: '@natural(16, 45)',
					adress: '@city',
					'service|1-5': [
						{
							'game|1': [
								'英雄联盟',
								'绝地求生',
								'王者荣耀',
								'和平精英',
								'云顶之翼',
								'穿越火线',
							],
							'rank|1': ['最强王者', '钻石', '黄金', '青铜'],
						},
					],
					price: '@float(1, 100, 0, 2)',
					audio: {
						url: 'https://ywm.leigod.com/voicesamples.m4a',
						duation: 7,
					},
					avatar: 'https://api.adorable.io/avatars/285' + '/@id()' + '.png',
				},
			],
			status: true,
		}),
	);
};
