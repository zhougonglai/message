import AgoraRTM from 'agora-rtm-sdk';

export const appId = '921f058a58694b73b69f62a061d9d070';

export default class {
	constructor(appId = '921f058a58694b73b69f62a061d9d070') {
		this._client = AgoraRTM.createInstance(appId);
	}

	handleEvent(callBack) {
		this._client.on('ConnectionStateChanged', callBack);
	}

	sendMessageToPeer(callBack) {
		this._client.sendMessageToPeer(callBack);
	}

	login({ token, uid }) {
		return this._client.login({ token, uid });
	}

	logout() {
		this._client.logout();
	}
}
