<template>
  <div
    class="buy-detail-box"
    ref="scrollBox"
  >
    <div
      class="detail-container"
      style="padding-bottom: 152px;"
      v-if='seatsData'
    >
      <div class="detail-top">
        <div class="order-info">
          <div class="order-title">
            <span class="movie-name">{{seatsData.seatsLocked[0].showName}}</span>
            <span class="ticket-num">{{ticketList.length}}张</span>
          </div>
          <div class="brief">明天 {{seatsData.schedule.showTime}} ({{seatsData.schedule.showVersion}})</div>
          <div class="brief">{{seatsData.seatsLocked[0].cinemaName}}</div>
          <div class="brief">{{seatsData.seatsLocked[0].hallName}}(大)免费停车2小时 <label
              v-for='(seat,index) in ticketList'
              :key="index"
            >{{seat}}</label></div>
        </div>
        <div class="count-dowm">
          {{payTime}}
        </div>
      </div>
      <div class="order-option">
        <div class="box special">
          特惠活动
          <div class="special-price">
            {{specialPrice}}元
            <input
              type="checkbox"
              class="checke"
              ref="chooseBtn"
              @click="chooseSpecial()"
            >
          </div>
        </div>
        <div class="box discount">
          电影优惠券
          <div class="coupon">无优惠券</div>
        </div>
        <div class="box total-price">
          票价总计
          <div class="price">{{totalPrice}}元</div>
        </div>
      </div>
      <div
        class="phone-num"
        @click="openPhone()"
      >
        <div class="phone">
          <div class="title">
            <div class="list-title">手机号</div>
            <div class="gray">购票成功后，会收到取票码短信</div>
          </div>
          <div class="num">
            {{phoneNum}}
          </div>
        </div>
      </div>
      <div class="notice">
        <div class="content">
          <div class="notice-title">购票须知</div>
          <ul class="rule">
            <li>1. 请提前到达影院现场，找到自助取票机，打印纸质电影票，完成取票。</li>
            <li>2. 如现场自助取票机无法打印电影票，请联系影院工作人员处理。</li>
            <li>3. 凭打印好的纸质电影票，检票入场观影。</li>
            <li>4. 如果订单使用了兑换券，或购买了特殊场次，暂不支持退票和改签。</li>
            <li>5. 如有开具所购电影票发票的需求，请保留好电影票根，尽量在观影当天联系影城工作人员进行开具，如遇特殊情况请及时联系淘票票人工客服咨询。</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="pay-tip">
        <span>退改签须知</span>
        <span>
          应付
          <label>{{totalPrice}}元</label>
        </span>
      </div>
      <div
        class="pay-btn"
        @click="payClick()"
      >立即付款</div>
    </div>
    <EditPhoneNum
      v-show="isShowPhone"
      ref="editPhone"
    ></EditPhoneNum>
    <transition name="fade">
      <Modal ref="alerts"></Modal>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Modal from "../../public/Modal";
