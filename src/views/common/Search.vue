<template>
	<div class="search-wrap">
		<header class="mint-header is-fixed">
			<el-row :gutter="10">
				<el-col :span="21">
					 <el-input placeholder="请输入搜索关键字" v-model="searchkey" @input="querySearchAsync">
					 	<i class="el-icon-search el-input__icon" slot="prefix" @click="handleIconSearch"></i>
						<i class="el-icon-circle-close el-input__icon" slot="suffix" @click="handleIconClear"></i>
					 </el-input>
				</el-col>
				<el-col :span="3"><el-button type="text" @click="callback">取消</el-button></el-col>
			</el-row>
		</header>
		<div class="main" style="min-height: 200px;" v-loading="listenLoading">
			<ul class="list-cell-view" v-if="!!results">
				<template v-if="searchkey && results.rows.length == 0">
					<li class="no-data"><span>没有搜到相关数据</span></li>
				</template>
				<template v-else>
					<li v-for="item in results.rows" @click="handleSelect(item)">
						<a>{{item.name}}</a>
					</li>
				</template>
			</ul>
		</div>
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
				results: null,
				listenLoading: false,
				timeHandle: ''
			}
		},
		methods:{
			querySearchAsync() {
				if(this.timeHandle){
					clearTimeout(this.timeHandle);
				} 
				this.timeHandle = setTimeout(()=>{
					if(this.searchkey){
						this.listenLoading = true;
						var params = {
							searchKey: this.searchkey,
							searchType: this.about,
						};
						searchList(params).then((res)=>{
							if(!this.searchkey){
								this.results = null;
							}else{
								this.results = res.data;
							}
							this.listenLoading = false;
							if(this.results.length>0){
								this.handleIconSearch();
							}
						});
					}else{
						this.results = null;
					}
				},200);
			}, 
			handleIconSearch(){
				if(!this.searchkey){
					this.$emit('loadall');
				}else{
					this.$emit('search', this.results);
				}
			},
			handleIconClear(){
				this.searchkey = '';
				this.results = null;
			},
			handleSelect(item) { 
				setTimeout(()=>{
					this.$emit('select', item);
				},300);
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
