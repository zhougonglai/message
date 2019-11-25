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
	getters: {},
	actions: {
		async getPlayer({ commit }) {
			const { data } = await new Player().getPlayers();
			commit('SET_PLAYER', data);
		},
	},
	mutations: {
		activePlayer({ playList }, player) {
			playList.active = player;
			playList.audio = new Audio(player.audio.url);
			playList.play = true;
			playList.audio.addEventListener('canplaythrough', () => {
				playList.audio.play();
			});
			playList.audio.addEventListener('ended', () => {
				playList.play = false;
			});
			playList.list = playList.list.concat([player]);
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
