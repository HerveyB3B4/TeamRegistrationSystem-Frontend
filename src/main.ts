import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css';
import App from './App.vue';

// setup vue-router
import router from './routers/';

// setup pinia
import pinia from './stores/';

// import Icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')