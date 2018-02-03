<template>
	<div>
		<template v-if="isValidLink">
			<section v-show="!isCardVisible">
				<mt-header :title="name" fixed>
				    <mt-button slot="left" icon="back" @click="back">返回</mt-button>
				</mt-header>
				<template>
					<div class="main">
						<div class="main-title black clearfix">
							<div class="pull-left">
								<span>{{typeName}}</span>
								<span class="order">（<a class="larger">{{currentTypeNum}}</a>/{{currentTypeTotal}}）</span>
								<el-button v-show="isLoaded && isSuccess == ''" size="mini" type="warning" round>未选做</el-button>
								<el-button v-show="isLoaded && isSuccess == '1'" size="mini" type="success" round>正确</el-button>
								<el-button v-show="isLoaded && isSuccess == '0'" size="mini" type="danger" round>错误</el-button>
							</div>
							<div class="pull-right">
								<mt-button type="primary" @click="showQuestionCard" class="plane" :disabled="!isLoaded">题卡</mt-button>
							</div>
						</div>
						<div class="content" style="min-height: 300px;" v-loading="!isLoaded">
							<div class="el-question" v-if="isLoaded" :class="{'el-question-success':isSuccess === '1','el-question-fail':isSuccess === '0'}">
								<div class="el-question-title">
									<span class="current">{{currentTypeNum}}.</span>
									<span class="text">{{problem.title}}</span>
								</div>
								<div class="el-question-options mask">
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
								<div class="el-question-info">
									<div class="el-info">
										<div class="el-label el-label-light-green">正确答案</div>
										<div class="el-info-content">{{problem.answer.toString()}}</div>
									</div>
									<div class="el-info">
										<div class="el-label el-label-blue">解析</div>
										<div class="el-info-content">{{problem.analysis}}</div>
									</div>
									<div class="el-info">
										<div class="el-label el-label-green">考点</div>
										<div class="el-info-content">{{problem.keynote}}</div>
									</div>
									<div class="el-info">
										<div class="el-label el-label-purple">添加人</div>
										<div class="el-info-content">{{problem.creator}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="footer-indicator fixed" v-show="isLoaded">
						<el-row>
							<el-col :span="12"><el-button class="plane" @click="prevProblem" :disabled="current === 0">上一题</el-button></el-col>
							<el-col :span="12"><el-button class="plane" @click="nextProblem" :disabled="current === problemList.length - 1">下一题</el-button></el-col>
						</el-row>
					</div>
				</template>
			</section>
			<question-card :list="problemList" v-if="isLoaded" v-show="isCardVisible" @close="hideQuestionCard" @jump="jumpProblem"></question-card>
		</template>
		<template v-else>
			<my-feedback :options="feedbackOptions"></my-feedback>
		</template>
	</div>
</template>
<script>
	// 注意题目数据需要按“单选”、“多选”、“判断”、“选做”顺序，否则需要前端重改！！
	import FeedBack from '../common/FeedBack'
	import { getAnalysisList } from '../../api/api';
	import Card from './Card.vue'
	export default{
		props:{
			id:{
				required: true
			},
			name:{
				required: true
			}
		},
		components:{
			questionCard: Card,
			myFeedback:FeedBack
		},
		data(){
			return {
				isValidLink: true,
				fullPath: '',
				current: 0,
				problemList:[],
				count:{
					radio: 0, //单选
					check: 0, //多选
					judge: 0, //判断
					option: 0 //选做
				},
				feedbackOptions:{
					withinPath: '',
					type: 'fail',
					title: '链接无效',
					msg: '返回到考试',
					nextLink: '/exam',
					buttonText: '返回到考试'
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
			isSuccess(){
				if(!this.problem.isNecessary && (this.problem.myAnswer == '' || (_.isArray(this.problem.myAnswer) && this.problem.myAnswer.length == 0))){//选做题未做的
					return '';
				}else{
					if(this.problem.isSuccess){
						return '1';
					}else{
						return '0';
					}
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
			init(){
				var item = JSON.parse(window.localStorage.getItem('scoreItem'));
				this.fullPath = this.$route.fullPath;
				this.feedbackOptions.withinPath = this.fullPath;
				if(item && item.id && item.id == this.id){
					this.isValidLink = true;
					this.optionNeed = item.optionNeed;//选做题必答
					this.getList();
				}else{//无效链接
					this.isValidLink = false;
				}
			},
			getList(){
				//to do
				var params = {
					id: this.id
				};
				getAnalysisList(params).then( res =>{
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
			back(){
				this.$emit('close')
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
		.main-title{
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
			.el-button--mini{
				margin-left: 5px;
				padding: 4px 8px;
				font-size: 10px;
			}
		}
	}
</style>