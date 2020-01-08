import { EventEmitter } from 'events';
import { ipcMain, ipcRenderer } from 'electron';
import logger from 'electron-log';

const listerns = {
	imPush(name, data) {
		logger.log('IpcMainManager.listern', name, data);
	},
};

export class IpcMainManager extends EventEmitter {
	constructor() {
		super();
		this.listern();
	}

	listern() {
		for (let listern of Object.keys(listerns)) {
			this.on(listern, listerns[listern]);
		}
		this.handleCommond();
	}

	handleCommond() {
		ipcMain.on('imPush', (event, name, data) => {
			logger.log('IpcMainManager.constructor', name, data);
			this.emit('imPush', name, data);
		});
	}
}

export class IpcRendererManager extends EventEmitter {
	push(name) {
		ipcRenderer.send('imPush', name, 'enter');
	}
}
