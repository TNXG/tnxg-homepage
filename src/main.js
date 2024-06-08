import './assets/main.css'
import 'remixicon/fonts/remixicon.css'
import 'material-icons/';

import 'mdui/mdui.css';
import 'mdui';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
