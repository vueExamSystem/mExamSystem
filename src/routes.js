import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Search from './views/common/Search.vue'
/*主页*/
import HomePage from './views/HomePage.vue'
/*考试*/
import ExamHome from './views/exam/Home.vue'
/*测验*/
import TestHome from './views/test/Home.vue'
/*预习*/
import PreviewHome from './views/preview/Home.vue'
/*成绩*/
import ScoreHome from './views/score/Home.vue'
/*设置*/
import SettingHome from './views/setting/Home.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '登录',
        hidden: true
    },
    {
        path: '/search',
        component: Search,
        name: '搜索',
        hidden: true
    },
    {
        path: '/',
        component: HomePage,
        name: '主页',
        // children:[{
        //         path: '/exam',
        //         component: ExamHome,
        //         name: '考试'
        //     },{
        //         path: '/test',
        //         component: TestHome,
        //         name: '测验'
        //     },{
        //         path: '/preview',
        //         component: PreviewHome,
        //         name: '预习'
        //     },{
        //         path: '/score',
        //         component: ScoreHome,
        //         name: '成绩'
        //     },{
        //         path: '/setting',
        //         component: SettingHome,
        //         name: '设置'
        //     }
        // ]
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