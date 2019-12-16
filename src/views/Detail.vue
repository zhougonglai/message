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
							<template v-if="messages.length">
								<div
									class="cell-list"
									v-for="(messager, key) of messages"
									:key="key"
								>
									<div class="cell-item">
										<div class="item-content">
											<div class="fill"></div>
											<div class="content-title text-end">
												{{ messager.user.nickname || messager.user.nickName }}
											</div>
											<div class="item-avatar">
												<v-img
													:src="messager.user.avatar || messager.user.imageUrl"
												/>
											</div>
										</div>
										<div class="content-payload d-flex justify-end">
											<div
												class="bable self"
												@click="speech(messager.message.payload)"
											>
												{{ messager.message.payload }}
											</div>
										</div>
									</div>
								</div>
							</template>
						</div>
					</div>
					<v-divider />
					<div class="chart-bord d-flex align-center">
						<v-input class="carter">
							<v-btn icon slot="prepend" x-large @click="recognitionStar">
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
										<v-btn icon x-large @click="voiceCallOn">
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
										<v-btn icon x-large @click="videoCallOn">
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

		<v-dialog
			v-model="voiceCall.status"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
		>
			<v-card tile>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="voiceCall.status = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>通话呼叫</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark text @click="voiceCall.status = false">Save</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-row>
					<v-col class="d-flex flex-column align-center justify-center">
						<v-btn icon @click="callOn">
							<v-icon>call</v-icon>
						</v-btn>
						<v-btn v-if="voiceCall.calling" icon @click="callDown" color="red">
							<v-icon>call</v-icon>
						</v-btn>
					</v-col>
					<v-col class="d-flex flex-column align-center justify-center">
						<template v-if="devices.audioinput.list.length">
							<v-select
								solo
								v-model="devices.audioinput.target"
								:hint="
									`${devices.audioinput.target.label}, ${devices.audioinput.target.kind}`
								"
								:items="devices.audioinput.list"
								item-text="label"
								item-value="deviceId"
								persistent-hint
								return-object
								single-line
							/>
						</template>
						<template
							v-if="devices.videoinput.list.length && devices.videoinput.target"
						>
							<v-select
								solo
								v-model="devices.videoinput.target"
								:hint="
									`${devices.videoinput.target.label}, ${devices.videoinput.target.kind}`
								"
								:items="devices.videoinput.list"
								item-text="label"
								item-value="deviceId"
								persistent-hint
								return-object
								single-line
							/>
						</template>
						<template v-if="devices.audiooutput.list.length">
							<v-select
								solo
								v-model="devices.audiooutput.target"
								:hint="
									`${devices.audiooutput.target.label}, ${devices.audiooutput.target.kind}`
								"
								:items="devices.audiooutput.list"
								item-text="label"
								item-value="deviceId"
								persistent-hint
								return-object
								single-line
							/>
						</template>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
		<v-dialog
			v-model="videoCall.status"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
		>
			<v-card tile>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="videoCall.status = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>视频呼叫</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark text @click="videoCall.status = false">save</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-row>
					<v-col class="d-flex flex-column align-center justify-center">
						<v-btn icon @click="videoOn">
							<v-icon>call</v-icon>
						</v-btn>
						<v-btn v-if="videoCall.calling" icon @click="videoDown" color="red">
							<v-icon>call</v-icon>
						</v-btn>
						<video v-if="videoCall.url" :src="videoCall.url" controls />
					</v-col>
					<v-col class="d-flex flex-column align-center justify-center">
						<template v-if="devices.audioinput.list.length">
							<v-select
								solo
								v-model="devices.audioinput.target"
								:hint="
									`${devices.audioinput.target.label}, ${devices.audioinput.target.kind}`
								"
								:items="devices.audioinput.list"
								item-text="label"
								item-value="deviceId"
								persistent-hint
								return-object
								single-line
							/>
						</template>
						<template
							v-if="devices.videoinput.list.length && devices.videoinput.target"
						>
							<v-select
								solo
								v-model="devices.videoinput.target"
								:hint="
									`${devices.videoinput.target.label}, ${devices.videoinput.target.kind}`
								"
								:items="devices.videoinput.list"
								item-text="label"
								item-value="deviceId"
								persistent-hint
								return-object
								single-line
							/>
						</template>
						<template v-if="devices.audiooutput.list.length">
							<v-select
								solo
								v-model="devices.audiooutput.target"
								:hint="
									`${devices.audiooutput.target.label}, ${devices.audiooutput.target.kind}`
								"
								:items="devices.audiooutput.list"
								item-text="label"
								item-value="deviceId"
								persistent-hint
								return-object
								single-line
							/>
						</template>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</v-container>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import { UUIDGeneratorBrowser } from '@/utils/help';
import RTCCLient from '@/utils/rtc-client';
import RTMCLient from '@/utils/rtm-client';
import Recognition from '@/utils/recognition';
import { getDevices } from '@/utils/rtc-adapter';

const rtcClient = new RTCCLient();
const rtmClient = new RTMCLient();

