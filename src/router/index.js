import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
	},
	{
		path: '/detail/:id',
		name: 'detail',
		component: () =>
			import(/* webpackChunkName: 'Detail' */ '@/views/Detail.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.afterEach(to => {
	const { name, path, fullPath, params, query } = to;
	store.dispatch('routerUpdate', { name, path, fullPath, params, query });
});

export default router;
