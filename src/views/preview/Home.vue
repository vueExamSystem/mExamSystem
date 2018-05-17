<template>
	<section>
		<div v-show="!isFilterVisible && !isDocVisible">
			<el-tabs type="card" v-model="activeName">
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
							<div class="section-no-item" v-if="!docListenLoading && docList.length == 0">
								<img src="/static/images/nodata.png">
							</div>
							<mt-loadmore :bottom-method="loadBottomDoc" :bottom-all-loaded="allLoadedDoc" ref="loadmore">
								<ul class="section-list">
									<li v-for="(doc,index) in docList">
										<p>{{doc.name}}</p>
										<div>
											<div class="time-down">
												<i class="iconfont icon-kecheng-larger"></i>
												<span class="time">{{doc.courseName}}</span>
											</div>
											<mt-button class="pull-right" type="primary" @click="showDoc(doc)">我要预习</mt-button>
										</div>
									</li>
								</ul>
							</mt-loadmore>
						</div>
					</div>
			    </el-tab-pane>
				<div v-show="!isSearchVisible">
				    <el-tab-pane label="预习习题" name="previewExercises">
						<div class="main">
							<div class="main-title clearfix">
								<div class="pull-left">
									<span>练习列表</span>
								</div>
								<div class="pull-right">
									<mt-button type="primary" class="plane" @click="showSearch" icon="search" slot="left"></mt-button>
								</div>
							</div>
							<div class="content" v-loading="listenLoading">
								<div class="section-no-item" v-if="!listenLoading && list.length == 0">
									<img src="/static/images/nodata.png">
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
													<div class="flag">
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
													<div class="flag" v-if="isToday(exam.beginTime)">
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
				    </el-tab-pane>
				</div>
		    </el-tabs>
	    </div>
	    <div v-show="isFilterVisible">
	    	<tab-filter @close="hideFilter" @confirm="filterCallback"></tab-filter>
	    </div>
	    <div v-if="isSearchVisible">
 			<page-search :value="searchkey" about="train" @search="searchCallback" @select="selectCallback" @loadall="loadall" @close="hideSearch"></page-search>
 		</div>
	    <div v-if="isDocVisible">
	    	<doc-content :id="docId" :docRow="docRow" @close="hideDoc"></doc-content>
	    </div>
	</section>
</template>
<script>
	import { getTrainList, getDocList } from '../../api/api'
	import TabFilter from '../common/TabFilter.vue'
	import Doc from './Doc.vue'
	import Search from '../common/Search.vue'
	export default {
		components:{
			tabFilter: TabFilter,
			docContent: Doc,
			pageSearch:Search
		},
		data(){
			return {
				activeName: 'previewExercises',
				fullPath: '',
				nowDate: new Date(),
				timeClock: '',
				list:[],//练习列表
				totalCount:0,
				pageNo: 1,
                pageSize:10,
                allLoaded:false,
                totalCountDoc:0,
                pageNoDoc: 1,
                allLoadedDoc:false,
				docList:[],//资料列表
				docFilter:{},//资料过滤
				isFilterVisible: false,
				listenLoading: true,
				docListenLoading: true,
				isInitDocList: false,//是否初始化资料列表
				docId: '',//预习资料id
				// docName: '',//预习资料名称
				docRow:'',
				isDocVisible: false, //预习资料可见性
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
				this.getTrainListByPageNo();
				this.timeClockRun();
				//注意：获取预习资料列表需要先等待筛选条件后再自动执行
			},
			getTrainListByPageNo(){//获取单页数据
                var params = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                };
                //获取预习习题列表
                getTrainList(params).then(res => {
                    this.list = this.list.concat(res.data.rows);
                    this.totalCount=res.data.totalCount;
                    this.listenLoading = false;

                    this.allLoaded = (this.list.length == this.totalCount);
                    this.$refs.loadmore.onBottomLoaded();
                });
            },
            loadBottom(){//底部加载更多数据
            	this.pageNo=this.pageNo+1;
                this.getTrainListByPageNo();
            },
			getListOfDoc(){//获取预习资料列表
				this.docListenLoading = true;
				this.docList = [];
				getDocList(this.docFilter).then(res => {
					this.docList = res.data.rows;
					this.docListenLoading = false;
					this.isInitDocList = true;
				});
			},
			getDocListByPageNo(){//获取单页数据
                var params =this.docFilter;
                params.pageNo=this.pageNoDoc;
                params.pageSize=this.pageSize;
                console.log('getDocListByPageNo',params);
                this.docListenLoading = true;
                //获取预习习题列表
                getDocList(params).then(res => {
                    this.docList = this.docList.concat(res.data.rows);
                    this.totalCountDoc=res.data.totalCount;
                    this.docListenLoading = false;
                    this.isInitDocList = true;
                    this.allLoadedDoc = (this.docList.length == this.totalCountDoc);
                    this.$refs.loadmore.onBottomLoaded();
                });
            },
            loadBottomDoc(){//底部加载更多数据
            	this.pageNoDoc=this.pageNoDoc+1;
                this.getDocListByPageNo();
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
			filterCallback(filter){//过滤回调
				this.docFilter = filter;
				this.hideFilter();
				this.pageNoDoc=1;
				this.docList=[];
				this.getDocListByPageNo();//获取预习资料列表
			},
	        showFilter(){
	        	this.isFilterVisible = true;
	        	this.$store.dispatch('HideNav');
	        },
	        hideFilter(){
	        	this.isFilterVisible = false;
				this.$store.dispatch('ShowNav');
	        },
	        showDoc(row){
	        	this.docId = row.id;
	        	// this.docName = row.name;
	        	this.docRow=row;
	        	this.isDocVisible = true;
				this.$store.dispatch('HideNav');
	        },
	        hideDoc(){
	        	this.docId='';
	        	this.docRow='';
	        	this.isDocVisible = false;
				this.$store.dispatch('ShowNav');
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
				this.$router.push({ path: `/preview/wait/${id}`});
			},
			toExam(id,index){//直接进入考试页面
				this.clearClock();
				var item = this.list[index];
				window.localStorage.setItem('testItem',JSON.stringify(item));
				this.$router.push({ path: `/preview/practising/${id}`});
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