import axios  from 'axios';
import instance  from '../axios';
import u from '../common/js/util';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
import {
    TypeList,
    UsageList,
    SubjectList,
    ChapterList,
    DepartmentList,
    QuestionList,
    CourseList,
    TagList,
} from './data/question';
import {
    PaperList,
    ProblemList
} from './data/paper';

let _Users = Users;

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let noTokenMock = new MockAdapter(axios);
        let mock = new MockAdapter(instance);

        //请求登录
        noTokenMock.onPost('/login').reply(config => {
            let {username, password} = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let user = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            user = JSON.parse(JSON.stringify(u));
                            user.password = undefined;
                            return true;
                        }
                    });

                    if (hasUser) {
                        resolve([200, {code: 200, msg: '请求成功', data:{token: new Date().getTime()}}]);
                    } else {
                        resolve([200, {code: 500, msg: '账号或密码错误'}]);
                    }
                }, 1000);
            });
        });

        //获取用户信息
        mock.onPost('/user/info').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            userId: '01112307',//账号
                            studentNo: '01112307',//学号
                            userName: '黄烨',
                            school: '南京大学',
                            grade: '2017',
                            department: '计算机系',
                            class: '3'
                        }
                        
                    }]);
                }, 1000);
            });
        });

        //修改用户密码
        mock.onPost('/user/editpwd').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '密码修改成功',
                        data: {}
                    }]);
                }, 1000);
            });
        });

        //搜索列表
        mock.onPost('/search/list').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('config',config)
                    var params = JSON.parse(config.data).params;
                    var data;
                    if(params.type == 'exam'){
                        data = [ 
                            {
                                id: '11',
                                name: 'search大一物理（上）期中考试11',
                                startTime: '2018/01/25 00:00',
                                endTime: '2018/01/25 02:00',
                                optionNeed: 2//选做题必答
                            },
                            {
                                id: '12',
                                name: 'search大一物理（上）期中考试12',
                                startTime: '2018/01/25 00:00',
                                endTime: '2018/01/25 02:00',
                                optionNeed: 2//选做题必答
                            },
                            {
                                id: '13',
                                name: 'search大一物理（上）期中考试13',
                                startTime: '2018/01/25 00:00',
                                endTime: '2018/01/25 02:00',
                                optionNeed: 2//选做题必答
                            },
                            {
                                id: '14',
                                name: 'search大一物理（上）期中考试14',
                                startTime: '2018/01/25 00:00',
                                endTime: '2018/01/25 02:00',
                                optionNeed: 2//选做题必答
                            },
                            {
                                id: '15',
                                name: 'search大一物理（上）期中考试15',
                                startTime: '2018/01/25 00:00',
                                endTime: '2018/01/25 02:00',
                                optionNeed: 2//选做题必答
                            }
                        ];
                    }
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data
                    }]);
                }, 1000);
            });
        });

        //获取考试列表
        mock.onPost('/exam/list').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            id: '1',
                            name: '大一物理（上）期中考试1',
                            startTime: '2018/01/25 21:31',
                            endTime: '2018/01/25 23:25',
                            optionNeed: 2//选做题必答
                        },{
                            id: '2',
                            name: '大一高等数学（上）期中考试2',
                            startTime: '2018/01/25 13:32',
                            endTime: '2018/01/25 15:45',
                            optionNeed: 3//选做题必答
                        },{
                            id: '3',
                            name: '大一大学英语（上）期中考试3',
                            startTime: '2018/01/22 16:40',
                            endTime: '2018/01/22 14:45',
                            optionNeed: 3//选做题必答
                        },{
                            id: '4',
                            name: '大一计算机（上）期中考试4',
                            startTime: '2018/01/23 14:00',
                            endTime: '2018/01/22 14:45',
                            optionNeed: 3//选做题必答
                        }]
                    }]);
                }, 1000);
            });
        });

        //获取试卷题目列表
        mock.onPost(`exam/problem/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, ProblemList]);
                }, 1000);
            });
        });

        //考试交卷
        mock.onPost('/exam/submit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: ''
                    }]);
                }, 1000);
            });
        });

        //获取测验题目列表
        mock.onPost(`test/problem/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, ProblemList]);
                }, 1000);
            });
        });

        //获取测验列表
        mock.onPost('/test/list').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            id: '1',
                            name: '大一物理（上）测验1',
                            startTime: '2018/01/27 23:55',
                            endTime: '2018/01/27 23:59',
                            optionNeed: 2//选做题必答
                        },{
                            id: '2',
                            name: '大一高等数学（上）测验2',
                            startTime: '2018/01/26 10:30',
                            endTime: '2018/01/26 11:45',
                            optionNeed: 3//选做题必答
                        },{
                            id: '3',
                            name: '大一大学英语（上）测验3',
                            startTime: '2018/01/22 16:40',
                            endTime: '2018/01/22 14:45',
                            optionNeed: 3//选做题必答
                        },{
                            id: '4',
                            name: '大一计算机（上）测验4',
                            startTime: '2018/01/23 14:00',
                            endTime: '2018/01/22 14:45',
                            optionNeed: 3//选做题必答
                        }]
                    }]);
                }, 1000);
            });
        });

        //测验交卷
        mock.onPost('/test/submit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: ''
                    }]);
                }, 1000);
            });
        });

        //获取预习习题列表
        mock.onPost('/preview/list/exercise').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            id: '1',
                            name: '大一物理第一章练习1',
                            overTime: '2018/01/25 23:37',
                            optionNeed: 2//选做题必答
                        },{
                            id: '2',
                            name: '大一物理第一章练习2',
                            overTime: '2018/01/25 23:45',
                            optionNeed: 3//选做题必答
                        },{
                            id: '3',
                            name: '大一物理第一章练习3',
                            overTime: '2018/01/26 00:05',
                            optionNeed: 3//选做题必答
                        },{
                            id: '4',
                            name: '大一物理第一章练习4',
                            overTime: '2018/01/26 11:00',
                            optionNeed: 3//选做题必答
                        }]
                    }]);
                }, 1000);
            });
        });

        //获取预习资料列表
        mock.onPost('/preview/list/doc').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            id: '1',
                            name: '物理第一章预习',
                            course: '大学物理'
                        },{
                            id: '2',
                            name: '高等数学第一章预习',
                            course: '高等数学',
                        },{
                            id: '3',
                            name: '大一大学英语第一章预习',
                            course: '大学英语'
                        },{
                            id: '4',
                            name: '大一计算机第一章预习',
                            course: '计算机原理'
                        }]
                    }]);
                }, 1000);
            });
        });

        //获取用户所有课程
        mock.onPost('/user/course').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            id: '1',
                            name: '大学物理'
                        },{
                            id: '2',
                            name: '高等数学',
                        },{
                            id: '3',
                            name: '电路逻辑'
                        },{
                            id: '4',
                            name: '大学英语'
                        }]
                    }]);
                }, 3000);
            });
        });

        //获取资料内容
        mock.onPost('/preview/doc').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,{
                        code: 0,
                        msg: '请求成功',
                        data:{
                            imgList:['/static/images/logo.png','/static/images/wait.png'],
                            content: '《大学物理》作者是叶伟国、余国祥。是2012年12月3日清华大学出版社出版的图书，该书讲述了物理学的基本规律和基本概念。主要内容包括：力和运动、功和能、机械振动和波动等。',
                            videoSrc: 'http://pic.ibaotu.com/00/49/65/61H888piCs2t.mp4_10s.mp4'
                        }
                    }]);
                }, 3000);
            });
        });

        //获取学期课程
        mock.onPost('/score/courses').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,{
                        code: 0,
                        msg: '请求成功',
                        data:[{
                            id: '1',
                            name: '2017年-2018年第一学期',
                            avgScore: 100,
                            courseList: [{
                                id: '311',
                                name: '大三大学物理（上）'
                            },{
                                id: '312',
                                name: '大三高等数学（上）',
                            },{
                                id: '313',
                                name: '大三电路逻辑（上）'
                            },{
                                id: '314',
                                name: '大三大学英语（上）'
                            }]
                        }, {
                            id: '2',
                            name: '2016年-2017年第二学期',
                            avgScore: 80,
                            courseList: [{
                                id: '221',
                                name: '大二大学物理（下）'
                            },{
                                id: '222',
                                name: '大二高等数学（下）',
                            },{
                                id: '223',
                                name: '大二电路逻辑（下）'
                            },{
                                id: '224',
                                name: '大二大学英语（下）'
                            }]
                        }, {
                            id: '3',
                            name: '2016年-2017年第一学期',
                            avgScore: 60,
                            courseList: [{
                                id: '211',
                                name: '大二大学物理（上）'
                            },{
                                id: '212',
                                name: '大二高等数学（上）',
                            },{
                                id: '213',
                                name: '大二电路逻辑（上）'
                            },{
                                id: '214',
                                name: '大二大学英语（上）'
                            }]
                        }, {
                            id: '4',
                            name: '2015年-2016年第二学期',
                            avgScore: 90,
                            courseList: [{
                                id: '121',
                                name: '大一大学物理（下）'
                            },{
                                id: '122',
                                name: '大一高等数学（下）',
                            },{
                                id: '123',
                                name: '大一电路逻辑（下）'
                            },{
                                id: '124',
                                name: '大一大学英语（下）'
                            }]
                        }, {
                            id: '5',
                            name: '2015年-2016年第一学期',
                            avgScore: 50,
                            courseList: [{
                                id: '111',
                                name: '大一大学物理（上）'
                            },{
                                id: '112',
                                name: '大一高等数学（上）',
                            },{
                                id: '113',
                                name: '大一电路逻辑（上）'
                            },{
                                id: '114',
                                name: '大一大学英语（上）'
                            }]
                        }]
                    }]);
                }, 1000);
            });
        });

        //通过学期和课程获取成绩综合表
        mock.onPost('/score/statistics').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,{
                        code: 0,
                        msg: '请求成功',
                        data:{
                            course:'大学物理',
                            max: 100,
                            min: 60,
                            avg: 79,
                            statistics:[
                                {count:200, flag:'优秀'},
                                {count:200, flag:'良好'},
                                {count:200, flag:'中等'},
                                {count:20, flag:'不及格'}
                            ]
                        }
                    }]);
                }, 1000);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let {page, name, pageSize} = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            pageSize = pageSize ? pageSize : 20;
            mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        //删除用户
        mock.onGet('/user/remove').reply(config => {
            let {id} = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let {ids} = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onGet('/user/edit').reply(config => {
            let {id, name, addr, age, birth, sex} = config.params;
            _Users.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.addr = addr;
                    u.age = age;
                    u.birth = birth;
                    u.sex = sex;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onGet('/user/add').reply(config => {
            let {name, addr, age, birth, sex} = config.params;
            _Users.push({
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        // test
        mock.onPost('/test').reply(config => {
            const {para} = config.params;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (para === '1') {
                        resolve([200, {code: 200, msg: 'success'}]);
                    } else {
                        resolve([200, {code: 500, msg: 'error'}]);
                    }
                }, 1000);
            });
        });


        /** 以下question **/

        //获取que列表
        mock.onGet('/question/list').reply(config => {
            return u.getMockList(config, QuestionList);
        });

        //获取tag列表
        mock.onGet('/tag/list').reply(config => {
            return u.getMockList(config, TagList);
        });

        //获取科目列表
        mock.onGet(`/subject/list`).reply(config => {
            return u.getMockList(config, SubjectList);
        });

        //获取章节列表
        mock.onGet(`/chapter/list`).reply(config => {
            return u.getMockList(config, ChapterList);
        });

        //获取题组列表
        mock.onGet(`/department/list`).reply(config => {
            return u.getMockList(config, DepartmentList);
        });

        //获取course列表
        mock.onGet(`/course/list`).reply(config => {
            return u.getMockList(config, CourseList);
        });

        /** 以下paper **/
        //获取试卷列表
        mock.onPost(`/paper/list`).reply(config => {
            return u.getMockList(config, PaperList);
        });
    }
};