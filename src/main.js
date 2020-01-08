import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './styles/global.scss';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'webrtc-adapter';
// import { IpcRendererManager } from '@/shared/core/IpcManager';

Vue.config.productionTip = false;
// Vue.prototype.$ipc = new IpcRendererManager();

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
