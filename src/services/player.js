import Request from '@/utils/fetch';

export default class PlayerRequest {
	request;
	constructor() {
		this.request = new Request(process.env.VUE_APP_BASE);
	}

	getPlayers() {
		return this.request.get('base/player');
	}
}
