import { createApp } from 'vue'
import App from './App.vue'

//路由
import router from '@router'
//状态管理
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)


//国际化
import i18n from './locales'

//全局引入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//全局混入
import DictPlugin from '@mixins/DictPlugin'

//自定义指令
import { AuthDirectives  } from '@directives/auths.directive'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive(AuthDirectives.name,AuthDirectives)
app.use(router);
app.use( i18n );
app.use( store );
app.use( DictPlugin );
app.mount('#app');