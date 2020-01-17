import { EventEmitter } from 'events';
import logger from 'electron-log';
import ConfigManager from './ConfigManager';
import ipc from 'electron-ipc-extra';

export default class Appication extends EventEmitter {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.configmanager = new ConfigManager();
		this.handleCommands();
	}

	handleCommands() {
		ipc.on('imPush', name => {
			logger.log('Appication', name);
			this.emit('createChildWindow', name);
		});
	}
}
