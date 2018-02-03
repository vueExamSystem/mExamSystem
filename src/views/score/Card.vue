<template>
	<section>
		<mt-header title="答题卡" fixed>
			<div slot="left">
			    <mt-button icon="back" @click="back">返回</mt-button>
		    </div>
		</mt-header>
		<div class="main">
			<div class="question-serial">
				<div class="main-title black">单选题</div>
				<ul class="question-num">
					<li v-for="(val, index) in radioList" ><el-button :class="answerResult(val)" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
			<div class="question-serial">
				<div class="main-title black">多选题</div>
				<ul class="question-num">
					<li v-for="(val, index) in checkList" ><el-button :class="answerResult(val)" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
			<div class="question-serial">
				<div class="main-title black">判断题</div>
				<ul class="question-num">
					<li v-for="(val, index) in judgeList" ><el-button :class="answerResult(val)" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
				</ul>
			</div>
			<div class="question-serial">
				<div class="main-title black">选做题（{{optionList.length}}选{{optionNeed}}）</div>
				<ul class="question-num">
					<li v-for="(val, index) in optionList" ><el-button :class="answerResult(val)" class="circle" @click="questionChange(val)">{{index+1}}</el-button></li>
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
				optionNeed: 0//选做题必答
			}
		},
		methods:{
			arrange(){
				var item = JSON.parse(window.localStorage.getItem('scoreItem'));
				this.optionNeed = item.optionNeed;
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
			answerResult(index){
				var problem = this.list[index];
				var isAnswerred = true;
				//选做题分未做的、对的与错的
				//必做题只有对错之分
				if(!problem.isNecessary && (problem.myAnswer == '' || (_.isArray(problem.myAnswer) && problem.myAnswer.length == 0))){//选做题未做的
					return '';
				}else{
					if(problem.isSuccess){
						return 'is-answerred is-answerred-success';
					}else{
						return 'is-answerred is-answerred-fail';
					}
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
	
</style>