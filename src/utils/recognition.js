export default class {
	recognition;
	constructor({
		continuous = true,
		lang = 'zh-cn',
		interimResults = false,
		maxAlternatives = 1,
	}) {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.recognition.continuous = continuous;
		this.recognition.lang = lang;
		this.recognition.interimResults = interimResults;
		this.recognition.maxAlternatives = maxAlternatives;
	}

	onresult(callback) {
		this.recognition.onresult = callback;
	}

	onspeechend(callback) {
		this.recognition.onspeechend = callback;
	}
}
