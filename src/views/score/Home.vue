<template>
	<section>
		<header class="mint-header is-fixed">
			<div class="mint-header-title">
				<el-select @change="termChange" :loading="termLoading" class="el-form-select" v-model="termValue" placeholder="学期">
				    <el-option
				      v-for="item in termOptions"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				</el-select>
			</div>
		</header>
		<div class="main">
			<div class="content" v-loading="maskLoading">
				<div class="display-box">
					<table class="score-info" :class="scoreLevel()">
						<tr>
							<td width="28%" class="score-grade">
								<span>总体</span>
								<h3>{{avgScore}}</h3>
							</td>
							<td width="32%" class="score-chapter">
								<div class="img-grade"></div>
							</td>
							<td width="40%" class="score-detail">
								<mt-button type="primary" @click="showDetail">详细成绩</mt-button>
							</td>
						</tr>
					</table>
				</div>
				<section class="content-title" style="margin-top: 20px;">
					<el-select @change="courseChange" class="el-head-select" v-model="courseValue" placeholder="课程">
					    <el-option :loading="courseLoading" 
					      v-for="item in courseOptions"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					</el-select>
				</section>
				<div class="score-statistics" v-loading="detailLoading">
					<div v-if="isChartDraw">
						<div id="echart">
							<score-echart :data="echartData"></score-echart>
						</div>
						<div class="display-box" style="margin-top: 20px;">
							<ul>
								<li><span>{{courseName}}</span></li>
								<li>最高分/最低分：<span> {{max}} / {{min}}</span></li>
								<li>平均分： <span>{{avg}}</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import { getTermAndCourseList, getScoresByTermCourse } from '../../api/api'
	import _ from 'lodash';
	import Echarts from './Echarts.vue';
	export default {
		components:{
			scoreEchart: Echarts
		},
		data(){
			return {
				maskLoading: true,
		        avgScore: '',//总分
		        ranking: '',//等级
				termValue: '',//选中的学期id
				termOptions: [],//学期数据
				termLoading: true,
		        courseValue: '',//选中的课程id
		        courseOptions: [],//课程数据
		        courseLoading: true,
		        detailLoading: false,
		        isChartDraw: false,//渲染图表区域
		        min: '',//最低分
		        max: '',//最高分
		        avg: '',//平均分
		        echartData: [],//图表数据
		        courseName: ''//课程
			}
		},
		methods:{
			init(){
				//获取学期课程数据
				getTermAndCourseList().then(res => {
					this.termOptions = res.data;
					this.termValue = this.termOptions[0].id;
					//this.avgScore = this.termOptions[0].avgScore;
					//this.ranking = this.termOptions[0].ranking;
					this.termLoading = false;
					this.courseOptions = this.termOptions[0].courseList;
					this.courseValue = this.courseOptions[0].id;
					this.courseLoading = false;
					this.getScoresInfo().then(code=>{
						if(code === 0){
							this.maskLoading = false;
						}
					});
				});
			},
			scoreLevel(){//分数等级
				var rankClass = '';
				switch(this.ranking){
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
			termChange(){
				this.maskLoading = true;
				this.courseLoading = true;
				var curentTermInfo = _.filter(this.termOptions, {id: this.termValue})[0];
				//this.avgScore = curentTermInfo.avgScore;
				//this.ranking = curentTermInfo.ranking;
				this.courseOptions = curentTermInfo.courseList;
				this.courseValue = this.courseOptions[0].id;
				this.courseLoading = false;
				this.getScoresInfo().then(code=>{
					if(code === 0){
						this.maskLoading = false;
					}
				});
			},
			getScoresInfo(){//获取成绩综合信息
				this.isChartDraw = false;
				var params = {
					termId: this.termValue,
					courseId: this.courseValue
				};
				console.log('getScoresByTermCourse',params);
				return new Promise((resolve, reject) => {
					getScoresByTermCourse(params).then(res => {
						if(res.code === 0){
							var data = res.data;
							this.courseName = data.course;
							this.min = data.min;
							this.max = data.max;
							this.avg = data.avg;
							this.avgScore = data.avg;
							this.ranking=data.rank;
							this.echartData = data.statistics.map(score => {
								return {
									value: score.count,
									name: score.flag
								}
							});
							this.isChartDraw = true;
							resolve(0);
						}else{
							resolve(1);
						}
					}).catch(error=>{
						reject(error);
					});
				});
			},
			courseChange(){
				this.detailLoading = true;
				this.getScoresInfo().then(code=>{
					if(code === 0){
						this.detailLoading = false;
					}
				});
			},
			showDetail(){//进入详情列表
				window.localStorage.setItem('courseList',JSON.stringify(this.courseOptions));
				window.localStorage.setItem('courseValue',this.courseValue);
				this.$router.push({ path: `/score/list/${this.termValue}`});
			}
		},
		mounted() {
			this.init();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.score-statistics{
		padding: 20px 40px;
		min-height: 200px;
	}
</style>