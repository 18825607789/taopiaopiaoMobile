<template>
  <div class="buy-box">
    <div class="seats-top">
      <div class="info">
        <div class="cinema-name">{{seatsLocked.cinemaName}}</div>
        <div class="times">今天 {{seatsLocked.lockTime | getDateTimes}} （{{schedule.showVersion}}）</div>
      </div>
      <div class="seat-tips">
        <ul>
          <li>
            <i class="ok"></i>
            可选
          </li>
          <li>
            <i class="sell"></i>
            已售
          </li>
          <li>
            <i class="choose"></i>
            已选
          </li>
        </ul>
      </div>
      <div class="hall-name">
        {{schedule.hallName}}—银幕
      </div>
    </div>
    <div
      class="seats-container"
      ref="seatBox"
    >
      <div
        class="seats-list"
        @click="openBigView()"
        ref="seatLists"
      >
        <div
          class="seat-row-box"
          ref="row"
          :style="{height: (mtopSeatMap.maxTopPx - mtopSeatMap.minTopPx) * 2.5 + 'px'}"
        >
          <div
            class="seat-row"
            v-for="row in rows"
            :key="row"
            ref="seatRow"
            :style="{top:mtopSeatMap.minTopPx * rows / 4.5 * row + 'px'}"
          >
            {{row}}
          </div>
        </div>
        <div
          class="seat-item"
          v-for="(seat,index) in mtopSeatMap.seats"
          :key="index"
          ref="seatItem"
          :style="{left:seat.leftPx * 1.3 + 'px',top:seat.topPx * 1.6 +'px'}"
          :class='[{sell : seat.status == 0},{ok : seat.status == 1},{choose : seat.status == 2},{big : isBig}]'
          @click="chooseSeats($event,seat)"
        >
        </div>
      </div>
    </div>
    <div class="seats-bottom">
      <div class="ticket-info">
        <div
          class="ticket-list"
          ref="ticketBox"
          v-show="ticketList.length > 0"
        >
          <div
            class="scroll-box clearfix"
            ref="ticketScrollBox"
          >
            <div
              class="ticket-item"
              v-for="(item,index) in ticketList"
              :key="index"
              @click="removeTicket($event)"
            >
              <div class="seat-num">{{item}}</div>
              <div class="seat-price">{{seatsData.marketingToolSolution.oriSettlePrice / 100}}元</div>
            </div>
          </div>
        </div>
        <div
          class="tips"
          v-if="ticketList.length <= 0"
        >请选择座位 +</div>
      </div>
      <div
        class="buy-btn"
        :class='{disClick : seatMoney === 0}'
        @click="openDetail()"
      >{{seatMoney > 0 ? seatMoney + '元 确认选座' : '请先选座'}}</div>
    </div>
    <Loading v-if="isLoading"></Loading>
    <transition name="move">
      <BuyDetail
        v-show="isShowDetail"
        :seatsData="seatsData"
        :ticketList="ticketList"
        :seatMoney="seatMoney"
        ref="buyDetail"
      ></BuyDetail>
    </transition>
    <transition name="fade">
      <Modal ref="alerts"></Modal>
    </transition>
  </div>
