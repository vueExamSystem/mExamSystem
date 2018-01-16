<template>
	<section>
		<mt-header title="答题卡" fixed>
			<div slot="left">
			    <mt-button icon="back" @click="back">返回</mt-button>
		    </div>
		</mt-header>
		<div class="main">
			<div class="question-serial">
				<div class="title">单选题</div>
				<ul class="question-num">
					<li v-for="(val, index) in radioList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
			<div class="question-serial">
				<div class="title">多选题</div>
				<ul class="question-num">
					<li v-for="(val, index) in checkList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
			<div class="question-serial">
				<div class="title">判断题</div>
				<ul class="question-num">
					<li v-for="(val, index) in judgeList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
			<div class="question-serial">
				<div class="title">选做题</div>
				<ul class="question-num">
					<li v-for="(val, index) in optionList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
		</div>
	</section>
</template>
<script>
	export default{
		props:{
			list: {
				type: Array
			}
		},
		data(){
			return {
				radioList: [],
				checkList: [],
				judgeList: [],
				optionList: [],
			}
		},
		methods:{
			arrange(){
				for(var i=0;i<this.list.length;i++){
					var item = this.list[i];
					if(item.isNecessary === true){
						switch(item.type){
							case 'radio': this.radioList.push(i);break;
							case 'check': this.checkList.push(i);break;
							case 'judge': this.judgeList.push(i);break;
							default: break;
						}
					}else{
						this.optionList.push(i);
					}
				}
			},
			isAnswerred(index){
				var problem = this.list[index];
				var isAnswerred = false;
				if(typeof problem.myAnswer === 'undefined'){
					return isAnswerred;
				}else{
					if(problem.type === 'check'){
						if(problem.myAnswer.length == 0){
							isAnswerred = false;
						}else{
							isAnswerred = true;
						}

					}else{
						if(problem.myAnswer == ''){
							isAnswerred = false;
						}else{
							isAnswerred = true;
						}
					}
					return isAnswerred;
				}
			},
			questionChange(index){
				this.$emit('jump',index);
			},
			back(){
				this.$emit('close');
			}
		},
		mounted(){
			this.arrange();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.main{
		margin-top: 40px;
		.question-serial{
			.title{
				font-size: 12px;
				line-height: 28px;
				padding: 0 10px;
				background: #E7E7F0;
			}
			.question-num{
				padding: 10px;
				font-size: 0;
				&>li{
					display: inline-block;
					width: 20%;
					margin: 10px 0;
				}
			}
			.circle{
				width: 32px;
				height: 32px;
				border-radius: 100%;
				border-color: #B5B5CD;
				font-size: 18px;
				color: #8684BC;
				&.is-answerred{
					color: #fff;
					background: #87BFBC;
					border-color: #87BFBC;
				}
			}
		}
		
	}
</style>