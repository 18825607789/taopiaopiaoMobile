<template>
  <div>
    <transition name="fade">
      <div class="login-box">
        <div class="login-top">
          <div class="logo"></div>
        </div>
        <div class="login-form">
          <div class="list">
            <div class="list-item">
              <input
                type="text"
                placeholder="手机号/邮箱/会员名18825607789"
                v-model="userNameInp"
              >
            </div>
            <div class="list-item">
              <input
                type="password"
                placeholder="请输入密码88888888"
                v-model="passwordInp"
              >
            </div>
          </div>
          <div class="link">
            <a href="#">免费注册</a>
            <a href="#">忘记密码</a>
          </div>
          <div class="login-btn">
            <button @click="loginBtn()">登录</button>
          </div>
        </div>
        <transition name="fade">
          <Modal ref="alerts"></Modal>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import Modal from "../public/Modal";
export default {
  name: "Login",
  data() {
    return {
      userNameInp: "",
      passwordInp: "",
      userName: "18825607789",
      passWord: "88888888"
    };
  },
  components: {
    Modal
  },
  methods: {
    loginBtn() {
      let phoneAndEmailReg = /(^[1][3,4,5,7,8][0-9]{9}$)|(^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$)/;
      let modal = this;
      if (
        this.userNameInp === this.userName &&
        this.passwordInp === this.passWord
      ) {
        sessionStorage.setItem("username", this.userNameInp);
        sessionStorage.setItem("password", this.passwordInp);
        this.$refs.alerts.isShowModal = true;
        this.isLogin();
        this.$refs.alerts.opts = {
          content: "登录成功"
        };
        setTimeout(() => {
          this.$router.go(-1); // 返回上一个路由
        }, 1000);
      } else if (!phoneAndEmailReg.test(this.nameInp)) {
        this.$refs.alerts.isShowModal = true;
        this.$refs.alerts.opts = {
          content: "请输入正确的手机号码或邮箱",
          width: "220px",
          buttons: {
            确定: () => {
              modal.$refs.alerts.isShowModal = false;
            }
          }
        };
      } else {
        this.$refs.alerts.isShowModal = true;
        this.$refs.alerts.opts = {
          content: "请正确输入用户名及密码",
          width: "220px",
          buttons: {
            确定: function() {
              modal.$refs.alerts.isShowModal = false;
            }
          }
        };
      }
    },
    isLogin() {
      this.$store.commit("changeLogin", true);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/transition.css";
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #fff;
  .login-top {
    position: relative;
    width: 100%;
    height: 130px;
    .logo {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 21%;
      height: 62%;
      background: url(https://gw.alicdn.com/tfs/TB1p.BGQXXXXXbFXFXXXXXXXXXX-160-160.png)
        no-repeat;
      background-size: contain;
    }
  }
  .login-form {
    width: 100%;
    .list {
      width: 88%;
      margin: 0 auto;
      .list-item {
        width: 100%;
        height: 40px;
        margin-top: 40px;
        border-bottom: 1px solid #ff5000;
        input {
          width: 85%;
          height: 30px;
          padding: 0 2.5%;
          margin-top: 8px;
          font-size: 18px;
          border: 0;
          &::placeholder {
            color: #adadad;
          }
        }
      }
    }
    .link {
      display: flex;
      width: 85%;
      padding-top: 20px;
      margin: 0 auto;
      justify-content: space-between;
      a {
        color: #555;
        font-size: 13px;
      }
    }
    .login-btn {
      width: 85%;
      margin: 40px auto;
      button {
        width: 100%;
        height: 45px;
        background: -webkit-linear-gradient(left, #ff9000, #ff5000) no-repeat;
        color: #fff;
        box-shadow: 0 0.08rem 0.16rem #f7c7b1;
        border: 0;
        border-radius: 20px;
        font-size: 18px;
        outline: none;
      }
    }
  }
}
</style>