import EditPhoneNum from "./EditPhoneNum";
export default {
  props: ["seatsData", "ticketList"],
  data() {
    return {
      specialPrice: -4.2,
      totalPrice: 0,
      phoneNum: "",
      isShowPhone: false,
      payTime: "15:00",
      countDownTime: 15 * 60
    };
  },
  components: {
    EditPhoneNum,
    Modal
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.detailScroll) {
          this.detailScroll = new BScroll(this.$refs.scrollBox, {
            scrollY: true,
            click: true
          });
        } else {
          this.detailScroll.refresh();
        }
      });
    },
    countDown() {
      var time = this;
      var timer = setInterval(function() {
        if (!time.$parent.isShowDetail) {
          clearInterval(timer);
          time.countDownTime = 15 * 60;
        }
        time.countDownTime--;
        if (time.countDownTime <= 0) {
          clearInterval(timer);
          time.$refs.alerts.opts = {
            content: "付款超时，请重新提交订单",
            buttons: {
              确定: () => {
                time.$parent.isShowDetail = false;
                time.$refs.alerts.isShowModal = false;
                time.countDownTime = 15 * 60;
              }
            }
          };
          time.$refs.alerts.isShowModal = true;
        }
        let h = parseInt(time.countDownTime / 60);
        let H = h > 9 ? h : "0" + h;
        let m = time.countDownTime - h * 60;
        let M = m > 9 ? m : "0" + m;
        time.payTime = H + ":" + M;
      }, 1000);
    },
    chooseSpecial() {
      if (this.$refs.chooseBtn.checked) {
        this.totalPrice += this.specialPrice;
      } else {
        this.totalPrice -= this.specialPrice;
      }
    },
    openPhone() {
      this.isShowPhone = true;
      this.phoneNum = this.seatsData.mtopSeatMap.userPhone;
      this.$refs.editPhone.phoneNum = this.phoneNum;
    },
    payClick() {
      let modal = this;
      this.$refs.alerts.isShowModal = true;
      this.$refs.alerts.opts = {
        content: "暂未开通付款功能",
        buttons: {
          确定: () => {
            modal.$refs.alerts.isShowModal = false;
          }
        }
      };
    }
  },
  updated() {
    this._initScroll();
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/transition.css";
.buy-detail-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  .detail-top {
    position: relative;
    width: 100%;
    height: 155px;
    background-image: linear-gradient(-48deg, #7889aa, #96a3bc);
    .order-info {
      position: relative;
      top: 20%;
      left: 5%;
      width: 75%;
      height: 100px;
      .order-title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        .movie-name {
          display: inline-block;
          max-width: 80%;
          font-size: 22px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ticket-num {
          margin: 4px 0 0 4px;
          font-size: 13px;
          color: #fff;
          vertical-align: text-bottom;
        }
      }
      .brief {
        max-width: 100%;
        height: 15px;
        line-height: 17px;
        font-size: 13px;
        color: #fff;
        margin-top: 6.5px;
        label {
          margin-right: 5px;
        }
      }
    }
    .count-dowm {
      position: absolute;
      top: 35px;
      right: 0;
      width: 52px;
      height: 22px;
      padding-left: 9px;
      padding-right: 5px;
      border-radius: 22px 0 0 22px;
      background-color: #9aa7bf;
      background-image: url("../../assets/img/clock.png");
      background-size: 15px;
      background-repeat: no-repeat;
      background-position: 5px 3.5px;
      line-height: 22px;
      text-align: right;
      color: #fff;
    }
  }
  .order-option {
    width: 100%;
    background-color: #fff;
    .box {
      width: 90%;
      height: 55px;
      margin: 0 auto;
      line-height: 55px;
      color: #50505a;
      font-size: 15px;
      &.special {
        .special-price {
          float: right;
          width: 23%;
          height: 55px;
          color: #ff4d64;
          font-size: 14px;
          .checke {
            float: right;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            -webkit-appearance: none;
            width: 30px;
            height: 16px;
            line-height: 16px;
            background: #eee;
            border-radius: 30px;
            outline: none;
          }
          .checke:before {
            position: absolute;
            top: 2px;
            left: 0;
            content: "";
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0px 0px 5px #ddd;
            transition: all 0.2s linear;
          }

          .checke:checked {
            background: #6dc772;
          }
          .checke:checked:before {
            left: 18px;
            transition: all 0.2s linear;
          }
        }
      }
      &.discount {
        border: 1px solid #f7e0e0;
        border-left: 0;
        border-right: 0;
        .coupon {
          float: right;
          width: 17%;
          font-size: 13px;
          text-align: right;
          color: #c8c8c8;
        }
      }
      &.total-price {
        .price {
          float: right;
          width: 25%;
          text-align: right;
          color: #ff4d64;
        }
      }
    }
  }
  .phone-num {
    width: 100%;
    background-color: #fff;
    margin: 8px 0;
    .phone {
      width: 90%;
      height: 70px;
      margin: 0 auto;
      .title {
        float: left;
        width: 55%;
        height: 70px;
        color: #50505a;
        .list-title {
          width: 100%;
          margin-top: 12px;
          font-size: 15px;
          color: #000;
        }
        .gray {
          width: 100%;
          margin-top: 5px;
          color: #666;
          font-size: 12px;
        }
      }
      .num {
        float: right;
        width: 35%;
        height: 70px;
        line-height: 70px;
        text-align: left;
        background: url("../../assets/img/right.png") no-repeat;
        background-position: center right;
        background-size: 25px;
      }
    }
  }
  .notice {
    width: 100%;
    background-color: #fff;
    .content {
      width: 90%;
      padding-bottom: 20px;
      margin: 0 auto;
      .notice-title {
        width: 100%;
        height: 55px;
        margin: 0 auto;
        border-bottom: 1px solid #f7e0e0;
        line-height: 55px;
        color: #50505a;
        font-size: 15px;
      }
      .rule {
        li {
          margin-top: 10px;
          line-height: 20px;
          color: #999;
        }
      }
    }
  }
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 113px;
    background-color: #fff;
    .pay-tip {
      width: 90%;
      height: 55px;
      line-height: 55px;
      margin: 0 auto;
      border-top: 1px solid #f7e0e0;
      span {
        display: inline-block;
        height: 55px;
        font-size: 15px;
        color: #333;
        &:nth-of-type(2) {
          width: 30%;
          float: right;
          font-size: 14px;
          color: #999;
          label {
            color: #ff4d64;
            font-size: 20px;
          }
        }
      }
    }
    .pay-btn {
      width: 100%;
      height: 58px;
      text-align: center;
      line-height: 58px;
      background-image: linear-gradient(45deg, #ff7ba0, #ff4d64);
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
