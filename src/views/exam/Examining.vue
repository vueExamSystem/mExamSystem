<template>
	<section>
		<mt-header title="考试中" fixed>
			<div slot="left"><img src="/static/images/clock.png" width="15"> <span>{{remainTime(endTime)}}</span></div>
			<span @click="submitPaper" slot="right">交卷</span>
		</mt-header>
		<div class="main">
			<div class="title clearfix">
				<div class="pull-left">
					<span>单选题</span>
					<span class="order">（<a class="larger">2</a>/5）</span>
				</div>
				<div class="pull-right">
					<mt-button type="primary" @click="questionCard" class="plane">题卡</mt-button>
				</div>
			</div>
			<div class="content">
				<div class="el-question">
					<div class="el-question-title">
						<span>{{current+1}}. {{problem.title}}</span>
					</div>
					<div class="el-question-options">
						<template v-if="problem.type == 'check'">
							<mt-checklist v-model="value" :options="['选项A', '选项B', '选项C']"></mt-checklist>
						</template>
						<template v-else>
							<mt-radio v-model="value" :options="['选项A', '选项B', '选项C']"></mt-radio>
						</template>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import { getPaperProblemList } from '../../api/api';
	export default{
		props:{
			id:{
				required: true
			}
		},
		data(){
			return {
				value: '',
				timeClock: '',
				current: 0,
				endTime: '2018/01/10 23:59',
				nowDate: new Date(),
				problemList:[]
			}
		},
		computed:{
			problem(){
				if(this.problemList[this.current]){
					console.log('this.problemList[this.current]',this.problemList[this.current].title)
					return this.problemList[this.current];
				}else{
					return {};
				}
				
			}
		},
		methods:{
			getProblemList(){
				var params = {
					id: this.id
				}
				getPaperProblemList(params).then( res =>{
					this.problemList = res.data;console.log('problemList[0]',this.problemList[0])
				});
			},
			submitPaper(){

			},
			questionCard(){},
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
				if(totalSeconds<=0){
					this.clearClock();//关闭倒计时
					this.submitPaper();
					return '交卷中...';
				}else{
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
				}
				
			},
			timeClockRun(){
				this.timeClock = setInterval(()=>{
					this.nowDate = new Date();
				},1000);
			},
			clearClock(){
				if(this.timeClock){
					clearInterval(this.timeClock);
				}
			}
		},
		mounted(){
			this.timeClockRun();
			this.getProblemList();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.main{
		margin-top: 40px;
		.title{
			font-size: 12px;
			line-height: 28px;
			padding: 0 10px;
			background: #E7E7F0;
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
		.content{
			padding: 10px;
		}
	}
</style>