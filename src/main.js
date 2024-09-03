import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; 
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhTw from 'element-plus/es/locale/lang/zh-tw'; // 引入繁體中文語言包
const app = createApp(App)
// 透過 Object.entries() 取得 ElementPlusIconsVue 物件的所有鍵值對
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus, {
    locale: zhTw, // 設定為繁體中文
  });
app.use(router);
app.use(ElementPlus);
app.mount('#app')
