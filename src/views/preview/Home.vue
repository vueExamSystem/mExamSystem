<template>
	<section>
		<div v-show="!isFilterVisible">
			<el-tabs class="tab-two" type="card" v-model="activeName">
			    <el-tab-pane label="预习习题" name="previewExercises">
			    	<div class="main">
						<p class="main-title">待完成练习</p>
						<div class="content" v-loading="listenLoading">
							<ul class="section-list">
								<li v-for="(exam,index) in list">
									<template v-if="isTodayExam(exam.overTime)">
										<p>{{exam.name}}</p>
										<template v-if="isTimeOut(exam.overTime)">
											<div>
												<div class="time-down">
													<img src="/static/images/clock.png" width="15">
													<span>{{exam.overTime}}截止</span>
												</div>
												<mt-button class="pull-right" type="primary" disabled>进入练习</mt-button>
											</div>
										</template>
										<template v-else>
											<div>
												<div class="time-down">
													<img src="/static/images/clock.png" width="15">
													<span>倒计时：</span>
													<span class="time">{{remainTime(exam.overTime)}}</span>
												</div>
												<mt-button class="pull-right" type="primary" @click="toExam(exam.id,index)">进入练习</mt-button>
											</div>
										</template>
										<div class="flag">
											<span>今日</span>
										</div>
									</template>
									<template v-else>
										<p>{{exam.name}}</p>
										<div>
											<div class="time-down">
												<img src="/static/images/clock.png" width="15">
												<span>{{exam.overTime}}截止</span>
											</div>
											<mt-button class="pull-right" type="primary" @click="toExam(exam.id,index)" :disabled="isTimeOut(exam.overTime)">进入练习</mt-button>
										</div>
									</template>
								</li>
							</ul>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="预习资料" name="previewDocs">
			    	<div class="main">
						<div class="main-title clearfix">
							<div class="pull-left">
								<span>预习资料</span>
							</div>
							<div class="pull-right">
								<mt-button type="primary" @click="showFilter" class="plane" :disabled="!isInitDocList">筛选</mt-button>
							</div>
						</div>
						<div class="content" v-loading="docListenLoading">
							<ul class="section-list">
								<li v-for="(doc,index) in docList">
									<p>{{doc.name}}</p>
									<div>
										<div class="time-down">
											<img src="/static/images/clock.png" width="15">
											<span class="time">{{doc.course}}</span>
										</div>
										<mt-button class="pull-right" type="primary" @click="toPreviewDoc(doc.id,index)">我要预习</mt-button>
									</div>
								</li>
							</ul>
						</div>
					</div>
			    </el-tab-pane>
		    </el-tabs>
	    </div>
	    <div v-show="isFilterVisible">
	    	<tab-filter @close="hideFilter" @confirm="filterCallback"></tab-filter>
	    </div>
	</section>
