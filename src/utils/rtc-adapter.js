import AgoraRTC from 'agora-rtc-sdk';

const {
	getDevices,
	createClient,
	createStream,
	getParameter,
	getScreenSources,
	getSupportedCodec,
	report,
	setParameter,
	checkSystemRequirements,
} = AgoraRTC;

export default class {
	getDevices = getDevices;
	checkSystemRequirements = checkSystemRequirements;
	createClient = createClient;
	createStream = createStream;
	getParameter = getParameter;
	getScreenSources = getScreenSources;
	getSupportedCodec = getSupportedCodec;
	report = report;
	setParameter = setParameter;
}
