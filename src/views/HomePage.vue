<template>
	<div>
		<div class="home-main">
			<router-view></router-view>
		</div>
		<div class="nav nav-footer fixed">
			<ul class="clearfix">
				<li>
					<router-link to="/exam">
						<i class="iconfont icon-kaoshi-larger"></i>
		    			<span>考试</span>
					</router-link>
				</li>
				<li>
					<router-link to="/test">
						<i class="iconfont icon-ceyan-larger"></i>
		    			<span>测验</span>
					</router-link>
				</li>
				<li>
					<router-link to="/preview">
						<i class="iconfont icon-pencil-larger"></i>
		    			<span>预习</span>
					</router-link>
				</li>
				<li>
					<router-link to="/score">
						<i class="iconfont icon-score-larger"></i>
		    			<span>成绩</span>
					</router-link>
				</li>
				<li>
					<router-link to="/setting">
						<i class="iconfont icon-setting-larger"></i>
		    			<span>设置</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
		},
		mounted() {
		}
	}

</script>

<style lang="scss">
	@import '~scss_vars';
	.home-main{
		margin-bottom: 50px;
	}
	.nav.nav-footer.fixed{
		position:fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		box-shadow: 0 -1px 4px 0 #B5B5CD;
		&>ul{
			&>li{
				text-align: center;
				letter-spacing: 0.11px;
				width: 20%;
				float: left;
				&>a{
					display: block;
					padding: 6px 0 4px 0;
					color: #929292;
					.iconfont{
						font-size: 22px;
					}
					&>span{
						display: inline-block;
						width: 100%;
						font-size: 10px;
					}
					&.router-link-active{
						color: #8684BC;
					}
				}
			}
		}
	}
</style>