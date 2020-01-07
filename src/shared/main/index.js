import { EventEmitter } from 'events';
import { protocol, BrowserWindow } from 'electron';
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
	// 主
	main;
	// 子
	wins;

	exceptionHandler;
	openedAtLogin;
	url = EMPTY_STRING;
	file = EMPTY_STRING;

	constructor() {
		super();
		// Scheme must be registered before the app is ready
		protocol.registerSchemesAsPrivileged([
			{ scheme: 'app', privileges: { secure: true, standard: true } },
		]);

		this.makeSingleInstance(() => {
			this.init();
		});

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

	makeSingleInstance(callBack) {
		// Mac App Store Sandboxed App not support requestSingleInstanceLock
		if (is.mas()) {
			callback();
			return;
		}
		const gotSingleLock = app.requestSingleInstanceLock();

		if (!gotSingleLock) {
			app.quit();
		} else {
			app.on('second-instance', (event, argv, workingDirectory) => {
				logger.warn('second-instance====>', argv, workingDirectory);
			});

			callback();
		}
	}

	init() {
		this.exceptionHandler = new ExceptionHandler();

		this.openedAtLogin = is.osx()
			? app.getLoginItemSettings().wasOpenedAtLogin
			: false;

		this.handleAppEvents();
	}

	handleAppEvents() {
		this.handleOpenUrl();
		this.handleOpenFile();
		this.handelAppReady();
		this.handleAppWillQuit();
	}

	handleOpenUrl() {
		if (is.mas() || !is.osx()) {
			return;
		}

		app.on('open-url', (event, url) => {
			logger.info(`[NN] open-url: ${url}`);
			event.preventDefault();
			this.url = url;
			this.sendUrlToApplication();
		});
	}

	handleOpenFile() {
		if (!is.osx()) {
			return;
		}

		app.on('open-file', (event, path) => {
			logger.info(`[Motrix] open-file: ${path}`);
			event.preventDefault();
			this.file = path;
			this.sendFileToApplication();
		});
	}

	handelAppReady() {
		app.on('ready', async () => {
			global.application = new Application();
			const { openedAtLogin } = this;
			global.application.start('index', {
				openedAtLogin,
			});
			global.application.on('ready', () => {
				this.sendUrlToApplication();

				this.sendFileToApplication();
			});
		});
	}

	handleAppWillQuit() {
		app.on('will-quit', () => {
			logger.info('[NN] will-quit');
			if (global.application) {
				global.application.stop();
			}
		});
	}

	sendUrlToApplication() {
		if (this.url && global.application && global.application.isReady) {
			global.application.handleProtocol(this.url);
			this.url = EMPTY_STRING;
		}
	}

	sendFileToApplication() {
		if (this.file && global.application && global.application.isReady) {
			global.application.handleFile(this.file);
			this.file = EMPTY_STRING;
		}
	}

	createWindow(options) {
		const win = new BrowserWindow(
			Object.assign(
				{},
				{
					width: 1440,
					height: 860,
					frame: false,
					center: true,
					show: false,
					webPreferences: {
						nodeIntegration: true,
					},
				},
				options,
			),
		);

		if (process.env.WEBPACK_DEV_SERVER_URL) {
			win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		} else {
			createProtocol('nn');
			this.handleOpenUrl();
			win.loadURL('nn://./index.html');
		}

		win.on('close', () => {
			win = null;
		});
		return win;
	}
}
