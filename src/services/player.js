import Request from '@/utils/fetch';

export default class PlayerRequest {
	request;
	constructor() {
		this.request = new Request(process.env.BASE_URL);
	}

	getPlayers() {
		return this.request.get('base/player');
	}
}
