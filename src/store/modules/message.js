export default {
	namespaced: true,
	state: () => ({
		messageList: [],
	}),
	getters: {},
	actions: {
		async updateMessage({ commit }, { user, date, message }) {
			return commit('SET_MESSAGE', { user, date, message });
		},
	},
	mutations: {
		SET_MESSAGE(state, { user, date, message }) {
			state.messageList.push({ user, date, message });
		},
	},
};
