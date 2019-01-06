<template>
  <div
    class="ticket-detail"
    ref="detailBox"
  >
    <div>
      <div class="header">
        <span @click="closeTicketDetail()"></span>
        <div class="title">
          我的电影票
        </div>
      </div>
      <div class="container-box">
        <div class="order-top">
          <div class="movie-info">
            <div class="info">
              <div class="ticket-title">{{ticketDetailData.title}}</div>
              <div class="showtime ticket-brief">{{ticketDetailData.showTime | getDateTimes}}~{{ticketDetailData.showEndTime | getTimes}}（{{ticketDetailData.version}}）</div>
              <div class="cinemaname ticket-brief">{{ticketDetailData.cinemaName}}&nbsp;&nbsp;{{ticketDetailData.hallName}}</div>
              <div class="seatinfo ticket-brief">
                <span
                  v-for='(seat,index) in ticketDetailData.seatInfo'
                  :key="index"
                >{{seat}}</span>
              </div>
              <div class="egg-container ticket-brief">
                <span class="egg">片尾有1个彩蛋，不要错过</span>
              </div>
            </div>
            <div class="poster">
              <img :src="'//gw.alicdn.com/'+ ticketDetailData.logoUrl +'_320x320Q30s150.jpg'">
            </div>
          </div>
        </div>
        <div class="split-line">
          <div class="circle left"></div>
          <div class="circle right"></div>
          <div class="middle-line"></div>
        </div>
        <div class="order-middle">
          <div class="container">
            <div class="title">取电影票</div>
            <div class="ticket-code">
              <canvas
                class="qrcode"
                ref="canvas"
              ></canvas>
            </div>
            <div class="ticket-count">{{ticketDetailData.count}}张电影票</div>
            <div class="code-num">
              兑换码：<S>{{ticketDetailData.tbOrderId}}</S>
            </div>
          </div>
        </div>
        <div class="split-line">
          <div class="circle left"></div>
          <div class="circle right"></div>
          <div class="middle-line"></div>
        </div>
        <div class="order-bottom">
          <div class="ticket-cinema">
            <div class="cinema-info">
              <div class="cimema-name">{{ticketDetailData.cinemaName}}</div>
              <div class="cinema-address">{{ticketDetailData.address}}</div>
            </div>
            <div class="phone-icon"></div>
          </div>
          <div class="order-info">
            <div class="container">
              <div class="order-title">
                实付金额
                <span class="price">{{ticketDetailData.amount / 100}}元</span>
              </div>
              <div class="order-brief">订单号：{{ticketDetailData.tradeNo}}</div>
              <div class="order-brief">购买时间：{{ticketDetailData.showTime | getDateTimes}}</div>
              <div class="order-brief">手机号：188 2560 7789</div>
              <div class="order-brief">电影票由{{ticketDetailData.providerName}}提供</div>
            </div>
          </div>
          <div class="ticket-notice">
            <div class="notice-title">观影须知</div>
            <ul class="rule">
              <li>1. 请提前到达影院现场，找到自助取票机，打印纸质电影票，完成取票。</li>
              <li>2. 如现场自助取票机无法打印电影票，请联系影院工作人员处理。</li>
              <li>3. 凭打印好的纸质电影票，检票入场观影。</li>
              <li>4. 如果订单使用了兑换券，或购买了特殊场次，暂不支持退票和改签。</li>
              <li>5. 如有开具所购电影票发票的需求，请保留好电影票根，尽量在观影当天联系影城工作人员进行开具，如遇特殊情况请及时联系淘票票人工客服咨询。</li>
            </ul>
          </div>
          <div class="delete-btn">
            <button @click="removeOrder(ticketDetailData.cinemaId)">删除订单</button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <Modal ref="alerts"></Modal>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import QRCode from "qrcode";
