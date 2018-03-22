<template>
	<section>
		<mt-header title="修改密码" fixed>
		    <mt-button slot="left" icon="back" @click="back">返回</mt-button>
		</mt-header>
		<div class="main">
			<div class="content" v-loading="maskLoading">
				<div class="display-box">
					<ul>
						<li>
							<mt-field placeholder="请输入原密码" type="password" v-model="oldPwd"></mt-field>
						</li>
						<li>
							<mt-field placeholder="请输入新密码" type="password" v-model="newPwd"></mt-field>
						</li>
						<li>
							<mt-field placeholder="请确认新密码" type="password" v-model="againPwd"></mt-field>
						</li>
					</ul>
					<div class="display-box-footer">
						<mt-button class="pull-right" type="primary" @click="confirmUpdate">修改密码</mt-button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	import { updatePassword } from '../../api/api';
	export default {
		data(){
			return {
				oldPwd: '',
				newPwd: '',
				againPwd: '',
				maskLoading: false
			}
		},
		methods:{
			back(){
				this.$emit('close');
			},
			alertInfo(msg){
				this.$toast({
			        message: msg,
			        position: 'middle',
			        duration: 1000
		        });
			},
			validateForm(){//验证输入
				var isValid = true;
				if(!this.oldPwd){
					this.alertInfo('请输入原密码');
					isValid = false;
					return isValid;
				}
				if(!this.newPwd){
					this.alertInfo('请输入新密码');
					isValid = false;
					return isValid;
				}
				if(!this.againPwd){
					this.alertInfo('请确认新密码');
					isValid = false;
					return isValid;
				}
				if(this.newPwd != this.againPwd){
					this.alertInfo('两次密码输入不一致');
					isValid = false;
					return isValid;
				}
				return isValid;
			},
			confirmUpdate(){
				if(this.validateForm()){
					this.maskLoading = true;
					var params = {
						oldPwd: this.oldPwd,
						newPwd: this.againPwd,
						againPwd: this.againPwd
					};
					updatePassword(params).then(res => {
						var msg = '';
						if(res.code === 0){
					        msg = '密码修改成功!'
						}else{
							msg = res.msg;
						}
						this.alertInfo(msg);
						this.maskLoading = false;
						if(res.code==0){
							this.$emit('close');
						}
					});
				}
			}
		}
	}
</script>