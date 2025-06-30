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
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import {configure} from 'vee-validate'

const app = createApp(App);
const pinia = createPinia();
const options ={
  timeout: 3000,
  position: 'top-right'
};
configure({
  validateOnInput: true
})

app.use(Toast, options)
app.use(pinia);
app.use(router);
app.mount('#app');
