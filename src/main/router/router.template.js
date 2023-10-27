import EventRoute from "./EventRoute"

const routers = new Array();

import path from 'path'
import https from 'https'
import fs from 'fs'
import { screen,BrowserWindow} from 'electron'

// import AppUpdater from '../AppUpdater.js'
/**
 *  关闭loading
 *  展示login
 */
 routers.push(
  new EventRoute('hide-loading-show-main', 'event', (api, data = {}) => {
    //关闭loading窗口
    api.loadingWindow.destroy();
    setTimeout(()=>{
      //显示login窗口
      api.window.show();
    },500)
  })
)
/**
 *  退出应用
 */
 routers.push(
  new EventRoute('quit-window', 'event', (api, data = {}) => {
    api.app.quit();
  })
)

/**
 *  关闭窗口
 */
routers.push(
  new EventRoute('close-window', 'event', (api, data = {}) => {
    hideWindow();
  })
)

/**
 *  最大化
 */
 routers.push(
  new EventRoute('max-window', 'event', (api, data = {}) => {
    api.window.maximize();
  })
)

/**
 *  最小化
 */
routers.push(
  new EventRoute('min-window', 'event', (api, data = {}) => {
    api.window.minimize();
  })
)

let taskWindow = null;
/**
 *  异步下载任务
 */
//窗口属性
const context = {
  // 是否退出应用
  allowQuitting: false,
  isShow:false,
  listWindow:null
}
//显示窗口
const showWindow = () => {
    
  if (context.listWindow && !context.listWindow.isDestroyed()) {
    context.isShow = true;
    context.listWindow.show()
  }
}
//隐藏窗口
const hideWindow = () => {
  if (context.listWindow && !context.listWindow.isDestroyed()) {
    context.isShow = false;
    context.listWindow.hide();
  }
}

//创建窗口
const createListWindow =()=>{
  //创建窗口实例
  context.listWindow = new BrowserWindow({
      width: 1200,
      height: 350,
      show: false,
      frame:false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux'
        ? {
            icon: path.join(__dirname, '../../build/icon.png')
          }
        : {}),
      webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false
      }
  })
  //显示窗口 && 调整位置
  context.listWindow.on('ready-to-show', () => {
    let height = screen.getPrimaryDisplay().size.height;
    context.listWindow.setBounds({
      y:height-400
    })
    context.listWindow.show();
  })

  context.isShow = true;
  //关闭前窗口生命周期
  context.listWindow.on('close',()=>{
    context.listWindow = null;
  })

  //展示的页面
  if ( process.env['ELECTRON_RENDERER_URL']) {//判断有没有url来确定是开发环境还是生产环境
    context.listWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/down')
  } else {
    context.listWindow.loadFile(path.join(__dirname, '../renderer/index.html'),{
      hash:'/down'
    })
  }
}

routers.push(
  new EventRoute('open-window-down', 'event', (api, data = {}) => {
    if( context.listWindow == null ){
      createListWindow();
    }else{
      if (context.isShow){
        hideWindow();
      }
      else{
        showWindow();
      }
    }
  })
)

/**
 *  窗口拖拽
 */
 routers.push(

  new EventRoute('custom-adsorption', 'event', (api, data = {}) => {

    let res = data.data;
    
    context.listWindow.setPosition(res.appX,res.appY);

  })
)

/**
 *  下载
 */
routers.push(

  new EventRoute('download', 'event', (api, data = {}) => {
    let url = data.data.url;
    let filename = url.substring(url.lastIndexOf('/') + 1);
    //https请求
    https.get(url,( res )=>{
      api.dialog.showSaveDialog({
        title:'下载',
        defaultPath:filename
      }).then(data=>{
        //fs模块到导出表
        const file = fs.createWriteStream(data.filePath);
        //管道
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          api.dialog.showMessageBox({
            title: '提示信息',
            message: '下载完成',
            type: 'info'
          })
        }).on('error', (err) => {
          api.dialog.showMessageBox({
            title: '提示信息',
            message: err,
            type: 'error'
          })
        })
      })
    })

  })
)

/**
 *  聊天
 */
 routers.push(

  new EventRoute('chat', 'event', (api, data = {}) => {
        //创建窗口实例
  const chat = new BrowserWindow({
    width: 1050,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
})
//显示窗口 && 调整位置
chat.on('ready-to-show', () => {
  chat.show();
})

//展示的页面
if ( process.env['ELECTRON_RENDERER_URL']) {//判断有没有url来确定是开发环境还是生产环境
  chat.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/chat')
} else {
  chat.loadFile(path.join(__dirname, '../renderer/index.html'),{
    hash:'/chat'
  })
}

  })
)

export default routers
