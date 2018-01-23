<template>
	<div class="search-wrap">
		<header class="mint-header is-fixed">
			<el-row :gutter="10">
				<el-col :span="21">
					<el-autocomplete v-model="searchkey" :fetch-suggestions="querySearchAsync" placeholder="请输入搜索关键字" valueKey="text" prefix-icon="el-icon-search" @select="handleSelect" :trigger-on-focus="triggerOnFocus" clearable></el-autocomplete>
				</el-col>
				<el-col :span="3"><el-button type="text">取消</el-button></el-col>
			</el-row>
		</header>
		<div class="search-content">
			<ul>
				<li></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { searchList } from '../../api/api';
	export default {
		data(){
			return {
				history: '',
				searchkey:'',
				triggerOnFocus: false 			
			}
		},
		methods:{
			querySearchAsync(queryString, cb) { 
				if(queryString){
					var params = {
						searchkey: queryString
					};
					searchList(params).then((res)=>{
						var results = res.data;
						cb(results); 
					});
				}else{
					cb([]);
				}
			}, 
			handleSelect(item) { 
				console.log(item); 
				this.$router.push({path:this.history});
			},
			callback(){
				this.router.path(this.history);
			}
		},
		mounted(){
			this.history = this.$route.query.history;
			console.log('history',this.history)
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	
</style>
