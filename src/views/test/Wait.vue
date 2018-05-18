<template>
	<div>
		<section v-if="isValidLink">
			<mt-header title="测验等待" fixed>
				<span class="text-primary" @click="close" slot="right">关闭</span>
			</mt-header>
			<div class="main">
				<div class="img-clock-down">
					<img src="/static/images/wait.png">
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
		<template v-else>
			<my-feedback :options="feedbackOptions"></my-feedback>
		</template>
	</div>
</template>
<script>
	import FeedBack from '../common/FeedBack'
	import { getServerTime } from '../../api/api'
	export default {
		props:{
			id:{
				required: true
			}
		},
		components:{myFeedback:FeedBack},
		data(){
			return {
				fullPath: '',
				timeClock: '',
				nowDate: new Date(),
				detail:{},
				feedbackOptions:{
					withinPath: '',
					type: 'fail',
					title: '链接无效',
					msg: '返回到测验',
					nextLink: '/test',
					buttonText: '返回到测验'
				},
				isValidLink: true
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
			init(){
				this.initDate();
				var item = JSON.parse(window.localStorage.getItem('testItem'));
				this.fullPath = this.$route.fullPath;
				if(item && item.id && item.id == this.id){
					this.$set(this.detail,'name',item.name);
					this.$set(this.detail,'startTime',item.startTime);
					this.$set(this.detail,'endTime',item.endTime);
					if(this.getRemainSeconds(this.detail.startTime)>0){//倒计时
						this.isValidLink = true;
						this.timeClockRun();
					}else{
						if(this.getRemainSeconds(this.detail.endTime)>0){//进入考试页面
							this.isValidLink = true;
							this.toExam();
						}else{//无效链接
							this.feedbackOptions.withinPath = this.fullPath;
							this.isValidLink = false;
						}
					}
				}else{//无效链接
					this.feedbackOptions.withinPath = this.fullPath;
					this.isValidLink = false;
				}
			},
			initDate(){
                var begin_time=new Date().getTime(); //获取本地当前时间
                getServerTime({}).then(
                    res=>{
                        var sertime = res.data; 
                        var nowtime = new Date().getTime(); //再次获取本地当前时间  
                        //加载时间  
                        var loadtime = nowtime - begin_time;  
                        //服务器和本地时间差值  
                        this.diffTime = sertime - (nowtime + loadtime);
                        //console.log('diffTime:',this.diffTime); 
                    });
            },
			dateParse(dateString){
				return new Date(dateString);
			},
			toExam(){
				this.$router.push({ path: `/test/testing/${this.id}`});
			},
			getRemainSeconds(dateString){//获取剩余总秒数
				var thisD = this.dateParse(dateString);
				var totalSeconds = (thisD.getTime() - this.nowDate.getTime());
				return totalSeconds;
			},
			remainTime(dateString){//倒计时
				var totalSeconds = this.getRemainSeconds(dateString);//剩余总秒数
				if(totalSeconds<=0){
					this.clearClock();//关闭倒计时
					this.toExam();
					return '准备考试...';
				}else{
					var hourStr = '0';
					var minuteStr = '0';
					var secondStr = '0';
					var minuteSeconds = 1000 * 60;//一分钟毫秒数
					var hourSeconds = minuteSeconds * 60;//一小时毫秒数
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
				}
				
			},
			close(){
				this.clearClock();//关闭倒计时
				this.$router.push({ path: '/test'});
			},
			timeClockRun(){
				this.timeClock = setInterval(()=>{
					if(this.$route.fullPath != this.fullPath){
						this.clearClock();
					}else{
						this.nowDate =new Date((new Date()).getTime()+this.diffTime);
					}
					
				},1000);
			},
			clearClock(){
				if(this.timeClock){
					clearInterval(this.timeClock);
				}
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.main{
		padding: 40px;
		.img-clock-down{
			height: 230px;
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