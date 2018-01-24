<template>
	<section class="feedback-wrap">
		<div v-if="feedback.type == 'fail'" class="feedback fail">
			<div class="feedback-title">
				<i class="el-icon-warning"></i>
				<span>{{feedback.title}}</span>
			</div>
			<p class="feedback-msg">
				<span class="time-down" v-if="feedback.time != ''">{{feedback.time}}秒后，</span>
				{{feedback.msg}}
			</p>
			<el-button type="danger" @click="toNext">{{feedback.buttonText}}</el-button>
		</div>
		<div v-else class="feedback success">
			<div class="feedback-title">
				<i class="el-icon-success"></i>
				<span>{{feedback.title}}</span>
			</div>
			<p class="feedback-msg">
				<span class="time-down" v-if="feedback.time != ''">{{feedback.time}}秒后，</span>
				{{feedback.msg}}
			</p>
			<el-button type="success" @click="toNext">{{feedback.buttonText}}</el-button>
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
<style lang="scss" scoped>
	@import '~scss_vars';
	.feedback-wrap{
		position: fixed;
		width: 100%;
		height: 100%;
		padding: 100px 10px 0;
		text-align: center;
		background: #E7E7F0;
		.feedback{
			&.success{
				.feedback-title{
					color: $-color-success;
				}
			}
			&.fail{
				.feedback-title{
					color: $-color-danger;
				}
			}
			.feedback-title{
				font-size: 24px;
			}
			.feedback-msg{
				margin-top: 20px;
				font-size: 16px;
				.time-down{
					color: $-color-primary;
				}
			}
			.el-button{
				margin-top: 40px;
				padding: 12px;
				font-size: 16px;
			}
		}
	}
</style>