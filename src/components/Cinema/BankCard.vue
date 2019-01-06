<template>
  <div
    class="bank-card-box"
    ref="backCardBox"
  >
    <div
      class="scroll-box"
      ref="scrollBox"
    >
      <div class="header">
        <span @click="closeBankCard()"></span>
        <div class="title">
          淘票票银行活动
        </div>
      </div>
      <div class="bank-container">
        <div
          class="bank-box"
          v-for="(bank,index) in bankData"
          :key="index"
        >
          <div class="img-box">
            <img
              class="bank-icon"
              :src="'//gw.alicdn.com/' + bank.bigPicUrl"
            >
          </div>
          <div class="info-box">
            <div class="text title">{{bank.activityTitle}}</div>
            <div class="text quota">名额：{{bank.quota}}</div>
            <div class="text erea">地区：{{bank.area}}</div>
          </div>
          <div
            class="btn-box"
            :class="{con:!bank.tag}"
            @click="openModal()"
          >{{bank.tag}}</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <Modal v-show="isShowModal" ref="alerts"></Modal>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Modal from "../../public/Modal";

export default {
  name: "BankCard",
  data() {
    return {
      bankData: "",
      isShowModal: false
    };
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.bankScroll) {
          this.bankScroll = new BScroll(this.$refs.backCardBox, {
            scrollY: true,
            click: true
          });
        } else {
          this.bankScroll.refresh();
        }
      });
    },
    closeBankCard() {
      this.$parent.isBankCard = false;
    },
    openModal() {
      let modal = this;
      this.$refs.alerts.opts = {
        content: "办卡功能暂未开启 ，请谅解",
        buttons: {
          确定: function() {
            modal.$refs.alerts.isShowModal = false;
          }
        }
      };
      this.$refs.alerts.isShowModal = true;
    }
  },
  created() {
    this.$http.get("/api/bankCardData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.bankData = res.data.returnValue;
      }
    });
  },
  mounted() {
    this._initScroll();
  },
  updated() {
    this._initScroll();
  },
  components: {
    Modal
  }
};
</script>
<style lang="scss" scoped>
.bank-card-box {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  .scroll-box {
    width: 100%;
    height: auto;
    .header {
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      border-bottom: 1px solid #e2e2e2;
      span {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        display: block;
        width: 20px;
        height: 20px;
        background: url("../../assets/img/back.png") no-repeat center center;
        background-size: 100%;
      }
      .title {
        width: 50%;
        margin: 0 auto;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .bank-container {
      width: 100%;
      .bank-box {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .img-box {
          flex: 0 0 55px;
          height: 55px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info-box {
          flex: 0 0 225px;
          height: 60px;
          .text {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 16px;
            &.title {
              font-weight: bold;
              color: #222227;
            }
            &.quota {
              margin-top: 10px;
              font-size: 12px;
              line-height: 13px;
              color: #8a869e;
            }
            &.erea {
              margin-top: 7px;
              font-size: 12px;
              line-height: 13px;
              color: #8a869e;
            }
          }
        }
        .btn-box {
          flex: 0 0 50px;
          height: 28px;
          line-height: 28px;
          background-color: transparent;
          background-image: none;
          border-radius: 120px;
          border: 1px solid #84704b;
          text-align: center;
          color: #84704b;
          &.con {
            border: 0;
          }
        }
      }
    }
  }
}
</style>