</template>
<script>
import Loading from "../../public/Loading";
import Modal from "../../public/Modal";
import BuyDetail from "./BuyDetail";
import BScroll from "better-scroll";
import { getDateTime } from "../../assets/js/getDateTime.js";
export default {
  name: "Buy",
  data() {
    return {
      seatsData: "",
      seatsLocked: "",
      schedule: "",
      isLoading: false,
      mtopSeatMap: "",
      isBig: false,
      ticketList: [],
      seatMoney: 0,
      isShowDetail: false
    };
  },
  computed: {
    rows() {
      let num = parseInt(this.mtopSeatMap.maxTopPx / this.mtopSeatMap.minTopPx);
      if (num > 0) {
        return num;
      } else {
        return 0;
      }
    }
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.seatScroll) {
          this.seatScroll = new BScroll(this.$refs.seatBox, {
            click: true,
            scrollX: true,
            scrollY: true,
            freeScroll: true
          });
        } else {
          this.seatScroll.refresh();
        }
      });
    },
    _initTicketScroll() {
      this.$refs.ticketScrollBox.style.width =
        (85 + 10) * (this.ticketList.length + 0.5) + "px";
      this.$nextTick(() => {
        if (!this.ticketScroll) {
          this.ticketScroll = new BScroll(this.$refs.ticketBox, {
            click: true,
            scrollX: true
          });
        } else {
          this.ticketScroll.refresh();
        }
      });
    },
    openBigView() {
      this.$refs.seatLists.style.width = window.innerWidth * 1.5 + "px";
      for (let i = 0; i < this.$refs.seatItem.length; i++) {
        this.$refs.seatItem[i].style.left =
          this.mtopSeatMap.seats[i].leftPx * 2 + "px";
        this.$refs.seatItem[i].style.top =
          this.mtopSeatMap.seats[i].topPx * 2 + "px";
      }
      for (let j = 0; j < this.rows; j++) {
        this.$refs.seatRow[j].style.top =
          ((this.mtopSeatMap.minTopPx * this.rows) / 3.5) * (j + 1) + "px";
      }
      this.isBig = true;
      this._initScroll();
    },
    chooseSeats(event, seatItem) {
      if (seatItem.status == 0) {
        return;
      } else if (seatItem.status == 1) {
        seatItem.status = 2;
        this.ticketList.push(seatItem.name);
        this.seatMoney +=
          this.seatsData.marketingToolSolution.oriSettlePrice / 100;
        if (this.ticketList.length > 6) {
          seatItem.status = 1;
          for (let i = 0; i < this.ticketList.length; i++) {
            if (this.ticketList[i] === seatItem.name) {
              this.ticketList.splice(i, 1);
              break;
            }
          }
          this.seatMoney -=
            this.seatsData.marketingToolSolution.oriSettlePrice / 100;
          this.$refs.alerts.isShowModal = true;
          this.$refs.alerts.opts = {
            content: "每人最多可以买6张票子"
          };
          setTimeout(() => {
            this.$refs.alerts.isShowModal = false;
          }, 500);
        }
      } else {
        seatItem.status = 1;
        for (let i = 0; i < this.ticketList.length; i++) {
          if (this.ticketList[i] === seatItem.name) {
            this.ticketList.splice(i, 1);
            break;
          }
        }
        this.seatMoney -=
          this.seatsData.marketingToolSolution.oriSettlePrice / 100;
      }
    },
    removeTicket(event) {
      for (let i = 0; i < this.ticketList.length; i++) {
        if (this.ticketList[i] === event.target.innerHTML) {
          this.ticketList.splice(i, 1);
        }
        for (let j = 0; j < this.mtopSeatMap.seats.length; j++) {
          if (this.mtopSeatMap.seats[j].name === event.target.innerHTML) {
            this.mtopSeatMap.seats[j].status = 1;
          }
        }
      }
      this.seatMoney -=
        this.seatsData.marketingToolSolution.oriSettlePrice / 100;
    },
    openDetail() {
      if (this.seatMoney === 0) {
        return;
      } else {
        this.isShowDetail = true;
        this.$refs.buyDetail.phoneNum = this.seatsData.mtopSeatMap.userPhone;
        this.$refs.buyDetail.totalPrice = this.seatMoney;
        this.$refs.buyDetail._initScroll();
        this.$refs.buyDetail.countDown();
      }
    }
  },
  created() {
    this.$http.get("/api/movieSeatsData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.seatsData = res.data.returnValue;
        this.seatsLocked = this.seatsData.seatsLocked[0];
        this.schedule = this.seatsData.schedule;
        this.mtopSeatMap = this.seatsData.mtopSeatMap;
        this.isLoading = false;
      }
    });
  },
  mounted() {
    this._initScroll();
    this._initTicketScroll();
  },
  updated() {
    this._initScroll();
    this._initTicketScroll();
  },
  filters: {
    getDateTimes(time) {
      return getDateTime(time, "MM-dd hh:mm");
    }
  },
  components: {
    Loading,
    BuyDetail,
    Modal
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/transition.css";
.buy-box {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  z-index: 999;
  .seats-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 130px;
    background-color: #fff;
    .info {
      width: 90%;
      height: 70px;
      line-height: 30px;
      margin: 0 auto;
      margin-top: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .cinema-name {
        width: 100%;
        height: 30px;
        color: #333;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .times {
        width: 100%;
        height: 30px;
        color: #777;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .seat-tips {
      width: 90%;
      margin: 0 auto;
      ul {
        display: flex;
        width: 70%;
        align-items: center;
        margin: 0 auto;
        li {
          flex: 0 0 auto;
          width: 27.5%;
          height: 35px;
          line-height: 35px;
          margin-right: 16px;
          text-align: right;
          font-weight: bold;
          i {
            display: inline-block;
            width: 25px;
            height: 25px;
            vertical-align: middle;
            background: url("../../assets/img/seats.png") no-repeat;
            background-size: 80px;
            &.ok {
              background-position: 0 0;
            }
            &.sell {
              background-position: 0 -50px;
            }
            &.choose {
              background-position: 0 -25px;
            }
          }
        }
      }
    }
    .hall-name {
      width: 40%;
      height: 25px;
      line-height: 25px;
      text-align: center;
      margin: 5px auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      background: url("../../assets/img/Ladder.svg") no-repeat;
      background-size: 100% 100%;
    }
  }
  .seats-container {
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin-top: 155px;
    .seats-list {
      position: relative;
      .seat-row-box {
        width: 15px;
        padding: 35px 0;
        border-radius: 15px;
        background-color: #888;
        color: #fff;
        .seat-row {
          position: absolute;
          width: 15px;
          font-size: 14px;
          text-align: center;
          line-height: 48px;
        }
      }
      .seat-item {
        position: absolute;
        width: 20px;
        height: 20px;
        padding: 10px;
        background: url("../../assets/img/seats.png") no-repeat;
        background-size: 130px;
        &.ok {
          background-position: 0 0;
        }
        &.sell {
          background-position: 0 -82px;
        }
        &.big {
          width: 30px;
          height: 30px;
          background-size: 160px;
          &.sell {
            background-position: 0 -100px;
          }
          &.choose {
            background-position: 0 -50px;
          }
        }
      }
    }
  }
  .seats-bottom {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 115px;
    background-color: #fff;
    .ticket-info {
      width: 100%;
      height: 60px;
      .ticket-list {
        width: 95%;
        height: 60px;
        margin-left: 5%;
        .ticket-item {
          position: relative;
          float: left;
          width: 85px;
          height: 40px;
          margin-top: 10px;
          margin-right: 10px;
          border: 1px solid #999;
          text-align: center;
          line-height: 20px;
          .seat-num {
            font-size: 12px;
            color: #000;
          }
          .seat-price {
            font-size: 10px;
            color: #ff4d64;
          }
          &::before {
            position: absolute;
            top: 10px;
            right: 5px;
            content: "x";
            width: 10px;
            height: 10px;
          }
          &:after {
            position: absolute;
            top: 13px;
            left: -10px;
            width: 15px;
            height: 15px;
            content: "";
            border: 1px solid #999;
            border-left: 0;
            border-top: 0;
            border-bottom: 0;
            background-color: #fff;
            border-radius: 50%;
          }
        }
      }
      .tips {
        width: 100%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        color: #999;
        font-size: 16px;
      }
    }
    .buy-btn {
      width: 100%;
      height: 55px;
      line-height: 55px;
      background-image: linear-gradient(45deg, #ff7ba0, #ff4d64);
      text-align: center;
      font-size: 16px;
      color: #fff;
      &.disClick {
        background-color: #fdbcce;
        background-image: none;
      }
    }
  }
}
</style>
