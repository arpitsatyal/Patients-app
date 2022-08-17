import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import Toast from "vue-toastification";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "vue-toastification/dist/index.css";

createApp(App).use(router).use(Antd).use(Toast).mount("#app");
