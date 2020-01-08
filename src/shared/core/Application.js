import { EventEmitter } from 'events';

export default class Appication extends EventEmitter {
	isReady = false;
	constructor() {
		super();
		this.init();
	}

	init() {}
}
