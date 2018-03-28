<template>
	<div v-loading="maskLoading">
		<template v-if="isValidLink && !isSubmitted">
			<section v-show="!isCardVisible">
				<mt-header title="考试中" fixed>
					<div slot="left"><img src="/static/images/clock.png" width="15"> <span>{{remainTime(endTime)}}</span></div>
					<span @click="finishedPaper" slot="right" v-if="isLoaded">交卷</span>
				</mt-header>
				<template >
					<div class="main">
						<div class="main-title black clearfix">
							<div class="pull-left">
								<span>{{currentTypeName}}</span>
								<span class="order">（<a class="larger">{{currentTypeNum}}</a>/{{currentTypeTotal}}）</span>
							</div>
							<div class="pull-right">
								<mt-button type="primary" @click="showQuestionCard" class="plane" :disabled="!isLoaded">题卡</mt-button>
							</div>
						</div>
						<div class="content" style="min-height: 300px;" v-if="isLoaded" v-loading="!isLoaded">
							<div class="el-question">
								<div class="el-question-title has-order">
									<span class="el-question-index">{{current + 1}}.</span>
									<div v-html="problem.content"></div>
								</div>
								<div v-if="problem.questionTypeId === 2" class="el-question-options">
									<el-checkbox-group v-model="problem.myAnswer">
										<el-checkbox class="radio-short" label="A">
											<span class="order">A</span>
											<div class="radio-short-div" v-html="problem.optiona"></div>
										</el-checkbox>
										<el-checkbox class="radio-short" label="B">
											<span class="order">B</span>
											<div class="radio-short-div" v-html="problem.optionb"></div>
										</el-checkbox>
										<el-checkbox class="radio-short" label="C">
											<span class="order">C</span>
											<div class="radio-short-div" v-html="problem.optionc"></div>
										</el-checkbox>
										<el-checkbox class="radio-short" label="D">
											<span class="order">D</span>
											<div class="radio-short-div" v-html="problem.optiond"></div>
										</el-checkbox>
									</el-checkbox-group>
								</div>
								<div v-else-if="problem.questionTypeId === 3" class="el-question-options">
									<el-radio-group v-model="problem.myAnswer">
										<el-radio class="radio-short" label="A">
											<span class="order">A</span>
											<div class="radio-short-div" v-html="problem.optiona"></div>
										</el-radio>
										<el-radio class="radio-short" label="B">
											<span class="order">B</span>
											<div class="radio-short-div" v-html="problem.optionb"></div>
										</el-radio>
									</el-radio-group>
								</div>
								<div v-else class="el-question-options">
									<el-radio-group v-model="problem.myAnswer">
										<el-radio class="radio-short" label="A">
											<span class="order">A</span>
											<div class="radio-short-div" v-html="problem.optiona"></div>
										</el-radio>
										<el-radio class="radio-short" label="B">
											<span class="order">B</span>
											<div class="radio-short-div" v-html="problem.optionb"></div>
										</el-radio>
										<el-radio v-if="problem.optionc" class="radio-short" label="C">
											<span class="order">C</span>
											<div class="radio-short-div" v-html="problem.optionc"></div>
										</el-radio>
										<el-radio v-if="problem.optiond" class="radio-short" label="D">
											<span class="order">D</span>
											<div class="radio-short-div" v-html="problem.optiond"></div>
										</el-radio>
									</el-radio-group>
								</div>
							</div>
						</div>
					</div>
					<div class="footer-indicator fixed">
						<el-row>
							<el-col :span="12"><el-button class="plane" @click="prevProblem" :disabled="current === 0">上一题</el-button></el-col>
							<el-col :span="12"><el-button class="plane" @click="nextProblem" :disabled="current === totalCount - 1">下一题</el-button></el-col>
						</el-row>
					</div>
				</template>
			</section>
			<question-card :list="cardList" v-if="isLoaded" v-show="isCardVisible" @close="hideQuestionCard" @jump="jumpProblem"></question-card>
		</template>
		<template v-else>
			<my-feedback :options="feedbackOptions"></my-feedback>
		</template>
	</div>
