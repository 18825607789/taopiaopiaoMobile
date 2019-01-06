<template>
  <div
    class="coupon-box"
    ref="scrollBox"
  >
    <div class="container-box">
      <div class="header">
        <span @click="closeMovieCoupon()"></span>
        <div class="title">
          优惠券
        </div>
      </div>
      <div
        class="coupon-list"
        v-for="(money,index) in moneys"
        :key="index"
      >
        <div class="coupon-box">
          <div class="txt-box">
            <div class="txt title">淘票票用户回馈代金券</div>
            <div class="txt rule">发放后30天内有效&nbsp;|&nbsp;不可和活动票叠加使用</div>
            <div class="txt time">有效期至 ：2017-03-15</div>
          </div>
          <div class="money">
            <span>{{money}}</span>元
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "MovieCoupon",
  data() {
    return {
      moneys: [10, 20, 30, 40, 50]
    };
  },
  methods: {
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
    },
    closeMovieCoupon() {
      this.$parent.isMovieCoupon = false;
    }
  },
  updated() {
    this._initScroll();
  }
};
</script>
<style lang="scss" scoped>
.coupon-box {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f5f5f5;
  z-index: 999;
  .container-box {
    width: 100%;
    height: auto;
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
    .coupon-list {
      position: relative;
      width: 100%;
      height: 130px;
      margin-top: 10px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: #999;
      .coupon-box {
        position: absolute;
        top: 0;
        left: 2%;
        width: 98%;
        height: 100%;
        background-color: #fff;
        .txt-box {
          float: left;
          width: 65%;
          height: 100%;
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
            &.title {
              font-size: 16px;
            }
            &.rule {
              font-size: 14px;
            }
            &.time {
              font-size: 14px;
            }
          }
        }
        .txt-box::before {
          position: absolute;
          top: 50%;
          right: 25%;
          transform: translateY(-50%);
          content: "";
          border: 1px dashed #c8c8c8;
          width: 1px;
          height: 80px;
        }
        .money {
          float: right;
          width: 25%;
          height: 100%;
          text-align: center;
          line-height: 130px;
          font-size: 12px;
          color: #999;
          background: url("../../assets/img/endIcon.png") no-repeat center
            center;
          background-size: 70px 70px;
          span {
            font-size: 25px;
          }
        }
      }
    }
  }
}
</style>
