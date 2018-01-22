<template>
	<section class="feedback">
		<div v-if="feedback.type == 'fail'">
			<i class="fa fa-exclamation-triangle"></i>
			<span class="feedback-title">{{feedback.title}}</span>
			<p class="feedback-msg">
				<span v-if="feedback.time != ''">{{feedback.time}}秒后，</span>
				{{feedback.msg}}
			</p>
			<el-button @click="toNext">{{feedback.buttonText}}</el-button>
		</div>
		<div v-else>
			<i class="fa fa-exclamation-triangle"></i>
			<span class="feedback-title">{{feedback.title}}</span>
			<p class="feedback-msg">
				<span v-if="feedback.time != ''">{{feedback.time}}秒后，</span>
				{{feedback.msg}}
			</p>
			<el-button @click="toNext">{{feedback.buttonText}}</el-button>
		</div>
	</section>
</template>
<script>
	export default {
		props:{
			options:{
				type: Object
			}
		},
		data(){
			return {
				timehandle: '',
				defaults:{
					success: {
						type: 'success',
						title: '提交成功！',
						msg: '跳转到到首页',
						time: 10,
						buttonText: '返回到首页',
						withinPath: '/feedback',
						nextLink: '/'
					},
					fail: {
						type: 'fail',
						title: '提交失败！',
						msg: '跳转到到首页',
						time: 10,
						buttonText: '返回到首页',
						withinPath: '/feedback',
						nextLink: '/'
					}
				},
				feedback:{}
			}
		},
		methods:{
			init(){
				var opt = {};
				if(this.options && this.options.type && this.options.type === 'fail'){
					opt = Object.assign({},this.defaults.fail,this.options);
				}else{
					opt = Object.assign({},this.defaults.success,this.options);
				}
				this.feedback = opt;
				if(this.feedback.time != ''){
					this.timedown();
				}
			},
			toNext(){
				if(this.feedback.nextLink !== ''){
					this.$router.push(this.feedback.nextLink);
				}
			},
			timedown(){
				this.timehandle = setInterval(()=>{
					if(this.$route.fullPath !== this.feedback.withinPath){
						clearInterval(this.timehandle);
					}else{
						if(this.feedback.time === 1){
							clearInterval(this.timehandle);
							this.toNext();
						}else{
							--this.feedback.time;
						}									
					}
					
					
				},1000);
			}
		},
		mounted(){
			this.init();
		}
	}
</script>