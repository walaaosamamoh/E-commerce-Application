import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
//import pinia from './stores/pinia';
import { makeServer } from './miragejs-server';

const app = createApp(App);

if (import.meta.env.NODE_ENV === 'development') {
  makeServer();
}

app.use(router);
//app.use(pinia);
app.mount('#app');
