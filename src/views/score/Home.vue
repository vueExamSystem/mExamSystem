<template>
	<section>
		<header class="mint-header is-fixed">
			<div class="mint-header-title">
				<el-select class="el-form-select" v-model="termValue" placeholder="请选择">
				    <el-option
				      v-for="item in termOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
		</header>
		<div class="main">
			<div class="content">
				<div class="display-box">
					<table class="score-info score-best">
						<tr>
							<td width="28%" class="score-grade">
								<span>总体</span>
								<h3>90</h3>
							</td>
							<td width="32%" class="score-chapter">
								<div class="img-grade"></div>
							</td>
							<td width="40%" class="score-detail">
								<mt-button type="primary" @click="showDetail(exam.id)">详细成绩</mt-button>
							</td>
						</tr>
					</table>
				</div>
				<section class="content-title" style="margin-top: 20px;">
					<el-select class="el-head-select" v-model="courseValue" placeholder="请选择">
					    <el-option
					      v-for="item in courseOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</section>
				<div class="score-statistics">
					<div id="echart">
						<score-echart></score-echart>
					</div>
					<div class="display-box" style="margin-top: 20px;">
						<ul>
							<li><span>大学物理（上）</span></li>
							<li>最高分/最低分：<span> 92 / 56</span></li>
							<li>平均分： <span>78</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import Echarts from './Echarts.vue';
	export default {
		components:{
			scoreEchart: Echarts
		},
		data(){
			return {
				termValue: '2017年-2018年第一学期',
				termOptions: [{
		          value: '2017年-2018年第一学期',
		          label: '2017年-2018年第一学期'
		        }, {
		          value: '2016年-2017年第二学期',
		          label: '2016年-2017年第二学期'
		        }, {
		          value: '2016年-2017年第一学期',
		          label: '2016年-2017年第一学期'
		        }, {
		          value: '2015年-2016年第二学期',
		          label: '2015年-2016年第二学期'
		        }, {
		          value: '2015年-2016年第一学期',
		          label: '2015年-2016年第一学期'
		        }],
		        courseValue: '1',
		        courseOptions: [{
                    value: '1',
                    label: '大学物理'
                },{
                    value: '2',
                    label: '高等数学',
                },{
                    value: '3',
                    label: '电路逻辑'
                },{
                    value: '4',
                    label: '大学英语'
                }]
			}
		},
		methods:{

		},
		mounted() {
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	.score-statistics{
		padding: 20px 40px;
	}
</style>