<template>
  <div
    class="movie-ticket"
    ref="scrollBox"
  >
    <div>
      <div class="header">
        <span @click="closeBankCard()"></span>
        <div class="title">
          我的电影票
        </div>
      </div>
      <div
        class="ticket-list"
        v-for="(item,index) in movieTicketData.orders"
        :key="index"
        @click="openTicketDetail(item)"
      >
        <div class="left">
          <span>座</span>
        </div>
        <div class="right">
          <div class="txt-box">
            <div class="txt movie-name">{{item.title}}&nbsp;&nbsp;{{item.count}}张</div>
            <div class="txt time">{{item.showTime | getDateTimes}}</div>
            <div class="txt address">{{item.cinemaName}}</div>
          </div>
          <div class="btn">
            查看
          </div>
        </div>
      </div>
    </div>
    <Loading v-show="isLoading"></Loading>
    <transition name="move">
      <TicketDetail
        v-show="isTicketDetail"
        :ticketDetailData="ticketDetailData"
      ></TicketDetail>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Loading from "../../public/Loading";
import TicketDetail from "./TicketDetail";
import { getDateTime } from "../../assets/js/getDateTime.js";
export default {
  name: "MovieTicket",
  data() {
    return {
      movieTicketData: "",
      ticketDetailData: "",
      isLoading: true,
      isTicketDetail: false
    };
  },
  methods: {
    closeBankCard() {
      this.$parent.isMovieTicket = false;
    },
    openTicketDetail(data) {
      this.isTicketDetail = true;
      this.ticketDetailData = data;
    },
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scrollBox) {
          this.scrollBox = new BScroll(this.$refs.scrollBox, {
            scrollY: true,
            click: true
          });
        } else {
          this.scrollBox.refresh();
        }
      });
    }
  },
  created() {
    this.$http.get("/api/MovieTicketDate").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.movieTicketData = res.data.returnValue;
        this.isLoading = false;
      }
    });
  },
  mounted() {
    this._initScroll();
  },
  updated() {
    this._initScroll();
  },
  filters: {
    getDateTimes(time) {
      return getDateTime(time, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    Loading,
    TicketDetail
  }
};
</script>
<style lang="scss" scoped>
.movie-ticket {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f5f5f5;
  z-index: 999;
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
  .ticket-list {
    width: 100%;
    height: 130px;
    margin-top: 10px;
    display: flex;
    .left {
      flex: 1 1 auto;
      width: 15%;
      height: 100%;
      border-right: 1px dashed #999;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: #fff;
      span {
        display: block;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 100%;
        background-color: #c8c8c8;
      }
    }
    .right {
      flex: 1 1 auto;
      width: 85%;
      height: 100%;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      background: #fff url("../../assets/img/endIcon.png") no-repeat 75% center;
      .txt-box {
        width: 55%;
        float: left;
        .txt {
          float: left;
          width: 100%;
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          margin-left: 5%;
          color: #c8c8c8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.movie-name {
            font-size: 16px;
          }
          &.time {
            font-size: 12px;
          }
          &.address {
            font-size: 12px;
          }
        }
      }
      .btn {
        float: right;
        width: 15%;
        height: 25px;
        margin-top: 53px;
        margin-right: 15px;
        line-height: 25px;
        text-align: center;
        color: #ffc600;
        border: 1px solid #ffc600;
      }
    }
  }
}
</style>
