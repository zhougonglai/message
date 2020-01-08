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
	}

	handlerEvents() {
		// Quit when all windows are closed.
		app.on('window-all-closed', () => {
			// On macOS it is common for applications and their menu bar
			// to stay active until the user quits explicitly with Cmd + Q
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		app.on('activate', () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (this.win === null) {
				this.win = this.createWindow();
			}
		});

		// This method will be called when Electron has finished
		// initialization and is ready to create browser windows.
		// Some APIs can only be used after this event occurs.
		app.on('ready', async () => {
			global.application = new Application();
			if (isDevelopment && !process.env.IS_TEST) {
				// Install Vue Devtools
				// Devtools extensions are broken in Electron 6.0.0 and greater
				// See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
				// Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
				// If you are not using Windows 10 dark mode, you may uncomment these lines
				// In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
				try {
					await installVueDevtools();
				} catch (e) {
					console.error('Vue Devtools failed to install:', e.toString());
				}
			}
			this.win = this.createWindow();
		});
	}

	createWindow(url = 'nn://./') {
		let win = new BrowserWindow({
			width: 1440,
			height: 860,
			x: 10,
			y: 150,
			frame: false,
			backgroundColor: 'transparent',
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
