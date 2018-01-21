import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Search from '../views/common/Search.vue'
import Feedback from '../views/common/Feedback.vue'
/*主页*/
import HomePage from '../views/HomePage.vue'
/*考试*/
import ExamHome from '../views/exam/Home.vue'
import ExamWait from '../views/exam/Wait.vue'
import Examining from '../views/exam/Examining.vue'
/*测验*/
import TestHome from '../views/test/Home.vue'
/*预习*/
import PreviewHome from '../views/preview/Home.vue'
/*成绩*/
import ScoreHome from '../views/score/Home.vue'
/*设置*/
import SettingHome from '../views/setting/Home.vue'

//所有权限通用路由表 
//如登录页和一些不用权限的公用页面
export const constantRouterMap = [//不需要权限的页面
    {
        path: '/login',
        component: Login,
        name: '登录'
    },
    {
        path: '/search',
        component: Search,
        name: '搜索'
    },
    {
        path: '/feedback',
        component: Feedback,
        name: '反馈提示'
    }
];

//免登录白名单
export const whiteList = [];

//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap  = [
    {
        path: '/wait/:id',
        component: ExamWait,
        name: '等待考试',
        props: true,
        meta: { role: ['student'] }
    },
    {
        path: '/examining/:id',
        component: Examining,
        name: 'examining',
        props: true,
        meta: { role: ['student'] }
    },
    {
        path: '/',
        component: HomePage,
        name: '主页',
        meta: { role: ['student'] },
        // redirect: '/exam',
        children:[{
                path: 'exam',
                component: ExamHome,
                name: '考试',
                meta: { role: ['student'] }
            },{
                path: 'test',
                component: TestHome,
                name: '测验',
                meta: { role: ['student'] }
            },{
                path: 'preview',
                component: PreviewHome,
                name: '预习',
                meta: { role: ['student'] }
            },{
                path: 'score',
                component: ScoreHome,
                name: '成绩',
                meta: { role: ['student'] }
            },{
                path: 'setting',
                component: SettingHome,
                name: '设置',
                meta: { role: ['student'] }
            }
        ]
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
