export default class {
	recognition;
	config = {
		continuous: true,
		lang: 'zh-cn',
		interimResults: false,
		maxAlternatives: 1,
	};
	constructor(continuous, lang, interimResults, maxAlternatives) {
		this.config = Object.assign(this.config, {
			continuous,
			lang,
			interimResults,
			maxAlternatives,
		});
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.recognition.continuous = this.config.continuous;
		this.recognition.lang = this.config.lang;
		this.recognition.interimResults = this.config.interimResults;
		this.recognition.maxAlternatives = this.config.maxAlternatives;
	}

	onresult(callback) {
		this.recognition.onresult = callback;
	}

	onspeechend(callback) {
		this.recognition.onspeechend = callback;
	}

	onerror(callback) {
		this.recognition.onerror = callback;
	}

	onstart(callback) {
		this.recognition.onstart = callback;
	}
}
