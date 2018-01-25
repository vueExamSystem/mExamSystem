<template>
	<section>
		<div v-show="!isSearchVisible">
			<mt-header title="课堂测验" fixed>
				<mt-button @click="showSearch" icon="search" slot="left"></mt-button>
			</mt-header>
			<div class="main">
				<p class="main-title">本周测验</p>
				<div class="content" v-loading="listenLoading">
					<ul class="section-list">
						<li v-for="(exam,index) in list">
							<template v-if="isTodayExam(exam.startTime) && isValid(exam.startTime)">
								<p>{{exam.name}}</p>
								<div>
									<div class="time-down">
										<img src="/static/images/clock.png" width="15">
										<span>倒计时：</span>
										<span class="time">{{remainTime(exam.startTime)}}</span>
									</div>
									<mt-button v-show="isShouldExam(exam.startTime)" class="pull-right" type="primary" @click="toWaitExam(exam.id,index)">进入测验</mt-button>
								</div>
								<div class="flag">
									<span>今日</span>
								</div>
							</template>
							<template v-else>
								<p>{{exam.name}}</p>
								<div>
									<div class="time-down">
										<img src="/static/images/clock.png" width="15">
										<span>{{exam.startTime}}</span>
									</div>
								</div>
								<div class="flag" v-if="isTodayExam(exam.startTime)">
									<span>今日</span>
								</div>
							</template>
						</li>
					</ul>
				</div>
			</div>
		</div>
 		<div v-show="isSearchVisible">
 			<page-search :value="searchkey" about="test" @callback="searchCallback" @close="hideSearch"></page-search>
 		</div>
	</section>
</template>
<script>
	import { getTestList } from '../../api/api'
	import Search from '../common/Search.vue'
	export default {
		components: {
			pageSearch:Search
		},
		data(){
			return {
				fullPath: '',
				nowDate: new Date(),
				timeClock: '',
				list:[],
				searchkey: '',
				listenLoading: true,
				isSearchVisible: false
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
				getTestList().then(res => {
					this.list = res.data;
					this.timeClockRun();
					this.listenLoading = false;
				});
			},
			searchCallback(item){
				console.log('item',item)
				this.hideSearch();
				this.list.length = 0;
				this.list.push(item);
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
			isShouldExam(dateString){//是否可以进入考试
				var isShouldExam = false;
				var thisD = this.dateParse(dateString);
				var crisis = 1000 * 60 * 5 + 1000;//5分钟
				var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
				if(totalSeconds <= crisis){
					isShouldExam = true;
				}
				return isShouldExam;
			},
			toWaitExam(id,index){//进入考试页面
				this.clearClock();
				var item = this.list[index];
				window.localStorage.setItem('testItem',JSON.stringify(item));console.log('11')
				this.$router.push({ path: `/test/wait/${id}`});
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
 			showSearch(){//展示搜索页面
 				this.searchkey = '';
 				this.isSearchVisible = true;
 			},
 			hideSearch(){//隐藏搜索页面
 				this.isSearchVisible = false;
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
	
</style>