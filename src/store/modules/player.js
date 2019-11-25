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
			playList.list.push(player);
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
