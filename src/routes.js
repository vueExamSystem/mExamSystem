import Login from './views/Login.vue'
import NotFound from './views/404.vue'
/*首页*/
import HomePage from './views/HomePage.vue'

import testApi from './views/demo/Test.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '登录',
        hidden: true
    },
    {
        path: '/index',
        component: HomePage,
        name: '主页',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;