<template>
  <div class="mine-box">
    <div class="header-box">
      <div class="header-pic">
        <img src="../assets/img/deader-pic.jpg">
      </div>
      <div class="name">
        二狗子
      </div>
    </div>
    <div class="menu">
      <div class="big-wrapper">
        <div
          class="sm-box ticket"
          @click="openMovieTicket()"
        >电影票</div>
        <div
          class="sm-box coupon"
          @click="openMovieCoupon()"
        >优惠券</div>
      </div>
      <div class="small-wrapper">帮助中心</div>
      <div class="small-wrapper">意见反馈</div>
    </div>
    <transition name="move">
      <MovieTicket v-show="isMovieTicket"></MovieTicket>
    </transition>
    <transition name="move">
      <MovieCoupon v-show="isMovieCoupon" ref="coupon"></MovieCoupon>
    </transition>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>
<script>
import MovieTicket from "../components/Mine/MovieTicket";
import MovieCoupon from "../components/Mine/MovieCoupon";
import Loading from "../public/Loading";
export default {
  name: "Mine",
  data() {
    return {
      isMovieTicket: false,
      isMovieCoupon: false,
      isLoading: true
    };
  },
  methods: {
    openMovieTicket() {
      this.isMovieTicket = true;
    },
    openMovieCoupon() {
      this.$refs.coupon._initScroll();
      this.isMovieCoupon = true;
    }
  },
  created() {
    setInterval(() => {
      this.isLoading = false;
    }, 500);
  },
  components: {
    MovieTicket,
    MovieCoupon,
    Loading
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/transition.css";
.mine-box {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  .header-box {
    width: 100%;
    height: 158px;
    background-image: url(//gw.alicdn.com/tfs/TB1yzUmgpuWBuNjSszbXXcS7FXa-1125-540.png),
      linear-gradient(-44deg, #fa465d, #fe7587);
    display: flex;
    align-items: center;
    .header-pic {
      flex: 0 0 auto;
      width: 73px;
      height: 73px;
      margin-left: 20px;
      margin-top: 30px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      width: 60%;
      height: 30px;
      margin-left: 5%;
      margin-top: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .menu {
    width: 100%;
    background-color: #fff;
    .big-wrapper {
      width: 95%;
      height: 100px;
      margin: 0 auto;
      display: flex;
      .sm-box {
        flex: 1 1 50%;
        text-align: center;
        line-height: 150px;
        &.ticket {
          background: url("../assets/img/movie-mine.png") no-repeat center 20px;
          background-size: 40px 40px;
        }
        &.coupon {
          background: url("../assets/img/coupon.png") no-repeat center 20px;
          background-size: 40px 40px;
        }
      }
    }
    .small-wrapper {
      width: 95%;
      height: 60px;
      margin: 0 auto;
      line-height: 60px;
      font-size: 16px;
      border-top: 1px solid #e2e2e2;
      background: url("../assets/img/right.png") no-repeat center right;
      background-size: 25px 25px;
    }
  }
}
</style>
