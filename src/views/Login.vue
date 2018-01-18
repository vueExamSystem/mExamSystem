<template>
  <div class="login-page">
    <form ref="loginForm" class="login-container">
      <div class="title"><img src="/static/images/logo.png"></div>
      <mt-field placeholder="请输入账号" v-model="loginForm.account" disableClear>
        <i class="iconfont icon-user-larger"></i>
      </mt-field>
      <mt-field type="password" placeholder="请输入密码" v-model="loginForm.checkPass" disableClear>
        <i class="iconfont icon-lock-larger"></i>
      </mt-field>
      <mt-button type="primary" @click.native.prevent="handleSubmit"><i v-show="logining" class="fa fa-spinner fa-pulse fa-fw"></i>
<span class="sr-only">Loading...</span>登录</mt-button>
    </form>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  export default {
    data() {
      return {
        loginForm: {
          account: 'admin',
          checkPass: '123456'
        },
        logining: false
      };
    },
    methods: {
      alertError(msg){
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 1000
        });
      },
      handleSubmit(ev) {
        var valid = true;
        if(!this.loginForm.account){
          valid = false;
          this.alertError('请输入账号');
        }
        if(!this.loginForm.checkPass){
          valid = false;
          this.alertError('请输入密码');
        }
        if (valid) {
            this.logining = true;
            var loginParams = { username: this.loginForm.account, password: this.loginForm.checkPass };
            requestLogin(loginParams).then(res => {
              this.logining = false;
              let { msg, code, data } = res;
              if (code !== 200) {
                this.alertError(msg);
              } else {
                this.$store.dispatch('setToken', data.token);
                let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({ path: redirectUrl });
              }
            }).catch((error)=>{
              console.log('error',error)
            });
          } else {
            return false;
          }
      }
    }
  }

</script>

<style lang="scss">
  .login-page{
    padding-top: 120px;
    height: 100%;
    background-image: linear-gradient(-180deg, #C6ADD1 0%, #9DAFD0 50%, #ABA9CE 100%);
    .login-container {
      width: 300px;
      margin: 0 auto;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .mint-field{
        position:relative;
        border-radius: 50px;
        margin-bottom: 20px;
        .mint-cell-value{
          padding-left: 50px;
        }
        .mint-field-other{
          position:absolute;
          top:0;
          left:0;
          right: auto;
          width:50px;
          height:28px;
          margin-top: 11px;
          line-height: 28px;
          padding-left: 20px;
          color: #8684BC;
          border-right: 1px solid #B5B5CD;
        }
      }
      .mint-button--primary{
        margin-top: 40px;
        width: 100%;
        height: 40px;
        background-image: linear-gradient(-90deg, #AA84BC 0%, #8684BC 100%);
        border-radius: 25px;
      }
    }
  }
</style>