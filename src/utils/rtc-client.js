import AgoraRTC from 'agora-rtc-sdk';

export default class RTCClient {
	_client;
	_interval;
	_joined;
	_published;
	_localStream;
	_remoteStreams;
	_audioMixingState;
	_audioEffectState;
	_params;
	_interval;
	_showProfile;

	constructor() {
		this._client = null;
		this._joined = false;
		this._published = false;
		this._localStream = null;
		this._remoteStreams = [];
		this._audioMixingState = 'stop';
		this._audioEffectState = 'stop';
		this._params = {};
		this._interval = 0;

		this._showProfile = false;
	}

	join({
		appID,
		mode,
		codec,
		token,
		channel,
		uid,
		microphoneId,
		cameraId,
		cameraResolution,
	}) {
		return new Promise((resolve, reject) => {
			if (this._joined) {
				reject('Your already joined');
				return;
			}

			this._client = AgoraRTC.createClient({
				mode,
				codec,
			});

			this._params = { appID, mode, codec, token, channel, uid };

			this._client.init(
				appID,
				() => {
					console.log('init success');
					this._client.join(
						token ? token : null,
						channel,
						uid ? uid : null,
						uuid => {
							console.log(
								`join channel: ${channel} success, uuid: ${uid} - ${uuid}`,
							);
							this._params.uuid = uuid;
							this._joined = true;

							if (!this._interval) {
								this._interval = setInterval(() => {
									this._updateVideoInfo();
								}, 0);
							}

							// create local stream
							this._localStream = AgoraRTC.createStream({
								streamID: this._params.uid,
								audio: true,
								video: true,
								screen: false,
								microphoneId,
								cameraId,
							});

							this._localStream.on('player-status-change', evt => {
								console.log('player status change', evt);
							});

							this._localStream.on('audioMixingPlayed', () => {
								console.log('audioMixingPlayed');
							});
							this._localStream.on('audioMixingFinished', () => {
								console.log('audioMixingFinished');
							});

							if (cameraResolution && cameraResolution != 'default') {
								// set local video resolution
								this._localStream.setVideoProfile(cameraResolution);
							}

							// init local stream
							this._localStream.init(
								() => {
									console.log('init local stream success');
									// play stream with html element id "local_stream"
									this._localStream.play('local_stream', { fit: 'cover' });

									// run callback
									resolve();
								},
								err => {
									console.error('init local stream failed ', err);
								},
							);
						},
						err => {
							console.log('join fail', err);
						},
					);
				},
				err => {
					console.error('init fail', err);
				},
			);
		});
	}

	_updateVideoInfo() {
		this._localStream &&
			this._localStream.getStats(stats => {
				console.log('_updateVideoInfo', stats);
			});
	}

	publish() {
		if (!this._client) {
			return;
		}

		if (this._published) {
			return;
		}

		const oldState = this._published;

		// publish localStream
		this._client.publish(this._localStream, err => {
			this._published = oldState;
			console.log('publish failed');
			console.error(err);
		});

		this._published = true;
	}

	unpublish() {
		if (!this._client) {
			return;
		}

		if (!this._published) {
			return;
		}

		const oldState = this._published;
		this._client.unpublish(this._localStream, err => {
			this._published = oldState;
			console.log('unpublish failed');
			console.error(err);
		});
		this._published = false;
	}

	leave() {
		if (!this._client) {
			return;
		}
		if (!this._joined) {
			return;
		}
		// leave channel
		this._client.leave(
			() => {
				// close stream
				this._localStream.close();
				// stop stream
				this._localStream.stop();
				while (this._remoteStreams.length > 0) {
					const stream = this._remoteStreams.shift();
					stream.stop();
				}
				this._localStream = null;
				this._remoteStreams = [];
				this._client = null;
				console.log('client leaves channel success');
				this._published = false;
				this._joined = false;
			},
			err => {
				console.log('channel leave failed');
				console.error(err);
			},
		);
	}
}
