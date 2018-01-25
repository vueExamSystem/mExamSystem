import axios from 'axios';
import instance  from '../axios';

let base = '';

//请求登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

//用户信息
export const getUserInfo = params => { return instance.post(`${base}/user/info`, params).then(res => res.data); };

//考试列表
export const getExamList = params => { return instance.post(`${base}/exam/list`, { params: params }).then(res => res.data); };

//获取试卷题目列表
export const getPaperProblemList = params => { return instance.post(`${base}/exam/problem/list`, params ); };

//考试交卷
export const submitExamPaper = params => { return instance.post(`${base}/exam/submit`, { params: params }).then(res => res.data); };

//测验列表
export const getTestList = params => { return instance.post(`${base}/test/list`, { params: params }).then(res => res.data); };

//获取测验题目列表
export const getTestProblemList = params => { return instance.post(`${base}/test/problem/list`, params ); };

//测验交卷
export const submitTestPaper = params => { return instance.post(`${base}/test/submit`, { params: params }).then(res => res.data); };

//获取预习习题列表
export const getExerciseList = params => { return instance.post(`${base}/preview/list/exercise`, { params: params }).then(res => res.data); };

//获取预习资料列表
export const getDocList = params => { return instance.post(`${base}/preview/list/doc`, { params: params }).then(res => res.data); };

//搜索列表
export const searchList = params => { return instance.post(`${base}/search/list`, { params: params }).then(res => res.data); };

export const getUserListPage = params => { return instance.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return instance.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return instance.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return instance.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return instance.get(`${base}/user/add`, { params: params }); };

export const testData = params => { return instance.get('http://api.github.com', { params: params }); };

// 测试api
export const testApi = params => { return instance.post(`${base}/test`, params ); };

/*
* 试题 start
* */
//
export const getQueList = params => { return instance.get(`${base}/question/list`, params ); };

// 科目列表
export const getSubjectList = params => { return instance.get(`${base}/subject/list`, params ); };

// tag
export const getTagList = params => { return instance.get(`${base}/tag/list`, params ); };

// course
export const getCourseList = params => { return instance.get(`${base}/course/list`, params ); };

// chapter
export const getChapterList = params => { return instance.get(`${base}/chapter/list`, params ); };

// department
export const getDepartmentList = params => { return instance.get(`${base}/department/list`, params ); };

/*
* 试卷 start
* */
export const getPaperList = params => { return instance.post(`${base}/paper/list`, params ); };
//试卷详情
export const getPaperDetail = params => { return instance.post(`${base}/paper/detail`, params ); };
