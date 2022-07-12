import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
// import { BootstrapVue, IconsPlugin, CollapsePlugin } from "bootstrap-vue";

// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

const app = createApp(App)
// app.use(BootstrapVue);
// app.use(IconsPlugin);
app.use(router).mount('#app')
// app.config.globalProperties.$http = axios;

