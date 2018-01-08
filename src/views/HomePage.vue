<template>
	<div>
      	<mt-tab-container class="page-tabbar-container" v-model="selected">  
        	<mt-tab-container-item id="examTab">  
          考试
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="testTab">  
          测验
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="previewTab">  
          预习
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="scoreTab">  
          成绩
        	</mt-tab-container-item>  
        	<mt-tab-container-item id="settingTab">  
          设置
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
	export default {
		data() {
			return {
				selected: 'examTab'
			}
		},
        components: {
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
		background: rgba(250,250,250,0.90);
		box-shadow: 0 -1px 4px 0 #B5B5CD;
		.mint-tab-item{
			padding: 5px 0 2px 0;
			color: #929292;
			letter-spacing: 0.11px;
			.mint-tab-item-icon{
				margin-bottom: 4px;
				.iconfont{
					font-size: 22px;
				}
			}
			&.is-selected{
				background: rgba(250,250,250,0.90);
				color: #8684BC;
			}
		}
	}
</style>