import AgoraRTM from 'agora-rtm-sdk';

export const appId = '921f058a58694b73b69f62a061d9d070';

export default class {
	constructor(appId = '921f058a58694b73b69f62a061d9d070') {
		this._client = AgoraRTM.createInstance(appId);
	}

	handleEvent(callBack) {
		this._client.on('ConnectionStateChanged', callBack);
	}

	/**
	 * type message {
	 *  { text: 'test peer message' },
	 * '<PEER_ID>'
	 * }
	 * @param {*} callBack
	 */
	sendMessageToPeer(payload, id) {
		return this._client.sendMessageToPeer(payload, id);
	}

	login({ token, uid }) {
		return this._client.login({ token, uid });
	}

	logout() {
		this._client.logout();
	}
}
