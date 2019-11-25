import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import player from './modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		player,
	},
	plugins: [
		createPersistedState({
			key: 'message',
		}),
	],
});
