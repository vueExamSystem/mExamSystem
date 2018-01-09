<template>
	<div>
      	<mt-tab-container class="page-tabbar-container" v-model="selected">  
        	<mt-tab-container-item id="examTab">  
          		<page-exam></page-exam>
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="testTab">  
          		<page-test></page-test>
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="previewTab">  
          		<page-preview></page-preview>
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="scoreTab">  
          		<page-score></page-score>
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="settingTab">  
          		<page-setting></page-setting>
        	</mt-tab-container-item>  
      	</mt-tab-container>  
  
		<mt-tabbar v-model="selected" fixed>
		  	<mt-tab-item id="examTab">
		    	<i slot="icon" class="iconfont icon-kaoshi-larger"></i>
		    	<span>考试</span>
		  	</mt-tab-item>
		  	<mt-tab-item id="testTab">
		    	<i slot="icon" class="iconfont icon-ceyan-larger"></i>
		    	<span>测验</span>
		  	</mt-tab-item>
		  	<mt-tab-item id="previewTab">
		    	<i slot="icon" class="iconfont icon-pencil-larger"></i>
		    	<span>预习</span>
		  	</mt-tab-item>
		  	<mt-tab-item id="scoreTab">
		    	<i slot="icon" class="iconfont icon-score-larger"></i>
		    	<span>成绩</span>
		  	</mt-tab-item>
		  	<mt-tab-item id="settingTab">
		    	<i slot="icon" class="iconfont icon-setting-larger"></i>
		    	<span>设置</span>
		  	</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import ExamHome from './exam/Home.vue'
	import TestHome from './test/Home.vue'
	import PreviewHome from './preview/Home.vue'
	import ScoreHome from './score/Home.vue'
	import SettingHome from './setting/Home.vue'
	export default {
		data() {
			return {
				selected: 'examTab'
			}
		},
		components:{
			pageExam:ExamHome,
			pageTest:TestHome,
			pagePreview:PreviewHome,
			pageScore:ScoreHome,
			pageSetting:SettingHome
		},
		methods: {
		},
		mounted() {
		}
	}

</script>

<style lang="scss">
	@import '~scss_vars';
	.mint-tabbar{
		background: #fff;
		box-shadow: 0 -1px 4px 0 #B5B5CD;
		.mint-tab-item{
			padding: 6px 0 4px 0;
			color: #929292;
			letter-spacing: 0.11px;
			.mint-tab-item-icon{
				margin-bottom: 4px;
				.iconfont{
					font-size: 22px;
				}
			}
			&.is-selected{
				background: #fff;
				color: #8684BC;
			}
		}
	}
</style>