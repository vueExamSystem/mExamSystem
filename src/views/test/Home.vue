<template>
	<section>
		<div v-show="!isSearchVisible">
			<mt-header title="课堂测验" fixed>
				<mt-button @click="showSearch" icon="search" slot="left"></mt-button>
			</mt-header>
			<div class="main">
				<p class="main-title">测验列表</p>
				<div class="content" v-loading="listenLoading">
					<div class="section-no-item" v-if="!listenLoading && list.length == 0">
						<img src="/static/images/nolist.png">
					</div>
					<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul class="section-list">
							<li v-for="(exam,index) in list">
								<template v-if="isTodayExam(exam)">
									<template v-if="isValid(exam,exam.beginTime)">
										<p>{{exam.name}}</p>
										<div>
											<div class="time-down">
												<img src="/static/images/clock.png" width="15">
												<span>倒计时：</span>
												<span class="time">{{remainTime(exam.beginTime)}}</span>
											</div>
											<mt-button :disabled="!isShouldExam(exam.beginTime)" class="pull-right" type="primary" @click="toWaitExam(exam.id,index)">进入考试</mt-button>
										</div>
										<div class="flag">
											<span>今日</span>
										</div>
									</template>
									<template v-else-if="isValid(exam,exam.endTime)">
										<p>{{exam.name}}</p>
										<div>
											<div class="time-down">
												<img src="/static/images/clock.png" width="15">
												<span>剩余时间：</span>
												<span class="time">{{remainTime(exam.endTime)}}</span>
											</div>
											<mt-button class="pull-right" type="primary" @click="toExam(exam.id,index)">进入考试</mt-button>
										</div>
										<div class="flag" v-if="isToday(exam.beginTime)">
											<span>今日</span>
										</div>
									</template>
									<template v-else>
										<p>{{exam.name}}</p>
										<div>
											<div class="time-down">
												<img src="/static/images/clock.png" width="15">
												<span>{{exam.beginTime}}</span>
												<pre></pre>
												<span>{{exam.endTime}}</span>
											</div>
											<span class="pull-right">考试结束</span>
										</div>
										<div class="flag">
											<span>今日</span>
										</div>
									</template>
								</template>
								<template v-else>
									<p>{{exam.name}}</p>
									<div>
										<div class="time-down">
											<img src="/static/images/clock.png" width="15">
											<span>{{exam.beginTime}}</span>
											<pre></pre>
											<span>{{exam.endTime}}</span>
										</div>
										<span class="pull-right">考试结束</span>
									</div>
									<div class="flag" v-if="isToday(exam.beginTime)">
										<span>今日</span>
									</div>
								</template>
							</li>
						</ul>
					</mt-loadmore>
				</div>
			</div>
		</div>
 		<div v-if="isSearchVisible">
 			<page-search :value="searchkey" about="test" @search="searchCallback" @select="selectCallback" @loadall="loadall" @close="hideSearch"></page-search>
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
				totalCount:0,
				pageNo: 1,
                pageSize:10,
                allLoaded:false,
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
				this.pageNo=1;
				this.getTestListByPageNo();
				this.timeClockRun();
			},
			getTestListByPageNo(){//获取单页数据
                var params = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                };
                getTestList(params).then(res => {
                    this.list = this.list.concat(res.data.rows);
                    this.totalCount=res.data.totalCount;
                    this.listenLoading = false;

                    this.allLoaded = (this.list.length == this.totalCount);
                    this.$refs.loadmore.onBottomLoaded();
                });
            },
            loadBottom(){//底部加载更多数据
            	this.pageNo=this.pageNo+1;
                this.getTestListByPageNo();
            },
			loadall(){//重新加载全部
				this.hideSearch();
				this.list = [];
				this.listenLoading = true;
				this.clearClock();
				this.init();
			},
			searchCallback(results){//搜索区，点击搜索后的回调
				this.hideSearch();
				this.list = results.rows;
				this.totalCount=results.totalCount;
			},
			selectCallback(item){//搜索区，单条点击后的回调
				this.hideSearch();
				this.list.length = 0;
				this.list.push(item);
			},
			timeRangeFormatter(row){//时间范围格式化
                var st = row.beginTime;
                var et = row.endTime;
                return st + '-' + et;
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
				window.localStorage.setItem('testItem',JSON.stringify(item));
				this.$router.push({ path: `/test/wait/${id}`});
			},
			toExam(id,index){//直接进入考试页面
				this.clearClock();
				var item = this.list[index];
				window.localStorage.setItem('testItem',JSON.stringify(item));
				this.$router.push({ path: `/test/testing/${id}`});
			},
			isValid(exam,dateString){//是否没有过期
				var isInvalid = true;
				if(exam.status==1){
					isInvalid=false;
				}else{
					var thisD = this.dateParse(dateString);
					var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
					if(totalSeconds <= 0){
						isInvalid = false;
						}
					}
				return isInvalid;
			},
			isToday(dateString){//是否今天考
				var isToday = 0;
				var current = this.getDateObj(this.dateParse(dateString));
				//只初始运行
				var today = this.getDateObj(new Date());
				if(today.year === current.year && today.month === current.month && today.day === current.day){
					isToday = 1;
				}
				return isToday;
			},
			isTodayExam(exam){//是否今天考
				var dateString=exam.beginTime;
				var isToday = 0;
				if(exam.status==0){
					isToday=1;
				}else{
					var current = this.getDateObj(this.dateParse(dateString));
					//只初始运行
					var today = this.getDateObj(new Date());
					if(today.year === current.year && today.month === current.month && today.day === current.day){
						isToday = 1;
					}
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
	        	this.$store.dispatch('HideNav');
 			},
 			hideSearch(){//隐藏搜索页面
 				this.isSearchVisible = false;
				this.$store.dispatch('ShowNav');
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