import axios from 'axios';
import instance  from '../axios';

let base = 'http://localhost:8081/api';

//请求登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

//用户信息
export const getUserInfo = params => { return instance.post(`${base}/user/info`, params).then(res => res.data); };

//修改用户密码
export const updatePassword = params => { return instance.post(`${base}/user/editpwd`, params).then(res => res.data); };

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

//获取预习资料内容
export const getDocContent = params => { return instance.post(`${base}/preview/doc`, { params: params }).then(res => res.data); };

//获取用户所有课程
export const getUserCourse = params => { return instance.post(`${base}/user/course`, { params: params }).then(res => res.data); };

//获取学期和课程信息
export const getTermAndCourseList = params => { return instance.post(`${base}/score/courses`, { params: params }).then(res => res.data); };

//通过学期和课程获取成绩综合表
export const getScoresByTermCourse = params => { return instance.post(`${base}/score/statistics`, { params: params }).then(res => res.data); };

//获取某学期的课程信息
export const getCourseListByTerm = params => { return instance.post(`${base}/score/term/courses`, { params: params }).then(res => res.data); };

//获取考试成绩列表
export const getExamScoreList = params => { return instance.post(`${base}/score/exam`, { params: params }).then(res => res.data); };

//获取测验成绩列表
export const getTestScoreList = params => { return instance.post(`${base}/score/test`, { params: params }).then(res => res.data); };

//获取练习成绩列表
export const getExerciseScoreList = params => { return instance.post(`${base}/score/exercise`, { params: params }).then(res => res.data); };

//获取答题结果详情列表
export const getAnalysisList = params => { return instance.post(`${base}/score/analysis`, { params: params }).then(res => res.data); };

//搜索列表
export const searchList = params => { return instance.post(`${base}/search/list`, { params: params }).then(res => res.data); };
