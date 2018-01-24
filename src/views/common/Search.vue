<template>
	<div class="search-wrap">
		<header class="mint-header is-fixed">
			<el-row :gutter="10">
				<el-col :span="21">
					<el-autocomplete v-model="searchkey" :fetch-suggestions="querySearchAsync" placeholder="请输入搜索关键字" valueKey="name" @select="handleSelect" :trigger-on-focus="triggerOnFocus" :select-when-unmatched="selectWhenUnmatched">
						<i class="el-icon-search el-input__icon" slot="prefix" @click="handleIconSearch"></i>
						<i class="el-icon-circle-close el-input__icon" slot="suffix" @click="handleIconClear"></i>
					</el-autocomplete>
				</el-col>
				<el-col :span="3"><el-button type="text" @click="callback">取消</el-button></el-col>
			</el-row>
		</header>
	</div>
</template>
<script>
	import { searchList } from '../../api/api';
	export default {
		props: {
			about: {//搜索关于
				required: true,
				default: 'exam'
			},
			value:{
				default: ''
			}
		},
		data(){
			return {
				searchkey: this.value,
				triggerOnFocus: false,
				selectWhenUnmatched: true
			}
		},
		methods:{
			querySearchAsync(queryString, cb) { 
				if(queryString){
					var params = {
						searchkey: queryString,
						type: this.about,
					};
					searchList(params).then((res)=>{
						var results = res.data;
						cb(results); 
					});
				}else{
					cb([]);
				}
			}, 
			handleIconSearch(ev){
			},
			handleIconClear(ev){
				this.searchkey = '';
				this.results = [];
			},
			handleSelect(item) { 
				this.$emit('callback', item);
			},
			callback(){
				this.$emit('close');
			}
		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	
</style>
