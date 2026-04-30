import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Создаём приложение
const app = createApp(App);

// Добавляем небольшой эффект загрузки
app.config.globalProperties.$loading = false;

app.use(createPinia());
app.use(router);

// Монтируем приложение
app.mount("#app");
