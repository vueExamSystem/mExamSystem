<template>
	<section>
		<mt-header title="考试中" fixed>
			<div slot="left"><img src="/static/images/clock.png" width="15"> <span>{{remainTime(endTime)}}</span></div>
			<span @click="submitPaper" slot="right">交卷</span>
		</mt-header>
	</section>
</template>
<script>
import { getPaperProblemList } from '../../api/api'
	export default{
		props:{
			id:{
				required: true
			}
		},
		data(){
			return {
				timeClock: '',
				endTime: '2018/01/10 23:59',
				nowDate: new Date(),
				problemList:[]
			}
		},
		methods:{
			getProblemList(){
				var params = {
					id: this.id
				}
				getPaperProblemList(params).then( res =>{
					this.problemList = res.data;
				});
			},
			submitPaper(){

			},
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
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars'
</style>