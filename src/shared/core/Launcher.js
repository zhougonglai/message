import { EventEmitter } from 'events';
import { app, protocol, BrowserWindow } from 'electron';
import {
	createProtocol,
	installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import logger from 'electron-log';
import is from '@/shared/core/is';
import ExceptionHandler from '@/shared/core/ExceptionHandler';
import { EMPTY_STRING } from '@/shared/constants';

const isDevelopment = process.env.NODE_ENV !== 'production';

export default class Launcher extends EventEmitter {
	constructor() {
		super();
		protocol.registerSchemesAsPrivileged([
			{ scheme: 'nn', privileges: { secure: true, standard: true } },
		]);
		this.init();

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

	init() {
		this.exceptionHandler = new ExceptionHandler();

		this.handlerEvents();
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
			if (win === null) {
				this.createWindow();
			}
		});

		// This method will be called when Electron has finished
		// initialization and is ready to create browser windows.
		// Some APIs can only be used after this event occurs.
		app.on('ready', async () => {
			if (isDevelopment && !process.env.IS_TEST) {
				// Install Vue Devtools
				// Devtools extensions are broken in Electron 6.0.0 and greater
				// See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
				// Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
				// If you are not using Windows 10 dark mode, you may uncomment these lines
				// In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
				// try {
				//   await installVueDevtools()
				// } catch (e) {
				//   console.error('Vue Devtools failed to install:', e.toString())
				// }
			}
			this.createWindow();
		});
	}

	createWindow(url = 'nn://./index.html') {
		let win = new BrowserWindow({
			width: 1440,
			height: 860,
			frame: false,
			vibrancy: 'ultra-dark',
			simpleFullscreen: true,
			webPreferences: {
				nodeIntegration: true,
			},
		});

		if (process.env.WEBPACK_DEV_SERVER_URL) {
			win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		} else {
			createProtocol('nn');
			win.loadURL(url);
		}

		win.on('closed', () => {
			win = null;
		});

		if (this.main && this.render_process) {
			logger('[nn] >>> createWindow max exception');
		} else if (!this.main) {
			this.main = win;
		} else if (!this.render_process) {
			this.render_process = win;
		}
	}
}
