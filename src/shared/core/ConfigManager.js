export default class ConfigManager {
	constructor() {
		this.init();
		this.systemConfig = {};
		this.userConfig = {};
	}

	init() {
		this.initSystemConfig();
		this.initUserConfig();
	}

	initSystemConfig() {}

	initUserConfig() {}
}
