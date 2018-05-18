import instance  from './instance';
import qs from 'qs'
let base="aps/api/stu";
// let base="api/stu";
//请求登录
export const requestLogin = params => { return instance.post(`${base}/login`, qs.stringify(params)).then(res => res.data); };

export const getServerTime = params => { return instance.get(`${base}/getServerTime`, {params:params}).then(res => res.data); };
//用户信息
export const getUserInfo = params => { return instance.post(`${base}/user/info`, qs.stringify(params)).then(res => res.data); };

//修改用户密码
export const updatePassword = params => { return instance.post(`${base}/user/editpwd`, qs.stringify(params)).then(res => res.data); };

//考试列表
export const getExamList = params => { return instance.post(`${base}/exam/list`, qs.stringify(params)).then(res => res.data); };

//获取试卷题目列表
export const getPaperProblemList = params => { return instance.post(`${base}/exam/problem/list`, qs.stringify(params) ).then(res => res.data); };

//提交某道题目学生的答案
export const submitOneProblem = params => { return instance.post(`${base}/exam/submit/one`, qs.stringify(params)).then(res => res.data); };

//考试交卷
export const submitExamPaper = params => { return instance.post(`${base}/exam/submit`, qs.stringify(params)).then(res => res.data); };


//测验列表
export const getTestList = params => { return instance.post(`${base}/quiz/list`, qs.stringify(params)).then(res => res.data); };

//获取测验题目列表
export const getTestProblemList = params => { return instance.post(`${base}/quiz/problem/list`, qs.stringify(params)).then(res => res.data); };

//提交某道题目学生的答案
export const submitOneTestProblem = params => { return instance.post(`${base}/quiz/submit/one`, qs.stringify(params)).then(res => res.data); };

//测验交卷
export const submitTestPaper = params => { return instance.post(`${base}/quiz/submit`, qs.stringify(params)).then(res => res.data); };


//预习列表
export const getTrainList = params => { return instance.post(`${base}/train/list`, qs.stringify(params)).then(res => res.data); };

//获取预习题目列表
export const getTrainProblemList = params => { return instance.post(`${base}/train/problem/list`, qs.stringify(params)).then(res => res.data); };

//提交某道题目学生的答案
export const submitOneTrainProblem = params => { return instance.post(`${base}/train/submit/one`, qs.stringify(params)).then(res => res.data); };

//预习交卷
export const submitTrainPaper = params => { return instance.post(`${base}/train/submit`, qs.stringify(params)).then(res => res.data); };



//获取预习习题列表
//export const getExerciseList = params => { return instance.post(`${base}/preview/list/exercise`, qs.stringify(params)).then(res => res.data); };

//获取预习资料列表
export const getDocList = params => { return instance.post(`${base}/train/list/doc`,qs.stringify(params)).then(res => res.data); };

//获取预习资料内容
export const getDocContent = params => { return instance.post(`${base}/preview/doc`, qs.stringify(params)).then(res => res.data); };

//获取用户所有课程
export const getUserCourse = params => { return instance.post(`${base}/user/course`, qs.stringify(params)).then(res => res.data); };

//获取学期和课程信息
export const getTermAndCourseList = params => { return instance.post(`${base}/score/courses`, qs.stringify(params)).then(res => res.data); };

//通过学期和课程获取成绩综合表
export const getScoresByTermCourse = params => { return instance.post(`${base}/score/stat`, qs.stringify(params)).then(res => res.data); };

//获取某学期的课程信息
export const getCourseListByTerm = params => { return instance.post(`${base}/score/term/courses`, qs.stringify(params)).then(res => res.data); };

//获取考试成绩列表
export const getExamScoreList = params => { return instance.post(`${base}/score/exam`, qs.stringify(params)).then(res => res.data); };

//获取测验成绩列表
export const getTestScoreList = params => { return instance.post(`${base}/score/test`, qs.stringify(params)).then(res => res.data); };

//获取练习成绩列表
export const getExerciseScoreList = params => { return instance.post(`${base}/score/exercise`, qs.stringify(params)).then(res => res.data); };

//获取答题结果详情列表
export const getAnalysisList = params => { return instance.post(`${base}/score/analysis`, qs.stringify(params)).then(res => res.data); };

//搜索列表
export const searchList = params => { return instance.post(`${base}/search/list`, qs.stringify(params)).then(res => res.data); };
