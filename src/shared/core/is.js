module.exports = {
	// Checks if we are in renderer process
	renderer() {
		return process.type === 'renderer';
	},
	// Checks if we are in main process
	main() {
		return process.type === 'browser';
	},
	// Checks if we are under Mac OS
	osx() {
		return process.platform === 'darwin';
	},
	windows() {
		return process.platform === 'win32';
	},
	// Checks if we are under Linux OS
	linux() {
		return process.platform === 'linux';
	},
	// Checks if we are the processor's arch is x86
	x86() {
		return process.arch === 'ia32';
	},
	// Checks if we are the processor's arch is x64
	x64() {
		return process.arch === 'x64';
	},
	// Checks if the app is running in a sandbox on macOS
	sandbox() {
		return 'APP_SANDBOX_CONTAINER_ID' in process.env;
	},
	// Checks if the app is running as a Mac App Store build
	mas() {
		return process.mas === true;
	},
};
