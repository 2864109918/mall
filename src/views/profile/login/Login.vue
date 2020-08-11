<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">登录/注册</div>
    </nav-bar>
    <div class="center">
      <div class="welcome-to-login">欢迎登录</div>
      <div class="login-method">
        <div class="possword-login" >密码登录</div>
        <div class="note-login" >注册账号</div>
      </div>
      <div class="login-info">
        <div class="phone-num">
          <div>
            <img src="~assets/img/profile/phone.svg" alt="">
            手机号</div>
          <input type="text"  placeholder="请输入手机号或用户名">
        </div>
        <div class="possword">
          <div>
            <img src="~assets/img/profile/possword.svg" alt="">
            密码</div>
          <input type="text" placeholder="请输入密码">
        </div>
      </div>
      <div class="user-login"><span>登录</span></div>
      <div class="user-help">
        <span>忘记密码？</span>
        <span>立即注册></span>
      </div>
      <div class="other-login">
        <div>- 第 三 方 登 录 -</div>
        <img src="~assets/img/profile/QQ.svg" alt="">
        <img src="~assets/img/profile/微信.svg" alt="">
        <img src="~assets/img/profile/微博.svg" alt="">
        
      </div>
      <div class="agreement">
        <input type="radio">
        我已阅读并同意<span>《使用协议》</span>和<span>《隐私政策》</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Login",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.nav-bar {
  background: #baf;
  color: #fff;
}

.center{
  /* height: 100vh; */
  padding-top: 30px;
}
.welcome-to-login{
  display: flex;
  justify-content: space-evenly;
  font-size: 24px;
  color: #f00;
}

.login-method{
  display: flex;
  justify-content: space-evenly;
  margin: 30px;
  font-size: 18px;
}

.possword-login{
  color: #f00;
  border-bottom: 2px solid rgba(255, 0, 0, 1);
}

.login-info{
  display: flex;
  flex-direction: column;
  margin: 30px 0 30px 50px;
  font-size: 15px;
}

.phone-num{
  margin-bottom: 20px;
}
.phone-num input,
.possword input{
  border-radius: 20px;
  height: 30px;
  width: 80%;
  margin-top: 10px;
}
.user-login{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
}

.user-login span{
  display: flex;
  width: 250px;
  height: 50px;
  background:#baf;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  border-radius: 50px;
}

.user-help{
  display: flex;
  justify-content: space-evenly;
  font-size: 14px;
  margin-bottom: 30px;
}

.other-login{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center; 
}

.other-login div{
  width: 100%;
  height: 30px;
}

.other-login img{
  width: 50px;
  height: 50px;
}

.agreement{
  margin-top: 45px;
  margin-left: 20px;
  font-size: 14px;
}

.agreement span{
  color: blue;
}
</style>