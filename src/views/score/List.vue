<template>
	<div>
		<section v-show="!isAnalysisShow">
			<header class="mint-header is-fixed">
				<div class="mint-header-button is-left">
					<button @click="back" class="mint-button mint-button--default mint-button--normal">
						<span class="mint-button-icon">
							<i class="mintui mintui-back"></i>
						</span> 
						<label class="mint-button-text">返回</label>
					</button>
				</div>
				<div style="position:absolute;width:160px;left:50%;margin-left:-80px;">
					<el-select @change="courseChange" class="el-form-select" v-model="courseValue" placeholder="课程">
					    <el-option :loading="courseLoading" 
					      v-for="item in courseOptions"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</div>
			</header>
			<div class="main">
				<el-tabs id="scoreTab" class="bg-light-blue little" type="card" v-model="activeName">
				    <el-tab-pane label="考试" name="examScore">
						<div class="content" v-loading="examLoading">
							<ul class="section-list score-list">
								<li v-for="(exam,index) in examScoreList" :class="scoreLevel(exam.ranking)">
									<p>{{exam.name}}</p>
									<div>
										<h3>{{exam.score}}分</h3>
										<mt-button class="pull-right" type="primary" @click="showAnalysis(exam)">答题详情</mt-button>
									</div>
								</li>
							</ul>
						</div>
				    </el-tab-pane>
				    <el-tab-pane label="测验" name="testScore">
						<div class="content" v-loading="testLoading">
							<ul class="section-list score-list">
								<li v-for="(test,index) in testScoreList" :class="scoreLevel(test.ranking)">
									<p>{{test.name}}</p>
									<div>
										<h3>{{test.score}}分</h3>
										<mt-button class="pull-right" type="primary" @click="showAnalysis(test)">答题详情</mt-button>
									</div>
								</li>
							</ul>
						</div>
				    </el-tab-pane>
				    <el-tab-pane label="练习" name="exerciseScore">
						<div class="content" v-loading="exerciseLoading">
							<ul class="section-list score-list">
								<li v-for="(exercise,index) in exerciseScoreList" :class="scoreLevel(exercise.ranking)">
									<p>{{exercise.name}}</p>
									<div>
										<h3>{{exercise.score}}分</h3>
										<mt-button class="pull-right" type="primary" @click="showAnalysis(exercise)">答题详情</mt-button>
									</div>
								</li>
							</ul>
						</div>
				    </el-tab-pane>
			    </el-tabs>
		    </div>
		</section>
		<section v-if="isAnalysisShow">
			<answer-analysis :id="analysisId" :name="analysisName" @close="hideAnalysis"></answer-analysis>
		</section>
	</div>
</template>
<script>
	import { getCourseListByTerm, getExamScoreList, getTestScoreList, getExerciseScoreList } from '../../api/api';
	import Analysis from './Analysis.vue';
	export default {
		props:{
			term: {
				required: true
			}
		},
		components: {
			answerAnalysis: Analysis
		},
		data(){
			return {
				activeName: 'examScore',
				courseValue: '',
				courseLoading: true,
				courseOptions: [],//课程列表
				examScoreList: [],//考试成绩列表
				examLoading: true,
				testScoreList: [],//测验成绩列表
				testLoading: true,
				exerciseScoreList: [],//练习成绩列表
				exerciseLoading: true,
				isAnalysisShow: false,
				analysisId: '',
				analysisName: ''
			}
		},
		methods:{
			init(){
				var courseValue = window.localStorage.getItem('courseValue');
				var courseList = window.localStorage.getItem('courseList');
				if(courseValue && courseList){
					this.courseValue = courseValue;
					this.courseOptions = JSON.parse(courseList);
					this.courseLoading = false;
				}else{
					//获取学期课程数据
					var params = {
						term: this.term
					};
					getCourseListByTerm(params).then(res => {
						this.courseOptions = res.data;
						this.courseValue = this.courseOptions[0].id;
						this.courseLoading = false;
						this.getThoseList();
					});
				}
				this.getThoseList();
				
			},
			getThoseList(){//获取分数列表数据
				var params = {
					term: this.term,//学期
					course: this.courseValue//课程
				};
				//获取考试成绩列表
				this.examLoading = true;
				getExamScoreList(params).then(res=>{
					this.examScoreList = res.data;
					this.examLoading = false;
				});

				//获取考试成绩列表
				this.testLoading = true;
				getTestScoreList(params).then(res=>{
					this.testScoreList = res.data;
					this.testLoading = false;
				});

				//获取考试成绩列表
				this.exerciseLoading = true;
				getExerciseScoreList(params).then(res=>{
					this.exerciseScoreList = res.data;
					this.exerciseLoading = false;
				});
			},
			courseChange(){//课程变更
				this.getThoseList();
			},
			scoreLevel(ranking){//分数等级
				var rankClass = '';
				switch(ranking){
					case '1'://优秀
						rankClass = 'score-best';
						break;
					case '2'://良好
						rankClass = 'score-better';
						break;
					case '3'://中等s
						rankClass = 'score-normal';
						break;
					case '4'://不及格
						rankClass = 'score-fail';
						break;
					default: break;
				}
				return rankClass;
			},
			showAnalysis(item){
				this.analysisId = item.id;
				this.analysisName = item.name;
				window.localStorage.setItem('scoreItem',JSON.stringify(item));
				this.isAnalysisShow = true;
			},
			hideAnalysis(){
				this.isAnalysisShow = false;
				window.localStorage.removeItem('scoreItem');
				this.analysisId = '';
				this.analysisName = '';
			},
			back(){
				this.$router.push({path: '/score'});
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.content{
		padding: 20px 10px;

	}
</style>
<style type="text/css">
	#scoreTab .el-tabs__header{
		box-shadow: none!important;
	}
</style>