</template>
<script>
	import { getExerciseList, getDocList } from '../../api/api'
	import TabFilter from '../common/TabFilter.vue'
	export default {
		components:{
			tabFilter: TabFilter
		},
		data(){
			return {
				activeName: 'previewExercises',
				fullPath: '',
				nowDate: new Date(),
				timeClock: '',
				list:[],//练习列表
				docList:[],//资料列表
				docFilter:{},//资料过滤
				isFilterVisible: false,
				listenLoading: true,
				docListenLoading: true,
				isInitDocList: false//是否初始化资料列表
			}
		},
		computed:{
			now(){
				return this.getDateObj(this.nowDate);
			}
		},
		methods:{
			init(){
				this.fullPath = this.$route.fullPath;
				this.getListOfExercise();//获取预习习题列表
				//注意：获取预习资料列表需要先等待筛选条件后再自动执行
			},
			getListOfExercise(){//获取预习习题列表
				this.listenLoading = true;
				this.list = [];
				getExerciseList().then(res => {
					this.list = res.data;
					this.timeClockRun();
					this.listenLoading = false;
				});
			},
			getListOfDoc(){//获取预习资料列表
				this.docListenLoading = true;
				this.docList = [];
				getDocList(this.docFilter).then(res => {
					this.docList = res.data;
					this.docListenLoading = false;
					this.isInitDocList = true;
				});
			},
			filterCallback(filter){//过滤回调
				this.docFilter = filter;
				this.hideFilter();
				this.getListOfDoc();//获取预习资料列表
			},
	        showFilter(){
	        	this.isFilterVisible = true;
	        },
	        hideFilter(){
	        	this.isFilterVisible = false;
	        },
			/**string转换为date
			*dateString:2018/01/09 18:00
			*/
			dateParse(dateString){
				return new Date(dateString);
			},
			remainTime(dateString){//倒计时
				var hourStr = '0';
				var minuteStr = '0';
				var secondStr = '0';
				var thisD = this.dateParse(dateString);
				var minuteSeconds = 1000 * 60;//一分钟毫秒数
				var hourSeconds = minuteSeconds * 60;//一小时毫秒数
				var totalSeconds = (thisD.getTime() - this.nowDate.getTime());//剩余总秒数
				var remainHours = Math.floor(totalSeconds / hourSeconds);//对应剩余小时
				var remainMinutes = Math.floor(totalSeconds % hourSeconds / minuteSeconds);//对应剩余分钟
				var remainSeconds = Math.floor(totalSeconds % hourSeconds % minuteSeconds / 1000);//对应剩余秒
				if(remainHours < 10){//剩余小时小于10小时
					hourStr += remainHours;
				}else{
					hourStr = remainHours + '';
				}
				if(remainMinutes < 10){//剩余分钟小于10分钟
					minuteStr += remainMinutes;
				}else{
					minuteStr = remainMinutes + '';
				}
				if(remainSeconds < 10){//剩余秒小于10秒
					secondStr += remainSeconds;
				}else{
					secondStr = remainSeconds + '';
				}
				return hourStr + ':' + minuteStr + ':' + secondStr;
			},
			isTimeOut(dateString){//是否过时
				var isTimeOut = false;
				var thisD = this.dateParse(dateString);
				var totalSeconds = thisD.getTime() - this.nowDate.getTime();
				if(totalSeconds <= 0){//现在时间超过截止时间
					isTimeOut = true;
				}
				return isTimeOut;
			},
			toExam(id,index){//进入考试页面
				this.clearClock();
				var item = this.list[index];
				window.localStorage.setItem('previewItem',JSON.stringify(item));
				this.$router.push({ path: `/preview/practising/${id}`});
			},
			toPreviewDoc(id,index){//进入资料页面

			},
			isValid(dateString){//是否没有过期
				var isInvalid = true;
				var thisD = this.dateParse(dateString);
				var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
				if(totalSeconds <= 0){
					isInvalid = false;
				}
				return isInvalid;
			},
			isTodayExam(dateString){//是否今天考
				var isToday = 0;
				var current = this.getDateObj(this.dateParse(dateString));
				//只初始运行
				var today = this.getDateObj(new Date());
				if(today.year === current.year && today.month === current.month && today.day === current.day){
					isToday = 1;
				}
				return isToday;
			},
			/**
 			*获取date相关年月日等
 			*/
 			getDateObj(date){
 				var year = date.getFullYear();
 				var month = date.getMonth() + 1;
 				var day = date.getDate() + 1;
 				var hour = date.getHours();
 				var minute = date.getMinutes();
 				var second = date.getSeconds();
 				return {
 					date,
 					year,
 					month,
 					day,
 					hour,
 					minute,
 					second,
 					string:year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second
 				};
 			},
			timeClockRun(){
				this.timeClock = setInterval(()=>{
					if(this.$route.fullPath != this.fullPath){
						this.clearClock();
					}else{
						this.nowDate = new Date();
					}
					
				},1000);
			},
			clearClock(){
				if(this.timeClock){
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
		margin-top: 0;
		.main-title{
			.plane{
				margin-right: -10px;
			}
		}
	}
</style>