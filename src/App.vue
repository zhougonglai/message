<template>
	<v-app id="app">
		<v-app-bar app color="white" :clipped-left="$vuetify.breakpoint.lgAndUp">
			<v-app-bar-nav-icon @click="drawer = !drawer" />
			<div class="d-flex align-center mx-5 unselect">
				<svg class="logo mr-2" aria-hidden="true">
					<use xlink:href="#icon-message1" />
				</svg>
				<span class="title">Message</span>
			</div>
			<v-text-field
				class="ml-5"
				solo-inverted
				flat
				hide-details
				label="查询"
				prepend-inner-icon="search"
			/>
			<v-spacer />
			<v-btn icon>
				<v-icon>settings_applications</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>
			<v-btn icon large>
				<v-avatar size="32px" item>
					<v-img
						src="https://resume.zhougonglai.now.sh/WechatIMG37.jpeg"
						alt="user"
					/>
				</v-avatar>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
		>
			<v-list expand shaped>
				<template v-for="item in items">
					<v-subheader v-if="item.heading" :key="item.heading">{{
						item.heading
					}}</v-subheader>
					<v-list-group
						v-else-if="item.children"
						:key="item.text"
						v-model="item.model"
						:prepend-icon="item.model ? item.icon : item['icon-alt']"
						append-icon="keyboard_arrow_up"
					>
						<template v-slot:activator>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title>{{ item.text }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>
						<v-list-item v-for="(child, i) in item.children" :key="i" link>
							<v-list-item-action v-if="child.icon">
								<svg class="icon" aria-hidden="true">
									<use :xlink:href="child.icon" />
								</svg>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>{{ child.text }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>

					<v-list-item v-else :key="item.text" link>
						<v-list-item-action>
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="item.icon" />
							</svg>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ item.text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>

			<v-spacer />
			<v-card v-if="playList.list.length" id="player">
				<v-list-item>
					<v-list-item-avatar>
						<v-img
							:aspect-ratio="1"
							:src="playList.active.avatar"
							lazy-src="@/assets/pice.png"
							:alt="playList.active.nickname"
							:key="playList.active.user_id"
						>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="blue" />
								</v-row>
							</template>
						</v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{
							playList.active.nickname
						}}</v-list-item-title>
						<v-list-item-subtitle>{{
							playList.active.label
						}}</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon large>
							<v-icon>play_circle_filled</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-card>
		</v-navigation-drawer>

		<v-content>
			<router-view />
		</v-content>
	</v-app>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'App',
	data: () => ({
		drawer: true,
		items: [
			{ heading: '游戏' },
			{ icon: '#icon-ziyuan', text: '英雄联盟' },
			{ icon: '#icon-pubg', text: '绝地求生' },
			{ icon: '#icon-wangzherongyao', text: '王者荣耀' },
			{ icon: '#icon-pung', text: '和平精英' },
			{ icon: '#icon-qipai', text: '云顶之翼' },
			{ icon: '#icon-sheji', text: '穿越火线' },
			{ heading: '娱乐' },
			{ icon: '#icon-VoiceAssistant-yuyin', text: '声优聊天' },
			{ icon: '#icon-music', text: '唱歌' },
			{ icon: '#icon-naozhong', text: '叫醒' },
			{ icon: '#icon-shuimian', text: '哄睡' },
		],
	}),
	computed: {
		...mapState('player', ['playList']),
	},
};
</script>

<style lang="scss" scoped>
.logo {
	width: 32px;
	height: 32px;
}
.icon {
	width: 24px;
	height: 24px;
}

#player {
	position: absolute;
	bottom: 15px;
}
</style>
