import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import Toast from "vue-toastification";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "vue-toastification/dist/index.css";
import CreatePatient from './pages/CreatePatient.vue';
import Signup from './pages/Signup.vue';
import store from './store/index';

const app = createApp(App);
app.component('CreatePatient', CreatePatient); 
// eslint-disable-next-line vue/multi-word-component-names
app.component('Signup', Signup);

app.use(router).use(store).use(Antd).use(Toast).mount("#app");
