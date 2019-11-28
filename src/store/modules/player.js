import Player from '@/services/player';

export default {
	namespaced: true,
	state: () => ({
		players: [],
		playList: {
			play: false,
			list: [],
			active: {},
			audio: null,
		},
	}),
	getters: {
		getPlayer: state => id => {
			return state.players.find(player => player.user_id === id);
		},
	},
	actions: {
		async getPlayer({ commit }) {
			const { data } = await new Player().getPlayers();
			commit('SET_PLAYER', data);
		},
	},
	mutations: {
		activePlayer({ playList }, player) {
			playList.active = player;
			if (playList.play) {
				if (playList.audio instanceof Audio) {
					playList.audio.pause();
				}
				playList.play = false;
			}
			playList.audio = new Audio(player.audio.url);
			playList.play = true;
			playList.audio.addEventListener('canplaythrough', () => {
				playList.audio.play();
			});
			playList.audio.addEventListener('ended', () => {
				playList.play = false;
			});
			if (!playList.list.some(({ user_id }) => user_id === player.user_id)) {
				playList.list.push(player);
			}
		},
		// #bug : store player fix
		audioPause({ playList }) {
			if (playList.play) {
				if (playList.audio instanceof Audio) {
					playList.audio.pause();
				}
				playList.play = false;
			}
		},
		SET_PLAYER(state, data) {
			state.players = data.map(player => ({
				...player,
				audio: {
					...player.audio,
					play: false,
				},
			}));
		},
	},
};
