import UserService from '@/services/user';

const userService = new UserService();

export default {
	namespaced: true,
	state: () => ({
		info: {},
	}),
	getter: {},
	actions: {
		async getUser({ commit }) {
			const { data } = await userService.getUserInfo();
			commit('setUser', data);
			return data;
		},
	},
	mutations: {
		setUser(state, user) {
			state.info = user;
		},
	},
};
