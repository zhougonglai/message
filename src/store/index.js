import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import player from './modules/player';
import message from './modules/message';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		routerModule: [],
	},
	actions: {
		routerUpdate({ commit }, router) {
			commit('updateRouter', router);
		},
	},
	mutations: {
		updateRouter(state, router) {
			if (router.length) {
				state.routerModule = state.routerModule.concat(router);
			} else {
				state.routerModule.push(router);
			}
		},
	},
	modules: {
		player,
		message,
	},
	plugins: [
		createPersistedState({
			key: 'message',
		}),
	],
});
