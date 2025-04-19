import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css' // Додали FontAwesome

const app = createApp(App) // 🔧 створюємо додаток
app.use(ElementPlus)  
app.use(router).mount('#app')          // 🚀 монтуємо
