import "ant-design-vue/dist/antd.css";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import Antd from "ant-design-vue";
import Toast from "vue-toastification";

import App from "./App.vue";
import store from './store/index';
import router from "./router/index";
import Signup from './pages/Signup.vue';
import CreatePatient from './pages/CreatePatient.vue';

const app = createApp(App);

app.component('Signup', Signup);
app.component('CreatePatient', CreatePatient); 

app.use(router).use(store).use(Antd).use(Toast).mount("#app");
