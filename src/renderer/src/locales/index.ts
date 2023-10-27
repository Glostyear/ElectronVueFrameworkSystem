import { createI18n } from 'vue-i18n'

import zhcn from './lang/zh-cn'
import en from './lang/en'
import zhtw from './lang/zh-tw'
import jp from './lang/jp'

//element语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import English from 'element-plus/dist/locale/en.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import Japanese from 'element-plus/dist/locale/ja.mjs'

const messages = {
    'zh-cn':{
        el:zhCn,  //element-ui语言包,el对象
        ...zhcn
    },
    'en':{
        el:English,
        ...en
    },
    'zh-tw':{
        el:zhTw,
        ...zhtw
    },
    'jp':{
        el:Japanese,
        ...jp
    }
}

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'zh-cn',  // 初始化配置语言
    messages
})
    
export default i18n