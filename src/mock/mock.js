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
                            roles: ['admin']
                        }
                        
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
                            startTime: '2018/01/23 9:22',
                            endTime: '2018/01/23 11:25',
                            optionNeed: 2//选做题必答
                        },{
                            id: '2',
                            name: '大一高等数学（上）期中考试2',
                            startTime: '2018/01/22 17:00',
                            endTime: '2018/01/22 18:45',
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
        //获取试卷题目列表
        mock.onPost(`paper/problem/list`).reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, ProblemList]);
                }, 1000);
            });
        });
    }
};