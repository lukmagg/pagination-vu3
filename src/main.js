import { createApp } from 'vue'
import App from './App.vue'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'



axios.defaults.baseURL = "http://localhost:3004/graphql";

//axios.defaults.baseURL = "librarymanager-qgs5dun7v-falanges.vercel.app";


createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')
