export default {
	namespaced: true,
	state: () => ({
		messageList: {},
	}),
	getters: {
		getMessage: state => id => {
			return state.messageList[id];
		},
	},
	actions: {
		async updateMessage({ commit }, { user, date, message }) {
			return commit('SET_MESSAGE', { user, date, message });
		},
	},
	mutations: {
		SET_MESSAGE(state, { user, date, message }) {
			if (!(user.user_id in state.messageList)) {
				state.messageList[user.user_id] = [];
			}
			state.messageList[user.user_id].push({ user, date, message });
		},
	},
};
