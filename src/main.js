console.log('MODE:', import.meta.env.MODE);
import { makeServer } from './miragejs-server';
if (import.meta.env.MODE === 'development') {
  makeServer();
}

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
//import pinia from './stores/pinia';

const app = createApp(App);

app.use(router);
//app.use(pinia);
app.mount('#app');
