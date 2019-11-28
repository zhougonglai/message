<template>
	<v-container fluid id="detail">
		<v-row>
			<v-col cols class="full-height">
				<div class="elevation-3 full-height d-flex flex-column">
					<v-banner single-line sticky>
						<v-avatar size="36">
							<v-img
								:aspect-ratio="1"
								:src="player.avatar"
								lazy-src="@/assets/pice.png"
								:alt="player.nickname"
								class="mx-auto"
							>
								<template v-slot:placeholder>
									<v-row
										class="fill-height ma-0"
										align="center"
										justify="center"
									>
										<v-progress-circular indeterminate color="blue" />
									</v-row>
								</template>
							</v-img>
						</v-avatar>
						<div class="inline-block subtitle-2 bold ml-4">
							{{ player.nickname }}
						</div>
						<template v-slot:actions>
							<v-btn icon>
								<v-icon>search</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>favorite</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>notifications</v-icon>
							</v-btn>
						</template>
					</v-banner>
					<div id="main" class="flex-grow-1">
						<div class="chart-container full-height" v-scroll:#main="onScroll">
							<div
								class="cell-list"
								v-for="(messager, key) of messageList"
								:key="key"
							>
								<div class="cell-item">
									<div class="item-content">
										<div class="fill"></div>
										<div class="content-title text-end large bold">
											{{ messager.user.nickname }}
										</div>
										<div class="item-avatar">
											<v-img :src="messager.user.avatar"></v-img>
										</div>
									</div>
									<div class="content-payload d-flex justify-end">
										<div class="bable self">
											{{ messager.message.payload }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<v-divider />
					<div class="chart-bord d-flex align-center">
						<v-input class="carter">
							<v-btn icon slot="prepend" x-large>
								<v-icon x-large>mic_none</v-icon>
							</v-btn>
							<template slot="append">
								<v-btn icon class="mr-1">
									<v-icon>attachment</v-icon>
								</v-btn>
								<v-btn icon class="mx-1">
									<v-icon>local_see</v-icon>
								</v-btn>
								<v-btn icon class="mx-1">
									<v-icon>insert_emoticon</v-icon>
								</v-btn>

								<v-btn
									icon
									x-large
									class="primary ml-1"
									color="white"
									@click="sendMessage()"
								>
									<v-icon>send</v-icon>
								</v-btn>
							</template>
							<input id="chart" v-model="message" />
						</v-input>
						<!-- <div class="carter d-flex align-center">
							<v-text-field
								prepend-icon="mic_none"
								append-outer-icon="send"
								outlined
								v-model="message"
							/>
						</div> -->
					</div>
				</div>
			</v-col>
			<v-divider vertical />
			<v-col xl="2" lg="3" md="4" sm="6" xs="12">
				<v-card tile class="full-height">
					<v-img
						:aspect-ratio="1"
						:src="player.avatar"
						lazy-src="@/assets/pice.png"
						min-width="225"
						:alt="player.nickname"
						class="mx-auto pointer"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate color="blue" />
							</v-row>
						</template>
					</v-img>
					<v-card-title>
						{{ player.nickname }}
					</v-card-title>
					<v-card-subtitle class="pb-0 pointer" v-text="player.label" />
					<v-card-text :class="player.service.length > 3 ? 'pa-0' : 'py-0'">
						<v-chip-group>
							<v-chip small v-for="(server, i) of player.service" :key="i">
								{{ server.game }}
							</v-chip>
						</v-chip-group>
						<v-divider />
						<v-row>
							<v-col cols="6">
								<v-responsive aspect-ratio="1">
									<div
										class="d-flex flex-column flex-grow-1 align-center justify-center full-height"
									>
										<v-btn icon x-large>
											<v-icon x-large>message</v-icon>
										</v-btn>
										<p>语音通话</p>
									</div>
								</v-responsive>
							</v-col>
							<v-divider vertical />
							<v-col cols="6">
								<v-responsive aspect-ratio="1">
									<div
										class="d-flex flex-column flex-grow-1 align-center justify-center full-height"
									>
										<v-btn icon x-large>
											<v-icon x-large>videocam</v-icon>
										</v-btn>
										<p>视频聊天</p>
									</div>
								</v-responsive>
							</v-col>
						</v-row>
						<v-divider />
						<div class="pa-2">
							<v-btn color="primary" block class="my-2">关注</v-btn>
							<v-btn color="primary" block class="my-2">添加朋友</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
	name: 'Detail',
	data: () => ({
		message: '',
	}),
	computed: {
		...mapState('message', ['messageList']),
		...mapGetters('player', ['getPlayer']),
		player() {
			return this.getPlayer(this.$route.params.id);
		},
	},
	methods: {
		onScroll(e) {
			console.log(e.target.scrollTop);
		},
		sendMessage(type = 'text') {
			if (this.message) {
				this.updateMessage({
					user: this.player,
					message: {
						type,
						date: Date.now(),
						payload: this.message,
					},
				}).then(() => {
					this.message = '';
				});
			}
		},
		...mapActions('message', ['updateMessage']),
	},
	mounted() {},
};
</script>
<style lang="scss" scoped>
#detail {
	padding: 0 12px;
	height: 100%;
	> .row {
		height: 100%;
	}
	.avatar-info {
		display: flex;
		padding: 8px 12px;
		background-image: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.01),
			rgba(0, 0, 0, 0.66)
		);
	}

	#main {
		height: 1px;
		overflow-y: auto;
		.chart-container {
			min-height: 1000px;
		}
	}
	.chart-bord {
		height: 120px;
		background-color: white;
		padding: 0 12px;
		.carter::v-deep {
			border-radius: 34px;
			padding: 0 4px;
			background-color: #f9f9f9;
			display: flex;
			align-items: center;
			position: relative;
			.v-input__slot {
				padding: 0;
				margin: 0;
			}
			.v-input__append-outer {
				display: flex;
				align-items: center;
			}
			.v-messages {
				position: absolute;
				bottom: -20px;
				width: 100%;
			}
		}
		#chart {
			width: 100%;
			font-size: large;
			caret-color: var(--mdc-theme-primary);
		}
	}
}
</style>
