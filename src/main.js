console.log('MODE:', import.meta.env.MODE);
import { makeServer } from './miragejs-server';
if (import.meta.env.MODE === 'development') {
  makeServer();
}

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');
