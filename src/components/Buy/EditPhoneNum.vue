<template>
  <div class="edit-box">
    <div class="center-box">
      <div class="title">修改手机号</div>
      <div class="content">
        <input
          type="number"
          v-model="phoneNum"
        >
      </div>
      <div class="button">
        <button
          style="color:#108ee9"
          @click="editNum()"
        >确定</button>
        <button @click="closeEdit()">取消</button>
      </div>
    </div>
    <transition name="fade">
      <Modal ref="alerts"></Modal>
    </transition>
  </div>
</template>
<script>
import Modal from "../../public/Modal";
export default {
  name: "EditPhoneNum",
  data() {
    return {
      phoneNum: ""
    };
  },
  components: {
    Modal
  },
  methods: {
    editNum() {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      this.$parent.phoneNum = this.phoneNum;
      if (!myreg.test(this.phoneNum)) {
        let modal = this;
        this.$refs.alerts.isShowModal = true;
        this.$refs.alerts.opts = {
          content: "请输入正确的手机号码",
          width: "220px",
          buttons: {
            确定: () => {
              modal.$refs.alerts.isShowModal = false;
            }
          }
        };
      } else {
        this.$parent.isShowPhone = false;
        this.$parent.phoneNum = this.phoneNum;
      }
    },
    closeEdit() {
      this.$parent.isShowPhone = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/transition.css";
.edit-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .center-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 270px;
    height: 167px;
    border-radius: 6px;
    background-color: #fff;
    .title {
      width: 100%;
      height: 55px;
      line-height: 55px;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      color: #000;
    }
    .content {
      width: 100%;
      height: 50px;
      input {
        width: 240px;
        height: 36px;
        margin: 6px 0 0 8px;
        padding-left: 10px;
        border: 1px solid #ececec;
        border-radius: 5px;
        font-size: 14px;
        box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.4);
      }
    }
    .button {
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      button {
        border-left: 0 none;
        border-bottom-left-radius: 7px;
        display: block;
        width: 100%;
        height: 50px;
        line-height: 25px;
        padding: 12px 0 13px;
        font-size: 18px;
        background: 0 0;
        border: 0;
        outline: 0;
        border-left: 1px solid rgba(0, 0, 0, 0.05);
        -webkit-appearance: none;
        color: #000;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
}
</style>
