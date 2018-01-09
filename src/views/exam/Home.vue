<template>
	<section>
		<div v-show="!isSearchVisible">
			<mt-header title="考试" fixed>
				<mt-button @click="showSearch" icon="search" slot="left"></mt-button>
			</mt-header>
			<div class="main">
				<p class="title">本周考试</p>
				<div class="content">
					<ul class="section-list">
						<li v-for="exam in examList">
							<template v-if="isTodayExam(exam.time)">
								<p>{{exam.name}}</p>
								<div>
									<div class="time-down">
										<img src="/static/images/clock.png" width="15">
										<span>倒计时：</span>
										<span class="time">{{exam.time | remainTime}}</span>
									</div>
									<mt-button v-show="isShouldExam(exam.time)" class="pull-right" type="primary" @click="toExam(exam.id)">进入考试</mt-button>
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
										<span>{{exam.time}}</span>
									</div>
								</div>
							</template>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-show="isSearchVisible">
			<page-search></page-search>
		</div>
	</section>
</template>
<script>
	import Search from '../common/Search.vue'
	export default {
		components:{
			pageSearch:Search
		},
		data(){
			return {
				nowDate: new Date(),
				examList:[{
					id: '1',
					name: '大一物理（上）期中考试',
					time: '2018/01/09 15:00'
				},{
					id: '2',
					name: '大一高等数学（上）期中考试',
					time: '2018/01/09 16:00'
				},{
					id: '3',
					name: '大一大学英语（上）期中考试',
					time: '2018/01/09 18:00'
				},{
					id: '3',
					name: '大一计算机（上）期中考试',
					time: '2018/01/11 15:00'
				}],
				isSearchVisible: false
			}
		},
		computed:{
			now(){
				return this.getDateObj(this.nowDate);
			}
		},
		filters:{
			remainTime(dateString){
				return '1'
			}
		},
		methods:{
			/**string转换为date
			*dateString:2018/01/09 18:00
			*/
			dateParse(dateString){
				return new Date(dateString);
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
			toExam(id){//进入考试页面

			},
			isShouldExam(dateString){//是否可以进入考试

			},
			isTodayExam(dateString){
				var isToday = 0;
				var current = this.getDateObj(this.dateParse(dateString));
				//只初始运行
				var today = this.getDateObj(new Date());
				if(today.year === current.year && today.month === current.month && today.day === current.day){
					isToday = 1;
				}
				return isToday;
			},
			showSearch(){//展示搜索页面
				this.isSearchVisible = true;
			},
			hideSearch(){//展示搜索页面
				this.isSearchVisible = false;
			},
			timeClockRun(){
				setInterval(()=>{
					this.nowDate = new Date();
					// console.log(new Date())
				},1000);
			}
		},
		mounted() {
			this.timeClockRun();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.main{
		margin: 40px 0 50px;
		.title{
			font-size: 12px;
			line-height: 28px;
			padding: 0 10px;
			color: $color-primary;
			background: #E7E7F0;
		}
		.content{
			padding: 10px;
		}
	}
	
</style>