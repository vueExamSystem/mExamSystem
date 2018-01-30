<template>
	<section>
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
			<el-tabs class="bg-light-blue little" type="card" v-model="activeName">
			    <el-tab-pane label="考试" name="examScore">
					<div class="content" v-loading="examLoading">
						<ul class="section-list">
							<li v-for="(exam,index) in examScoreList">
								<p>{{exam.name}}</p>
								<div>
									<h3>{{exam.score}}</h3>
									<mt-button class="pull-right" type="primary" @click="examDetail(exam.id)">答题详情</mt-button>
								</div>
							</li>
						</ul>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="测验" name="testScore">
					<div class="content" v-loading="testLoading">
						<ul class="section-list">
							<li v-for="(test,index) in testScoreList">
								<p>{{test.name}}</p>
								<div>
									<h3>{{test.score}}</h3>
									<mt-button class="pull-right" type="primary" @click="testDetail(test.id)">答题详情</mt-button>
								</div>
							</li>
						</ul>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="练习" name="exerciseScore">
					<div class="content" v-loading="exerciseLoading">
						<ul class="section-list">
							<li v-for="(exercise,index) in exerciseScoreList">
								<p>{{exercise.name}}</p>
								<div>
									<h3>{{exercise.score}}</h3>
									<mt-button class="pull-right" type="primary" @click="exerciseDetail(exercise.id)">答题详情</mt-button>
								</div>
							</li>
						</ul>
					</div>
			    </el-tab-pane>
		    </el-tabs>
	    </div>
	</section>
</template>
<script>
	import { getTermAndCourseList, getExamScoreList, getTestScoreList, getExerciseScoreList } from '../../api/api'
	export default {
		props:{
			term: {
				required: true
			}
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
				exerciseLoading: true
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
					getTermAndCourseList().then(res => {
						//res data
						//...
					});
				}
				
				var params = {
					term: this.term,
					course: this.courseValue
				};
				console.log('params',params)

				//获取考试成绩列表
				getExamScoreList(params).then(res=>{
					this.examScoreList = res.data;
					this.examLoading = false;
				});

				//获取考试成绩列表
				getTestScoreList(params).then(res=>{
					this.testScoreList = res.data;
					this.testLoading = false;
				});

				//获取考试成绩列表
				getExerciseScoreList(params).then(res=>{
					this.exerciseScoreList = res.data;
					this.exerciseLoading = false;
				});
			},
			courseChange(){},
			examDetail(id){console.log('examid',id)},
			testDetail(id){console.log('testid',id)},
			exerciseDetail(id){console.log('exerciseid',id)},
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
	
</style>