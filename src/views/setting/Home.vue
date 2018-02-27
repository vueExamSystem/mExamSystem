<template>
	<section>
		<div v-show="!isUpdatepwdVisible">
			<mt-header title="个人信息" fixed>
			    <mt-button slot="right" @click="logOut">退出登录</mt-button>
			</mt-header>
			<div class="main">
				<div class="content" v-loading="listenLoading">
					<div class="display-box" v-if="!listenLoading">
						<div class="clearfix">
							<div class="pull-left" style="width:30%;padding-top:30px;text-align:center;color: #8684BC;">
								<span class="iconfont icon-student-larger" style="font-size: 60px;"></span>
							</div>
							<ul class="pull-right" style="width:70%">
								<li>{{userName}}（{{studentNo}}）</li>
								<li>{{classInfo}}</li>
								<li>{{school}}</li>
							</ul>
						</div>
						<div class="display-box-footer">
							<span>账号：{{userId}}</span>
							<mt-button class="pull-right" type="primary" @click="showUpdatePwd">修改密码</mt-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isUpdatepwdVisible">
			<update-password @close="hideUpdatePwd"></update-password>
		</div>
	</section>
</template>
<script>
	import { getUserInfo } from '../../api/api';
	import Password from './Password.vue'
	export default {
		components:{
			updatePassword: Password
		},
		data(){
			return {
				userId: '',//账号
                studentNo: '',//学号
                userName: '',//姓名
                school: '',//学校名称
                grade: '',//级别
                department: '',//院系 
                class: '',//班级
                listenLoading: true,
                isUpdatepwdVisible: false
			}
		},
		computed:{
			classInfo(){
				var grade = this.grade;
				if(this.grade){//年
					grade = grade.substr(2,2);
				}
				return this.department ;
				//return grade + '级' + this.department + this.class + '班';
			}
		},
		methods:{
			init(){
				getUserInfo().then(res=>{
					this.userId = res.data.userId;
					this.studentNo = res.data.userAccount;
					this.userName = res.data.userName;
					this.school = res.data.school;
					this.grade = res.data.grade;
					this.department = res.data.department;
					this.class = res.data.class;
					this.listenLoading = false;
				})
			},
			logOut(){
				this.$router.push('/login');
			},
			showUpdatePwd(){
				this.isUpdatepwdVisible = true;
			},
			hideUpdatePwd(){
				this.isUpdatepwdVisible = false;
			}
		},
		mounted() {
			this.init();
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
	
</style>