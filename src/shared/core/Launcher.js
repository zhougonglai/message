import { EventEmitter } from 'events';
import { app, protocol, BrowserWindow, BrowserView } from 'electron';
import {
	createProtocol,
	installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import logger from 'electron-log';
import ExceptionHandler from './ExceptionHandler';
import Application from './Application';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default class Launcher extends EventEmitter {
	constructor() {
		super();
		protocol.registerSchemesAsPrivileged([
			{ scheme: 'nn', privileges: { secure: true, standard: true } },
		]);
		this.init();
	}

	init() {
		this.exceptionHandler = new ExceptionHandler();

		this.handlerEvents();
	}

	handlerEvents() {
		if (isDevelopment) {
			if (process.platform === 'win32') {
				process.on('message', data => {
					if (data === 'graceful-exit') {
						app.quit();
					}
				});
			} else {
				process.on('SIGTERM', () => {
					app.quit();
				});
			}
		}

		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		app.on('activate', () => {
			if (this.win === null) {
				this.win = this.createWindow();
			}
		});

		app.on('ready', async () => {
			global.application = new Application();
			if (isDevelopment && !process.env.IS_TEST) {
				await installVueDevtools();
			}
			this.win = this.createWindow();
		});
	}

	createWindow(url = 'nn://./index.html') {
		let win = new BrowserWindow({
			width: 1440,
			height: 860,
			x: 10,
			y: 150,
			frame: false,
			transparent: true,
			show: false,
			webPreferences: {
				nodeIntegration: true,
			},
		});

		if (process.env.WEBPACK_DEV_SERVER_URL) {
			logger.log(
				`process.env.WEBPACK_DEV_SERVER_URL ===> ${process.env.WEBPACK_DEV_SERVER_URL}`,
			);
			win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
			if (!process.env.IS_TEST) win.webContents.openDevTools();
		} else {
			createProtocol('nn');
			win.loadURL(url);
		}

		win.once('ready-to-show', () => {
			win.show();
		});

		win.on('closed', () => {
			win = null;
		});

		return win;
	}
}
