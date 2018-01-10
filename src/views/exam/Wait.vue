<template>
	<section>
		<mt-header title="等待考试" fixed>
			<span class="text-primary" @click="close" slot="right">关闭</span>
		</mt-header>
		<div class="main">
			<div class="img-clock-down">
				<img src="/static/images/logo.png">
				<div class="time-down">
					<span>{{remainTime(detail.startTime)}}</span>
				</div>
			</div>
			<div class="display-box">
				<ul>
					<li><span>{{detail.name}}</span></li>
					<li>时间：<span>{{totalTime}}</span></li>
					<li>总分：<span>100分</span></li>
				</ul>
			</div>
			<p class="little-warning">您已进入等待区，到时间系统自动进入答题，请耐心等待！</p>
		</div>
	</section>
</template>
<script>
	export default {
		props:{
			id:{
				required: true
			}
		},
		data(){
			return {
				timeClock: '',
				nowDate: new Date(),
				detail:{
					name: '大学物理期中考试（上）',
					startTime: '2018/01/10 13:30',
					endTime: '2018/01/10 15:30',
				}
			}
		},
		computed:{
			totalTime(){
				var sDate = this.dateParse(this.detail.startTime);
				var eDate = this.dateParse(this.detail.endTime);
				var minuteSeconds = 1000 * 60;//一分钟毫秒数
				var hourSeconds = minuteSeconds * 60;//一小时毫秒数 
				var totalSeconds = (eDate.getTime() - sDate.getTime());
				return (totalSeconds%hourSeconds===0)?(totalSeconds/hourSeconds + '小时'):Math.floor(totalSeconds/minuteSeconds) + '分钟';
			}
		},
		methods:{
			getPaperInfo(){

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
					return '准备考试...';
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
			close(){
				this.clearClock();//关闭倒计时
				this.$router.push({ path: '/'});
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
	@import '~scss_vars';
	.main{
		margin-top: 40px;
		padding: 40px;
		.img-clock-down{
			height: 214px;
			text-align: center;
			position: relative;
			.time-down{
				position: absolute;
				bottom:0;
				width: 100%;
				height: 30px;
				line-height: 30px;
				font-size: 18px;
				color: #3C5398;
			}
		}
		.display-box{
			margin: 25px 0;
		}
		.little-warning{
			font-size: 10px;
			color: #8684BC;
			line-height: 18px;
			text-align: center;
		}
	}
</style>