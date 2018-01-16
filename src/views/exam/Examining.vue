<template>
	<div>
		<section v-show="!isCardVisible">
			<mt-header title="考试中" fixed>
				<div slot="left"><img src="/static/images/clock.png" width="15"> <span>{{remainTime(endTime)}}</span></div>
				<span @click="submitPaper" slot="right">交卷</span>
			</mt-header>
			<div class="main">
				<div class="title clearfix">
					<div class="pull-left">
						<span>{{typeName}}</span>
						<span class="order">（<a class="larger">{{currentTypeNum}}</a>/{{currentTypeTotal}}）</span>
					</div>
					<div class="pull-right">
						<mt-button type="primary" @click="showQuestionCard" class="plane" :disabled="!isLoaded">题卡</mt-button>
					</div>
				</div>
				<div class="content" style="min-height: 300px;" v-loading="!isLoaded">
					<div class="el-question">
						<div class="el-question-title">
							<span class="current">{{currentTypeNum}}.</span>
							<span class="text">{{problem.title}}</span>
						</div>
						<div class="el-question-options">
							<template v-if="problem.type == 'check'">
								<el-checkbox-group v-model="problem.myAnswer">
									<el-checkbox v-for="option in problem.options" :label="option.flag"><span class="order">{{option.flag}}</span>{{option.text}}</el-checkbox>
								</el-checkbox-group>
							</template>
							<template v-else>
								<el-radio-group v-model="problem.myAnswer">
									<el-radio v-for="option in problem.options" :label="option.flag"><span class="order">{{option.flag}}</span>{{option.text}}</el-radio>
								</el-radio-group>
							</template>
						</div>
					</div>
				</div>
			</div>
			<div class="footer-indicator fixed">
				<el-row>
					<el-col :span="12"><el-button class="plane" @click="prevProblem" :disabled="current === 0">上一题</el-button></el-col>
					<el-col :span="12"><el-button class="plane" @click="nextProblem" :disabled="current === problemList.length - 1">下一题</el-button></el-col>
				</el-row>
			</div>
		</section>
		<question-card :list="problemList" v-if="isLoaded" v-show="isCardVisible" @close="hideQuestionCard" @jump="jumpProblem"></question-card>
	</div>
</template>
<script>
	// 注意题目数据需要按“单选”、“多选”、“判断”、“选做”顺序，否则需要前端重改！！
	import { getPaperProblemList } from '../../api/api';
	import Card from './Card.vue'
	export default{
		props:{
			id:{
				required: true
			}
		},
		components:{
			questionCard: Card
		},
		data(){
			return {
				value: '',
				timeClock: '',
				current: 0,
				endTime: '2018/01/10 23:59',
				nowDate: new Date(),
				problemList:[],
				count:{
					radio: 0, //单选
					check: 0, //多选
					judge: 0, //判断
					option: 0 //选做
				},
				isLoaded: false,
				isCardVisible: false
			}
		},
		computed:{
			problem(){
				if(this.problemList[this.current]){
					var currentP = this.problemList[this.current];
					if(!currentP.myAnswer){
						if(currentP.type == "check"){
							this.$set(currentP,'myAnswer',[]);
						}else{
							this.$set(currentP,'myAnswer','');
						}
					}
					return currentP;
				}else{
					return {};
				}
				
			},
			typeName(){//当前类型
				var name = '';
				if(this.problem && typeof this.problem.isNecessary != 'undefined'){
					if(this.problem.isNecessary === true){
						switch(this.problem.type){
							case 'radio': name = '单选题';break;
							case 'check': name = '多选题';break;
							case 'judge': name = '判断题';break;
							default: break;
						}
					}else{
						name = '选做题';
					}
				}else{
					name = '题目';
				}
				return name;
			},
			currentTypeNum(){//当前类型题数
				var num = 1;
				if(this.problem.isNecessary === true){
					switch(this.problem.type){
						case 'radio': num = this.current + 1;break;
						case 'check': num = this.current + 1 - this.count.radio;break;
						case 'judge': num = this.current + 1 - (this.count.radio + this.count.check);break;
						default: break;
					}
				}else{
					num = this.current + 1 - (this.count.radio + this.count.check + this.count.judge);
				}
				return num;
			},
			currentTypeTotal(){//当前类型题数
				var total = 0;
				if(this.problem.isNecessary === true){
					switch(this.problem.type){
						case 'radio': total = this.count.radio;break;
						case 'check': total = this.count.check;break;
						case 'judge': total = this.count.judge;break;
						default: break;
					}
				}else{
					total = this.count.option;
				}
				return total;
			}
		},
		methods:{
			getProblemList(){
				//to do
				var params = {
					id: this.id
				}
				getPaperProblemList(params).then( res =>{
					this.problemList = res.data;
					for(var i=0;i<this.problemList.length;i++){
						var item = this.problemList[i];
						if(item.isNecessary === true){
							switch(item.type){
								case 'radio': ++this.count.radio;break;
								case 'check': ++this.count.check;break;
								case 'judge': ++this.count.judge;break;
								default: break;
							}
						}else{
							++this.count.option;
						}
					}
					this.isLoaded = true;
				});
			},
			submitPaper(){

			},
			showQuestionCard(){//显示题卡
				this.isCardVisible = true;
			},
			hideQuestionCard(){//隐藏题卡
				this.isCardVisible = false;
			},
			prevProblem(){//上一题
				if(this.current<=0){
					this.$toast({
			          	message: '这已经是第一题。',
			          	position: 'middle',
			          	duration: 1000
			        });
				}else{
					--this.current;
				}
			},
			nextProblem(){//下一题
				if(this.current < this.problemList.length-1){
					++this.current;
				}else{
					this.$toast({
			          	message: '这已经是最后一题。',
			          	position: 'middle',
			          	duration: 1000
			        });
				}
			},
			jumpProblem(index){//跳转到某一题
				this.hideQuestionCard();
				if(index>=0 && index<=this.problemList.length){
					this.current = index;
				}
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
			this.getProblemList();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.main{
		margin-top: 40px;
		margin-bottom: 40px;
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