</template>
<script>
	// 注意题目需要按“单选”、“多选”、“判断”、“选做”顺序
	import FeedBack from '../common/FeedBack'
	import { getTrainProblemList, submitTrainPaper, submitOneTrainProblem } from '../../api/api';
	import Card from './Card.vue'
	export default {
        props: {
            id: {
                required: true
            }
        },
        components: {
            questionCard: Card,
            myFeedback: FeedBack
        },
        data() {
            return {
                isValidLink: true,
                fullPath: '',
                timeClock: '',
                startTime: '',
                endTime: '',
                nowDate: new Date(),
                mustCount: 0,

                current: 0,
                currentType: 'radio',
                currentTypeNum: 1,//当前类型题数
                currentTypeName: '单选题',//当前类型
                currentTypeTotal: 0,//当前类型题数
                totalCount: 0,
                stu_paper: {},//学生试卷
                paperId: 0,//学生试卷id
                radioList: [],
                checkList: [],
                judgeList: [],
                optionalList: [],

                problemList: [],//整合在一起的试题

                cardList: {},//传给题卡的参数

                feedbackOptions: {
                    withinPath: '',
                    type: 'fail',
                    title: '链接无效',
                    msg: '返回到考试',
                    nextLink: '/preview',
                    buttonText: '返回到考试'
                },
                isLoaded: false,
                maskLoading: false,
                isSubmitted: false,
                isCardVisible: false
            }
        },
        computed: {
            problem() {//当前试题
                var currentP = {};
                var radioCount = this.radioList.length;
                var checkCount = this.checkList.length;
                var judgeCount = this.judgeList.length;
                var optionalCount = this.optionalList.length;
                if (this.current < radioCount) {
                    this.currentType = 'radio';
                    this.currentTypeName = '单选题';
                    this.currentTypeNum = this.current + 1;
                    this.currentTypeTotal = radioCount;
                    currentP = this.radioList[this.current];
                } else if (this.current < radioCount + checkCount) {
                    this.currentType = 'check';
                    this.currentTypeName = '多选题';
                    this.currentTypeNum = this.current - radioCount + 1;
                    this.currentTypeTotal = checkCount;
                    currentP = this.checkList[this.current - radioCount];
                } else if (this.current < radioCount + checkCount + judgeCount) {
                    this.currentType = 'judge';
                    this.currentTypeName = '判断题';
                    this.currentTypeNum = this.current - radioCount - checkCount + 1;
                    this.currentTypeTotal = judgeCount;
                    currentP = this.judgeList[this.current - radioCount - checkCount];
                } else {
                    this.currentType = 'optional';
                    this.currentTypeName = '选做题';
                    this.currentTypeNum = this.current - radioCount - checkCount - judgeCount + 1;
                    this.currentTypeTotal = optionalCount;
                    currentP = this.optionalList[this.current - radioCount - checkCount - judgeCount];
                }
                if (currentP && !currentP.myAnswer) {
                    if (currentP.questionTypeId === 2) {
                        this.$set(currentP, 'myAnswer', []);
                    } else {
                        this.$set(currentP, 'myAnswer', '');
                    }
                }
                return currentP;
            }
        },
        methods: {
            init() {
                var item = JSON.parse(window.localStorage.getItem('testItem'));
                this.fullPath = this.$route.fullPath;
                this.feedbackOptions.withinPath = this.fullPath;
                if (item && item.id && item.id == this.id) {
                    this.isValidLink = true;
                    this.startTime = item.startTime;
                    this.endTime = item.endTime;
                    if (this.getRemainSeconds(this.startTime) > 0 || this.getRemainSeconds(this.endTime) < 0) {//无效链接
                        this.isValidLink = false;
                    } else {//正常考试
                        this.timeClockRun();
                        this.getProblemList();
                    }
                } else {//无效链接
                    this.isValidLink = false;
                }
            },
            getProblemList() {
                //to do
                var params = {
                    examId: this.id
                };
                getTrainProblemList(params).then(res => {
                    res = res.data;
                    this.stu_paper = res.paper;
                    this.paperId = res.paper.id;//设置试卷Id
                    this.radioList = res.radio || [];
                    this.checkList = res.check || [];
                    this.judgeList = res.judge || [];
                    this.optionalList = res.optional || [];
                    this.mustCount = res.paper.mustCount;//选做题必答
                    this.problemList = [].concat(this.radioList, this.checkList, this.judgeList, this.optionalList);
                    this.totalCount = this.problemList.length;
                    this.cardList = res;
                    this.isLoaded = true;
                    this.current = res.current;//设置序号

                    //遍历设置多选题的已答的选项 变成数组[]
                    _.forEach(this.problemList, problem => {
                        if (problem.questionTypeId === 2) {
                            if (problem.myAnswer != null) {
                                var array = problem.myAnswer.split(',');
                                this.$set(problem, 'myAnswer', array);
                            }
                        }
                    });
                    //console.log('this.problemList',this.problemList);

                });
            },
            finishedPaper() {//检测并交卷
                if (this.checkPaper()) {//回答完毕
                    this.$messageBox({
                        title: '',
                        message: '确定交卷吗？',
                        confirmButtonText: '继续答题',
                        showCancelButton: true,
                        cancelButtonText: '我要交卷'
                    }).then(res => {
                        if (res == 'cancel') {//我要交卷
                            this.submitPaper();
                        }
                    });
                } else {
                    this.$messageBox({
                        title: '',
                        message: '您的题还未答完！',
                        confirmButtonText: '继续答题',
                        showCancelButton: true,
                        cancelButtonText: '我要交卷'
                    }).then(res => {
                        if (res == 'cancel') {//我要交卷
                            this.submitPaper();
                        }
                    });
                }
            },
            submitPaper() {//直接交卷
                this.maskLoading = true;
                var list = [];
                //计算答题百分比 已作答题数/总题数 选做题计选做题的必做题数
                var answer_num = 0;
                var opt_answer_num = 0;
                var percent = 0;
                _.forEach(this.problemList, problem => {
                    if (!problem.myAnswer) {//未答的题设置为空
                        if (problem.questionTypeId === 2) {
                            this.$set(problem, 'myAnswer', '');
                        } else {
                            this.$set(problem, 'myAnswer', '');
                        }
                    } else {
                        if (problem.questionTypeId === 2) {
                            problem.myAnswer.sort();//答案可能"C,D"或"D,C",按照从A-Z排序
                            this.$set(problem, 'myAnswer', problem.myAnswer.join(','));//多选数组变成1,2
                        }
                    }
                    if (problem.isOptional) {
                        if (problem.myAnswer) {
                            opt_answer_num++;
                        }
                    }
                    else {
                        if (problem.myAnswer) {
                            answer_num++;
                        }
                    }
                    var question = {
                        questionId: problem.id,
                        answer: problem.myAnswer
                    };
                    list.push(question);
                });

                var radiocount = this.stu_paper.radioCount;
                var checkcount = this.stu_paper.checkCount;
                var judgecount = this.stu_paper.judgeCount;
                var optionalcount = this.stu_paper.optionalCount;
                var mustcount = this.stu_paper.mustCount;
                var totalCount = radiocount + checkcount + judgecount + mustcount;
                opt_answer_num = opt_answer_num > mustcount ? mustcount : opt_answer_num;
                answer_num = answer_num + opt_answer_num;
                percent = answer_num / totalCount;
                percent = (answer_num * 100) / totalCount;
                percent = percent.toFixed(2);//保留2位小数
                var params = {
                    examId: this.id,
                    paperId: this.paperId,//试卷id
                    percent: percent,//完成百分比
                    currentQuestionId: this.current,//用序号代替
                    questionList: list //防止中途数据没有保存，最后全部再重新保存答案
                };
                params = {'submitData': JSON.stringify(params)};
                //console.log('submitExamPaper',params);
                submitTrainPaper(params).then(() => {
                    this.feedbackOptions.type = 'success';
                    this.feedbackOptions.title = '交卷成功！';
                    window.localStorage.removeItem('testItem');
                    this.isSubmitted = true;
                    this.maskLoading = false;
                }).catch((error) => {
                    this.maskLoading = false;
                    this.$toast({
                        message: '提交失败',
                        iconClass: 'fa fa-exclamation-triangle'
                    });
                });

            },
            checkPaper() {//检测是否答完
                var isFinished = true;
                //必做题检测
                _.forEach(this.problemList, (problem, index) => {
                    if (index < this.totalCount - this.optionalList.length) {
                        if (!this.isAnswerred(problem)) {
                            isFinished = false;
                            return false;
                        }
                    } else {
                        return false;
                    }
                });
                if (isFinished) {
                    //选做题
                    var optionalFinishedCount = 0;//选做题已答题个数
                    _.forEach(this.optionalList, problem => {
                        if (this.isAnswerred(problem)) {
                            ++optionalFinishedCount;
                        }
                    });
                    if (optionalFinishedCount < this.mustCount) {
                        isFinished = false;
                    }
                }
                return isFinished;
            },
            isAnswerred(problem) {//试题是否已回答
                var isAnswerred = false;
                if (!problem || !problem.myAnswer) {
                    isAnswerred = false;
                } else {
                    isAnswerred = problem.myAnswer.length > 0;
                }
                return isAnswerred;
            },
            submitCurrentProblem() {//保存当前答案
                if (this.isAnswerred(this.problem)) {

                    //console.log('submitOneProblem',params);
                    //计算答题百分比 已作答题数/总题数 选做题计选做题的必做题数
                    var answer_num = 0;
                    var opt_answer_num = 0;
                    var percent = 0;
                    _.forEach(this.problemList, problem => {
                        if (problem.isOptional) {
                            if (problem.myAnswer) {
                                opt_answer_num++;
                            }
                        } else {
                            if (problem.myAnswer) {
                                answer_num++;
                            }
                        }
                    });
                    var radiocount = this.stu_paper.radioCount;
                    var checkcount = this.stu_paper.checkCount;
                    var judgecount = this.stu_paper.judgeCount;
                    var optionalcount = this.stu_paper.optionalCount;
                    var mustcount = this.stu_paper.mustCount;
                    var totalCount = radiocount + checkcount + judgecount + mustcount;
                    opt_answer_num = opt_answer_num > mustcount ? mustcount : opt_answer_num;
                    answer_num = answer_num + opt_answer_num;
                    percent = (answer_num * 100) / totalCount;
                    percent = percent.toFixed(2);//保留2位小数
                    //console.log('percent',percent);
                    var params = {
                        examId: this.id,//考试id
                        paperId: this.paperId,    //试卷id
                        questionId: this.current,//this.problem.id,  //试题id 用序号代替
                        answer: this.problem.myAnswer, //学生答案
                        percent: percent
                    };
                    //console.log('submitOneProblem',params);
                    submitOneTrainProblem(params).then(res => {
                        if (res.code != 0) {
                            this.alertError(res.msg);
                        }
                    }).catch(error => {
                        console.log('error', error)
                    });
                }
            },
            alertError(msg) {
                this.$toast({
                    message: msg,
                    position: 'middle',
                    duration: 1000
                });
            },
            showQuestionCard() {//显示题卡
                this.isCardVisible = true;
                this.submitCurrentProblem();//保存当前答案
            },
            hideQuestionCard() {//隐藏题卡
                this.isCardVisible = false;
            },
            prevProblem() {//上一题
                if (this.current <= 0) {
                    this.$toast({
                        message: '这已经是第一题。',
                        position: 'middle',
                        duration: 1000
                    });
                } else {
                    --this.current;
                }
            },
            nextProblem() {//下一题
                if (this.current < this.totalCount - 1) {
                    this.submitCurrentProblem();//保存当前答案
                    ++this.current;
                } else {
                    this.$toast({
                        message: '这已经是最后一题。',
                        position: 'middle',
                        duration: 1000
                    });
                }
            },
            jumpProblem(index) {//跳转到某一题
                this.hideQuestionCard();
                if (index >= 0 && index <= this.totalCount - 1) {
                    this.current = index;
                }
            },
            dateParse(dateString) {
                return new Date(dateString);
            },
            getRemainSeconds(dateString) {//获取剩余总秒数
                var thisD = this.dateParse(dateString);
                var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
                return totalSeconds;
            },
            remainTime(dateString) {//倒计时
                var totalSeconds = this.getRemainSeconds(dateString);//剩余总秒数
                if (totalSeconds <= 0) {
                    this.clearClock();//关闭倒计时
                    this.submitPaper();
                    return '交卷中...';
                } else {
                    var hourStr = '0';
                    var minuteStr = '0';
                    var secondStr = '0';
                    var minuteSeconds = 1000 * 60;//一分钟毫秒数
                    var hourSeconds = minuteSeconds * 60;//一小时毫秒数
                    var remainHours = Math.floor(totalSeconds / hourSeconds);//对应剩余小时
                    var remainMinutes = Math.floor(totalSeconds % hourSeconds / minuteSeconds);//对应剩余分钟
                    var remainSeconds = Math.floor(totalSeconds % hourSeconds % minuteSeconds / 1000);//对应剩余秒
                    if (remainHours < 10) {//剩余小时小于10小时
                        hourStr += remainHours;
                    } else {
                        hourStr = remainHours + '';
                    }
                    if (remainMinutes < 10) {//剩余分钟小于10分钟
                        minuteStr += remainMinutes;
                    } else {
                        minuteStr = remainMinutes + '';
                    }
                    if (remainSeconds < 10) {//剩余秒小于10秒
                        secondStr += remainSeconds;
                    } else {
                        secondStr = remainSeconds + '';
                    }
                    return hourStr + ':' + minuteStr + ':' + secondStr;
                }
            },
            timeClockRun() {
                this.timeClock = setInterval(() => {
                    if (this.$route.fullPath != this.fullPath) {
                        this.clearClock();
                    } else {
                        this.nowDate = new Date();
                    }
                }, 1000);
            },
            clearClock() {
                if (this.timeClock) {
                    clearInterval(this.timeClock);
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.main{
		.main-title{
			.order{
				letter-spacing: 1px;
			}
			.larger{
				font-size: 14px;
				color: $color-primary;
			}
			.plane{
				margin-right: -10px;
			}
		}
	}
</style>