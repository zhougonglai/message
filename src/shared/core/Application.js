import { EventEmitter } from 'events';
import logger from 'electron-log';
import ConfigManager from './ConfigManager';
import { IpcMainManager } from './IpcManager';

export default class Appication extends EventEmitter {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.configmanager = new ConfigManager();
		this.ipcmainManager = new IpcMainManager();
		this.handleCommands();
	}

	handleCommands() {
		this.ipcmainManager.on('imPush', name => {
			logger.log('Appication', name);
			this.emit('createChildWindow', name);
		});
	}
}
