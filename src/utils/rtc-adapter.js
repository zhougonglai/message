import AgoraRTC from 'agora-rtc-sdk';

export const getDevices = callback => {
	AgoraRTC.getDevices(callback);
};
