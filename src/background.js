'use strict';

import Launcher from './shared/core/Launcher';

if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path')
		.join(__dirname, '/static')
		.replace(/\\/g, '\\\\');
}

global.launcher = new Launcher();
