import { createRouter, createWebHashHistory } from "vue-router";

import { beforeEach, afterEach} from '@router/guards'

import { AppRoutes } from '@router/routes'

const AppRouter =  createRouter({

    history: createWebHashHistory(),//hash模式

    routes:AppRoutes//路由配置规则数组

})

AppRouter.beforeEach(beforeEach)

AppRouter.afterEach(afterEach)

export default AppRouter;