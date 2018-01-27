<template>
	<section>
		<mt-header :title="name" fixed>
		    <mt-button slot="left" icon="back" @click="back">返回</mt-button>
		</mt-header>
		<div class="main" style="margin-bottom:0;">
			<div class="content" v-loading="listenLoading">
				<div class="img-list">
					<img v-for="img in imgList" :src="img" width="100%">
				</div>
				<div class="doc-content">{{content}}</div>
				<video loop="loop" poster="/static/images/logo.png" width="100%" height="200" v-if="videoSrc" :src="videoSrc" controls="controls"></video>
			</div>
		</div>
	</section>
</template>
<script>
	import { getDocContent } from '../../api/api'
	export default {
		props:{
			id:{
				required: true
			},
			name:{
				required: true
			}
		},
		data(){
			return {
				listenLoading: true,
				imgList:[],
				content: '',
				videoSrc: ''
			}
		},
		methods:{
			init(){
				//获取用户所有课程
				var params = {
					id: this.id
				};
				getDocContent(params).then(res=>{
					this.imgList = res.data.imgList;
					this.content = res.data.content;
					this.videoSrc = res.data.videoSrc;
					this.listenLoading = false;
				});
			},
			back(){
				this.$emit("close");
			}

		},
		mounted(){
			this.init();
		}
	}
</script>
<style>
	.img-list img{
		margin-bottom:10px;
		border: 1px solid #eee;
	}
	video{
		margin-top:10px;
		border: 1px solid #eee;
	}
	.doc-content{
		font-size: 14px;
		line-height: 22px;
	}
</style>