export default {
	name: 'Detail',
	data: () => ({
		message: '',
		recognition: {
			target: new Recognition(),
			status: false,
		},
		speechRecognition: {
			target: new SpeechSynthesisUtterance(),
		},
		mediaRecorder: null,
		voiceCall: {
			localstream: null,
			target: new Audio(),
			calling: false,
			status: false,
		},
		videoCall: {
			localstream: null,
			url: null,
			status: false,
		},
		devices: {
			// 麦克风
			audioinput: {
				target: {},
				list: [],
			},
			// 摄像头
			videoinput: {
				target: {},
				list: [],
			},
			// 扬声器
			audiooutput: {
				target: {},
				list: [],
			},
		},
	}),
	computed: {
		...mapState('user', ['info']),
		...mapState('message', ['messageList']),
		...mapGetters('player', ['getPlayer']),
		...mapGetters('message', ['getMessage']),
		messages() {
			return this.$route.params.id in this.messageList
				? this.getMessage(this.$route.params.id)
				: [];
		},
		player() {
			return this.getPlayer(this.$route.params.id);
		},
	},
	methods: {
		// TODO
		onScroll(e) {
			if (e.target.scrollTop === 0) {
				alert('到顶了');
			}
		},
		voiceCallOn() {
			this.voiceCall.status = true;
			navigator.mediaDevices.enumerateDevices().then(devices => {
				this.devices.audioinput.list = devices.filter(
					device => device.kind === 'audioinput',
				);
				this.devices.audioinput.target = devices.find(
					device =>
						device.kind === 'audioinput' && device.deviceId === 'default',
				);
				this.devices.videoinput.list = devices.filter(
					device => device.kind === 'videoinput',
				);
				this.devices.videoinput.target = devices.find(
					device =>
						device.kind === 'videoinput' && device.deviceId === 'default',
				);
				this.devices.audiooutput.list = devices.filter(
					device => device.kind === 'audiooutput',
				);
				this.devices.audiooutput.target = devices.find(
					device =>
						device.kind === 'audiooutput' && device.deviceId === 'default',
				);
			});
		},
		async callOn() {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				this.voiceCall.localstream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				console.log(this.voiceCall.localstream);
				this.voiceCall.mediaRecorder = new MediaRecorder(
					this.voiceCall.localstream,
				);
				console.log(this.voiceCall.mediaRecorder);
				this.voiceCall.mediaRecorder.start();
				this.voiceCall.calling = true;
			}
		},
		async callDown() {
			this.voiceCall.mediaRecorder.stop();
			this.voiceCall.calling = false;
		},
		videoCallOn() {
			this.videoCall.status = true;
			rtcClient
				.join({
					appID: '921f058a58694b73b69f62a061d9d070',
					mode: 'rtc',
					code: 'h264',
					channel: this.$route.params.id,
					uid: UUIDGeneratorBrowser(),
				})
				.then(() => {
					console.log('rtcClient', rtcClient);
					this.videoCall.localstream = rtcClient._localStream;
					this.videoCall.url = URL.createObjectURL(rtcClient._localStream);
					getDevices(devices => {
						this.devices.audioinput.list = devices.filter(
							device => device.kind === 'audioinput',
						);
						this.devices.audioinput.target = devices.find(
							device =>
								device.kind === 'audioinput' && device.deviceId === 'default',
						);
						this.devices.videoinput.list = devices.filter(
							device => device.kind === 'videoinput',
						);
						this.devices.videoinput.target = devices.find(
							device =>
								device.kind === 'videoinput' && device.deviceId === 'default',
						);
						this.devices.audiooutput.list = devices.filter(
							device => device.kind === 'audiooutput',
						);
						this.devices.audiooutput.target = devices.find(
							device =>
								device.kind === 'audiooutput' && device.deviceId === 'default',
						);
					});
				});
		},
		async videoOn() {},
		async videoDown() {},
		recognitionStar() {
			this.recognition.target.start();
			setTimeout(() => {
				this.recognition.target.stop();
			}, 10000);
		},
		speech(text) {
			this.speechRecognition.target.text = text;
			window.speechSynthesis.speak(this.speechRecognition.target);
		},
		async sendMessage(type = 'text') {
			if (this.message) {
				const result = await rtmClient.sendMessageToPeer(
					{ text: this.message },
					this.$route.params.id,
				);
				console.log(result);
				this.updateMessage({
					user: this.info,
					to: this.player,
					date: Date.now(),
					message: {
						type,
						payload: this.message,
					},
				}).then(() => {
					this.message = '';
				});
			}
		},
		onresult(event) {
			this.message = event.results[0][0].transcript;
		},
		onspeechend(event) {
			this.message = event.target.message;
		},
		rtmEvent(state, reason) {
			console.log(state, reason);
		},
		...mapActions('message', ['updateMessage']),
	},
	mounted() {
		this.recognition.target.onresult = this.onresult;
		this.recognition.target.onspeechend = this.onspeechend;
		rtmClient.login({ uid: UUIDGeneratorBrowser() });
		rtmClient.handleEvent(this.rtmEvent);
	},
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
