<template>
	<section>
		<mt-header title="筛选" fixed>
		    <mt-button slot="left" icon="back" @click="back">返回</mt-button>
			<span @click="confirm" slot="right">确定</span>
		</mt-header>
		<div class="main">
			<el-tabs type="card" tab-position="left" style="height: 100%;">
			    <el-tab-pane label="发布时间">
			    	<el-radio-group class="tab-radio-group" v-model="timeValue">
						<el-radio v-for="option in timeOption" :label="option.value">{{option.label}}</el-radio>
					</el-radio-group>
			    </el-tab-pane>
			    <el-tab-pane label="所属课程">
			    	<div v-loading="courseLoading" style="min-height:200px;">
			    		<el-radio-group class="tab-radio-group" v-if="!courseLoading" v-model="courseValue">
							<el-radio v-for="option in courseOption" :label="option.value">{{option.label}}</el-radio>
						</el-radio-group>
			    	</div>
			    </el-tab-pane>
			    <!-- <el-tab-pane label="预习状态">
			    	<el-radio-group class="tab-radio-group" v-model="stateValue">
						<el-radio v-for="option in stateOption" :label="option.value">{{option.label}}</el-radio>
					</el-radio-group>
			    </el-tab-pane> -->
			</el-tabs>
		</div>
	</section>
</template>
<script>
	import { getUserCourse } from '../../api/api'
	export default {
		data(){
			//数据后台可相应更改
			return {
				timeValue: "month",//发布时间
				timeOption: [
					{
					    label: "近一周",
					    value: "week"
					},
					{
					    label: "近一个月",
					    value: "month"
				    },
					{
					    label: "近半年",
					    value: "halfYear"
					},
					{
					    label: "近一年",
					    value: "year"
					},
					{
					    label: "不限",
					    value: "all"
					}
				],
				courseValue: "",//所属课程
				courseOption: [],
				stateValue: "0",//预习状态
				// stateOption: [
				// 	{
				// 	    label: "全部",
				// 	    value: "0,1"
				// 	},
				// 	{
				// 	    label: "已预习",
				// 	    value: "1"
				// 	},
				// 	{
				// 	    label: "未预习",
				// 	    value: "0"
				// 	}],
				courseLoading: true
			}
		},
		methods:{
			init(){
				//获取用户所有课程
				getUserCourse().then(res=>{
					this.courseOption = res.data.map(course=>{
						return {
							label: course.name,
							value: course.id
						}
					});
					this.courseValue = this.courseOption[0].value;
					this.courseLoading = false;
					this.confirm();
				});
			},
			back(){
				this.$emit("close");
			},
			confirm(){
				var params = {
					publishTime: this.timeValue,//发布时间
					courseId: this.courseValue,//所属课程
					state: this.stateValue//预习状态
				};
				this.$emit("confirm", params);
			}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style lang="scss" scoped>
	@import "~scss_vars";
	.main{
		margin: 0;
		position: absolute;
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index:0;
	}
</style>