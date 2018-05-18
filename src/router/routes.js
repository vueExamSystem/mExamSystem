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
import TestWait from '../views/test/Wait.vue'
import Testing from '../views/test/Examining.vue'
/*预习*/
import PreviewHome from '../views/preview/Home.vue'
import PreviewPractising from '../views/preview/Examining.vue'
import previewWait from '../views/preview/Wait.vue'
/*成绩*/
import ScoreHome from '../views/score/Home.vue'
import ScoreList from '../views/score/List.vue'
import ScoreAnalysis from '../views/score/Analysis.vue'
/*设置*/
import SettingHome from '../views/setting/Home.vue'

//所有权限通用路由表 
//如登录页和一些不用权限的公用页面
const routes = [//不需要权限的页面
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
    },
    {
        path: '/',
        component: HomePage,
        name: '主页',
        redirect: '/exam',
        children:[{
                path: '/exam',
                component: ExamHome,
                name: '考试'
            },{
                path: '/test',
                component: TestHome,
                name: '测验'
            },{
                path: 'preview',
                component: PreviewHome,
                name: '预习'
            },{
                path: 'score',
                component: ScoreHome,
                name: '成绩'
            },{
                path: 'setting',
                component: SettingHome,
                name: '设置'
            }
        ]
    },
    {
        path: '/exam/wait/:id',
        component: ExamWait,
        name: '等待考试',
        props: true,
    },
    {
        path: '/exam/examining/:id',
        component: Examining,
        name: '考试中',
        props: true,
    },
    {
        path: '/test/wait/:id',
        component: TestWait,
        name: '等待测验',
        props: true,
    },
    {
        path: '/test/testing/:id',
        component: Testing,
        name: '测验中',
        props: true,
    },
    {
        path: '/preview/practising/:id',
        component: PreviewPractising,
        name: '练习中',
        props: true,
    },
    {
        path: '/preview/wait/:id',
        component: previewWait,
        name: '等待练习',
        props: true,
    },
    {
        path: '/score/list/:term',
        component: ScoreList,
        name: '详细成绩',
        props: true,
    },
    {
        path: '/score/analysis/:id',
        component: ScoreAnalysis,
        name: '详细成绩',
        props: true,
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