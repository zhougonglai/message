import UserService from '@/service/user';

const userService = new UserService();

export default {
	namespaced: true,
	state: () => ({
		info: {},
	}),
	getter: {},
	actions: {
		async getUser({ commit }) {
			const { data } = await userService.getUser();
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
