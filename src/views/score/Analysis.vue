<template>
	<div>
		<template v-if="isValidLink">
			<section v-show="!isCardVisible">
				<mt-header :title="name" fixed>
				    <mt-button slot="left" icon="back" @click="back">返回</mt-button>
				</mt-header>
				<template>
					<div class="main">
						<div class="main-title black clearfix">
							<div class="pull-left">
								<span>{{currentTypeName}}</span>
								<span class="order">（<a class="larger">{{currentTypeNum}}</a>/{{currentTypeTotal}}）</span>
								<el-button v-show="isLoaded && isSuccess == ''" size="mini" type="warning" round>未选做</el-button>
								<el-button v-show="isLoaded && isSuccess == '1'" size="mini" type="success" round>正确</el-button>
								<el-button v-show="isLoaded && isSuccess == '0'" size="mini" type="danger" round>错误</el-button>
							</div>
							<div class="pull-right">
								<mt-button type="primary" @click="showQuestionCard" class="plane" :disabled="!isLoaded">题卡</mt-button>
							</div>
						</div>
						<div class="content" style="min-height: 300px;" v-loading="!isLoaded">
							<div class="el-question" v-if="isLoaded" :class="{'el-question-success':isSuccess === '1','el-question-fail':isSuccess === '0'}">
								<div class="el-question-title has-order">
									<span class="el-question-index">{{current + 1}}.</span>
									<div v-html="problem.content"></div>
								</div>
								<div v-if="problem.questionTypeId === 2" class="el-question-options mask">
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
								<div v-else-if="problem.questionTypeId === 3" class="el-question-options mask">
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
								<div v-else class="el-question-options mask">
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
								<div class="el-question-info">
									<div class="el-info">
										<div class="el-label el-label-light-green">正确答案</div>
										<div class="el-info-content">{{problem.answer.toString()}}</div>
									</div>
									<div class="el-info">
										<div class="el-label el-label-blue">解析</div>
										<div class="el-info-content">{{problem.analysis}}</div>
									</div>
									<div class="el-info">
										<div class="el-label el-label-green">考点</div>
										<div class="el-info-content">{{problem.keynote}}</div>
									</div>
									<div class="el-info">
										<div class="el-label el-label-purple">添加人</div>
										<div class="el-info-content">{{problem.creator}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="footer-indicator fixed" v-show="isLoaded">
						<el-row>
							<el-col :span="12"><el-button class="plane" @click="prevProblem" :disabled="current === 0">上一题</el-button></el-col>
							<el-col :span="12"><el-button class="plane" @click="nextProblem" :disabled="current === problemList.length - 1">下一题</el-button></el-col>
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
	// 注意题目数据需要按“单选”、“多选”、“判断”、“选做”顺序，否则需要前端重改！！
	import FeedBack from '../common/FeedBack'
	import { getAnalysisList } from '../../api/api';
	import Card from './Card.vue'
	export default {
        props: {
            id: {
                required: true
            },
            name: {
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
                    nextLink: '/exam',
                    buttonText: '返回到考试'
                },
                isLoaded: false,
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
                return currentP;
            },
            isSuccess() {
                if (!this.problem || JSON.stringify(this.problem) == '{}') {
                    return '-1';
                } else {
                    if (this.problem.answer == this.problem.myAnswer.toString()) {
                        return '1';
                    } else {
                        if (this.problem.isOptional == '1' && this.problem.myAnswer.length == 0) {//选做题未做
                            return '';
                        } else {
                            return '0';
                        }
                    }
                }
            }
        },
        methods: {
            init() {
                var item = JSON.parse(window.localStorage.getItem('scoreItem'));
                this.fullPath = this.$route.fullPath;
                this.feedbackOptions.withinPath = this.fullPath;
                if (item && item.id && item.id == this.id) {
                    this.isValidLink = true;
                    this.optionNeed = item.optionNeed;//选做题必答
                    this.getList();
                } else {//无效链接
                    this.isValidLink = false;
                }
            },
            getList() {
                //to do
                var params = {
                    examId: this.id
                };
                console.log('getAnalysisList', params);
                getAnalysisList(params).then(res => {
                    res = res.data;
                    console.log('res', res);
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
                    this.current = res.current || 0;//设置序号

                    //遍历设置多选题的已答的选项 变成数组[]
                    _.forEach(this.problemList, problem => {
                        if (!problem.myAnswer) {
                            if (problem.questionTypeId === 2) {
                                this.$set(problem, 'myAnswer', []);
                            } else {
                                this.$set(problem, 'myAnswer', '');
                            }
                        } else {
                            if (problem.questionTypeId === 2) {
                                var array = problem.myAnswer.split(',');
                                this.$set(problem, 'myAnswer', array);
                            }
                        }
                    });
                    this.isLoaded = true;
                });
            },
            showQuestionCard() {//显示题卡
                this.isCardVisible = true;
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
                if (this.current < this.problemList.length - 1) {
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
                if (index >= 0 && index <= this.problemList.length) {
                    this.current = index;
                }
            },
            back() {
                this.$emit('close')
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
			.el-button--mini{
				margin-left: 5px;
				padding: 4px 8px;
				font-size: 10px;
			}
		}
	}
</style>