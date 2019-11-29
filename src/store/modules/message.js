export default {
	namespaced: true,
	state: () => ({
		messageList: {},
	}),
	getters: {
		// 请确保使用时已经为该id创建了 @messageBox
		getMessage: state => id => {
			return state.messageList[id];
		},
	},
	actions: {
		async updateMessage({ commit }, { user, to, date, message }) {
			return commit('SET_MESSAGE', { user, to, date, message });
		},
	},
	mutations: {
		createMessageBox(state, id) {
			state.messageList[id] = [];
		},
		SET_MESSAGE(state, { user, to, date, message }) {
			if (!(to.user_id in state.messageList)) {
				state.messageList[to.user_id] = [];
			}
			state.messageList[to.user_id].push({ user, to, date, message });
		},
	},
};
