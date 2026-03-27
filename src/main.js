import '@/assets/styles/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import functionsPlugin from './plugins/functions';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(functionsPlugin);
app.mount('#app');
