import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './styles/global.scss';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'webrtc-adapter';

Vue.config.productionTip = false;
if (process.env.IS_ELECTRON) {
	Vue.prototype.$ipc = require('electron-ipc-extra');
}

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