import Modal from "../../public/Modal";
import { getDateTime } from "../../assets/js/getDateTime.js";
export default {
  name: "TicketDetail",
  props: ["ticketDetailData"],
  components: {
    Modal
  },
  watch: {
    ticketDetailData(newValue, oldValue) {
      this.useqrcode();
    }
  },
  filters: {
    getDateTimes(time) {
      return getDateTime(time, "yyyy-MM-dd hh:mm");
    },
    getTimes(time) {
      return getDateTime(time, "hh:mm");
    }
  },
  methods: {
    closeTicketDetail() {
      this.$parent.isTicketDetail = false;
    },
    _initScroll() {
      this.$nextTick(() => {
        if (!this.ticketScroll) {
          this.ticketScroll = new BScroll(this.$refs.detailBox, {
            scrollY: true,
            click: true
          });
        } else {
          this.ticketScroll.refresh();
        }
      });
    },
    useqrcode() {
      if (this.ticketDetailData.tradeNo) {
        QRCode.toCanvas(this.$refs.canvas, this.ticketDetailData.tbOrderId, {
          color: {
            dark: "#aaa",
            light: "#0000"
          }
        });
      }
    },
    removeOrder(id) {
      let orderList = this.$parent.movieTicketData.orders;
      for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].cinemaId === id) {
          let modal = this;
          this.$refs.alerts.opts = {
            content: "确定要删除电影名为《" + orderList[i].title + "》的订单吗",
            width: "220px",
            buttons: {
              确定: () => {
                orderList.splice(i, 1);
                modal.$refs.alerts.isShowModal = false;
                modal.$refs.alerts.opts = {
                  content: "删除成功"
                };
                setTimeout(function() {
                  modal.$parent.isTicketDetail = false;
                  modal.$refs.alerts.isShowModal = false;
                }, 300);
                modal.$refs.alerts.isShowModal = true;
              },
              取消: () => {
                modal.$refs.alerts.isShowModal = false;
              }
            }
          };
          this.$refs.alerts.isShowModal = true;
          return;
        }
      }
    }
  },
  mounted() {
    this._initScroll();
    this.useqrcode();
  },
  updated() {
    this._initScroll();
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/transition.css";
.ticket-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #424447;
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
  .container-box {
    width: 95%;
    height: auto;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px auto;
    background-color: #fff;
    .order-top {
      width: 100%;
      height: 200px;
      .movie-info {
        width: 90%;
        height: 85%;
        margin: 0 auto;
        padding-top: 30px;
        .info {
          float: left;
          width: 200px;
          height: 190px;
          .ticket-title {
            width: 100%;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 25px;
            font-weight: bold;
          }
          .ticket-brief {
            width: 100%;
            line-height: 25px;
            font-size: 12px;
            color: #333;
            &.showtime {
              margin-top: 5px;
            }
            &.cinemaname {
              font-weight: bold;
            }
            &.seatinfo {
              color: #999;
              span {
                margin-right: 10px;
              }
            }
          }
          .egg {
            position: relative;
            display: inline-block;
            color: #fff;
            font-size: 10px;
            height: 16px;
            line-height: 16px;
            border-radius: 8px;
            padding-left: 17px;
            padding-right: 7px;
            background-color: #fea54c;
          }
          .egg::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 15px;
            height: 17px;
            background-image: url("../../assets/img/egg.png");
            background-position: 0;
            background-repeat: no-repeat;
            background-size: auto 17px;
          }
        }
        .poster {
          float: right;
          width: 80px;
          height: 110px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .order-middle {
      width: 100%;
      height: 330px;
      .container {
        width: 90%;
        height: 95%;
        margin: 0 auto;
        .title {
          width: 100%;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 22px;
          font-weight: bold;
        }
        .ticket-code {
          position: relative;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 160px;
          .qrcode {
            width: 100% !important;
            height: 100% !important;
          }
        }
        .ticket-code::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: 50%;
          background-image: url("../../assets/img/endIcon.png");
        }
        .ticket-count {
          margin-top: 20px;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
        .code-num {
          width: 80%;
          height: 55px;
          margin: 25px auto;
          border: 1px solid #c8c8c8;
          text-align: center;
          line-height: 55px;
          color: #c8c8c8;
          s {
            font-size: 16px;
          }
        }
      }
    }
    .order-bottom {
      width: 100%;
      height: 690px;
      .ticket-cinema {
        width: 85%;
        height: 100px;
        margin: 0 auto;
        .cinema-info {
          float: left;
          width: 75%;
          height: 70px;
          margin-top: 15px;
          .cimema-name {
            width: 100%;
            margin-top: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .cinema-address {
            width: 100%;
            margin-top: 2px;
            color: #999;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .phone-icon {
          float: right;
          width: 20%;
          height: 70px;
          margin-top: 13px;
          background: url("../../assets/img/phone.png") no-repeat center center;
          background-size: 30px 30px;
        }
      }
      .order-info {
        width: 85%;
        height: 175px;
        border: 1px dashed #e2e2e2;
        border-left: 0;
        border-right: 0;
        margin: 0 auto;
        .container {
          margin-top: 20px;
          .order-title {
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            color: #000;
            .price {
              float: right;
              line-height: 30px;
              text-align: right;
              color: #777;
              font-size: 18px;
            }
          }
          .order-brief {
            margin-top: 10px;
            font-size: 12px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .ticket-notice {
        width: 85%;
        height: 315px;
        margin: 0 auto;
        border-bottom: 1px dashed #e2e2e2;
        .notice-title {
          width: 100%;
          margin-top: 15px;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 22px;
          font-weight: bold;
        }
        .rule {
          li {
            margin-top: 10px;
            line-height: 20px;
            color: #999;
          }
        }
      }
      .delete-btn {
        width: 70%;
        height: 50px;
        display: flex;
        margin: 15px auto;
        justify-content: center;
        align-items: center;
        button {
          flex: 1 1 auto;
          height: 35px;
          color: #999;
          border: 1px solid #999;
          border-radius: 120px;
          background-color: transparent;
          outline: none;
        }
      }
    }
    .split-line {
      position: relative;
      width: 99.5%;
      height: 18px;
      border: 1px solid #424447;
      border-top: 0;
      border-bottom: 0;
      .circle {
        position: absolute;
        top: 0;
        width: 16px;
        height: 18px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: 50%;
        background-image: url("../../assets/img/circle.png");
        &.left {
          left: -10px;
        }
        &.right {
          right: -10px;
        }
      }
      .middle-line {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 85%;
        border: 1px dashed #e2e2e2;
        margin: 0 auto;
      }
    }
  }
}
</style>
