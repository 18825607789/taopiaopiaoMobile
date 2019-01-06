<template>
  <div
    class="cinema-movie"
    ref="cinemaMovie"
  >
    <div ref="scrollCinema">
      <Loading v-if="isLoading"></Loading>
      <div class="header">
        <span @click="closeCinemaMovie()"></span>
        <div class="title">
          {{cinemaMovieData.cinemaName}}
        </div>
      </div>
      <div class="cinema-movie-container">
        <div class="cinema-info">
          <div class="address-and-supports">
            <div class="address">
              {{cinemaMovieData.address}}
            </div>
            <div class="support">
              <span
                v-for="supports in cinemaMovieData.displaySupports"
                :key="supports.code"
                v-show="supports.support"
              >{{supports.name}}</span>
            </div>
          </div>
          <div
            class="bank-card"
            @click="openBankCard()"
          >
            <p>{{bankInfo.tag}}</p>
            <p>{{bankInfo.title}}</p>
          </div>
          <transition name="move">
            <BankCard v-show="isBankCard"></BankCard>
          </transition>
        </div>
        <div class="movie-list-info">
          <div
            class="scoll-container"
            ref="scollContainer"
          >
            <div
              class="scoll-box"
              ref="scollBox"
            >
              <div
                class="img-box"
                v-for='(show,index) in allCinemaData.showVos'
                :key="index"
                :class='{con : index === activeImg}'
                @click='tabImg($event,index,show.showId)'
              >
                <img
                  v-lazy="'//gw.alicdn.com/'+ show.poster +'_110x10000Q75.jpg'"
                  class="img"
                >
              </div>
            </div>
          </div>
          <div class="info">
            <div
              v-for='(showVo,index) in allCinemaData.showVos'
              :key="index"
            >
              <p v-if='activeImg === index'>
                <span class="show-name">{{showVo.showName}}</span>
                <span class="want">
                  <label>{{showVo.remark}}</label>
                  人想看
                </span>
              </p>
              <p
                v-if='activeImg === index'
                class="info-main"
              >
                <span>{{showVo.duration}}分钟</span> |
                <span>{{showVo.type | filterString(0)}}</span> |
                <span>{{showVo.leadingRole | filterString(1)}}</span>
              </p>
            </div>
          </div>
          <div
            class="show-date"
            v-if='showMovieId'
          >
            <div
              class="show-date-box"
              v-for='(detail,index) in allCinemaData.showScheduleMap[showMovieId]'
              :key="index"
            >
              <div
                class="show-times"
                :class='{con : dateSel === index }'
                :style="positionDate(index)"
                @click="tabTag(index)"
              >
                {{detail.dateDesc}}
                <i v-if="detail.activityTag">{{detail.activityTag}}</i>
              </div>
              <div
                class="show-container"
                v-show="dateSel === index"
                v-if='detail.scheduleVos.length'
              >
                <div class="activity">
                  <span class="activity-icon">{{allCinemaData.announceVos[0].tag}}</span>
                  <span class="activity-title">{{allCinemaData.announceVos[0].title}}</span>
                  <label></label>
                </div>
                <div
                  class="scene-list"
                  v-for='(info,index2) in detail.scheduleVos'
                  :key="index2"
                >
                  <div class="item-wrap">
                    <div class="item-container">
                      <div class="time">{{info.openTime}}</div>
                      <div class="others">
                        <div class="type">{{info.showVersion}}</div>
                        <div class="price">
                          特惠
                          <span>{{info.tradePrice | filterMoney}}</span>
                          元
                        </div>
                      </div>
                    </div>
                    <div class="item-container item-other">
                      <div class="end-time">{{info.closeTime}}散场</div>
                      <div class="others">
                        <div class="item-hall">{{info.hallName}}</div>
                        <div class="old-price">
                          <S>{{info.cinemaPrice | filterMoney}}元</S>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="btn-wrap">
                    <router-link to="/buy">购票</router-link>
                  </div>
                </div>
              </div>
              <div
                class="no-movie"
                v-else
              >
                {{detail.dateDesc}}
                暂无场次
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name='move'>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Loading from "../../public/Loading";
import BankCard from "./BankCard";
import BScroll from "better-scroll";

export default {
  name: "CinemaMovie",
  props: ["cinemaMovieData"],
  data() {
    return {
      allCinemaData: "",
      showMovieId: "",
      activeImg: 3,
      bankInfo: "",
      dateSel: 0,
      isLoading: true,
      isBankCard: false
    };
  },
  methods: {
    _initPic() {
      if (this.allCinemaData.showVos) {
        let imgWidth = 69;
        let margin = 10;
        let len = this.allCinemaData.showVos.length;
        let boxWidth = (imgWidth + margin) * len;
        this.$refs.scollBox.style.width = boxWidth + "px";
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.scollContainer, {
              scrollX: true,
              click: true
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    _initScrollBox() {
      this.$nextTick(() => {
        if (!this.scrollBox) {
          this.scrollBox = new BScroll(this.$refs.cinemaMovie, {
            scrollY: true,
            click: true
          });
        } else {
          this.scrollBox.refresh();
        }
      });
    },
    tabImg(event, index, showMovieId) {
      let imgWidth = 79;
      this.showMovieId = showMovieId;
      this.activeImg = index;
      this.dateSel = 0;
      this.picScroll.scrollTo(-imgWidth * (index - 2), 0, 700);
    },
    tabTag(index) {
      this.dateSel = index;
    },
    positionDate(index) {
      let dateWidth = 94;
      return "left:" + (dateWidth * index + 5) + "px";
    },
    closeCinemaMovie() {
      this.$parent.isShowCinema = false;
    },
    openBankCard() {
      this.isBankCard = true;
    }
  },
  filters: {
    filterString(input, num) {
      var strArr = input.split(",");
      var str = "";
      for (let i = 0; i < strArr.length; i++) {
        if (i <= num) {
          str += strArr[i] + ",";
        } else {
          break;
        }
      }
      return str;
    },
    filterMoney(input) {
      if (input) {
        return parseInt(input) / 100;
      }
    }
  },
  created() {
    this.$http.get("/api/cinemaDetailData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.allCinemaData = res.data.returnValue;
        this.showMovieId = this.allCinemaData.showVos[0].showId;
        this.bankInfo = this.allCinemaData.notifyBannerVos[0];
        setInterval(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  },
  mounted() {
    this._initPic();
    this._initScrollBox();
  },
  updated() {
    this._initPic();
    this._initScrollBox();
  },
  components: {
    Loading,
    BankCard
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/transition.css";
.cinema-movie {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
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
  .address-and-supports {
    width: 100%;
    height: 80px;
    .address {
      width: 95%;
      height: 40px;
      padding-left: 5%;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .support {
      max-width: 95%;
      margin-top: 5px;
      padding-left: 5%;
      span {
        height: 16px;
        padding: 1px 3px;
        margin-right: 5px;
        border: 1px solid #349cec;
        border-radius: 2px;
        font-size: 10px;
        color: #349cec;
      }
    }
  }
  .bank-card {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    background-color: #f3f9fd;
    background: url("../../assets/img/bank.png") no-repeat;
    background-position: 95% 50%;
    background-size: 35px 30px;
    border: 1px solid #65b1db;
    border-radius: 4px;
    p {
      height: 20px;
      line-height: 30px;
      color: #65b1db;
      margin-left: 10px;
    }
  }
  .movie-list-info {
    position: relative;
    .scoll-container {
      width: 100%;
      height: 125px;
      margin-top: 20px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.7);
      .scoll-box {
        height: 110px;
        .img-box {
          float: left;
          margin-left: 10px;
          img {
            width: 65px;
            height: 90px;
            margin-top: 35px;
          }
          &.con {
            img {
              width: 78px;
              height: 113px;
              margin-top: 12px;
              border: 2px solid #fff;
            }
          }
        }
      }
    }
    .info {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      p {
        text-align: center;
        span {
          max-width: 40%;
          height: 20px;
          line-height: 20px;
          &.show-name {
            max-width: 40%;
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &.want {
            width: 20%;
            font-size: 12px;
            label {
              color: #fea54c;
            }
          }
        }
      }
      .info-main {
        color: #999;
      }
    }
    .show-date {
      padding-top: 15px;
      width: 100%;
      position: relative;
      .show-times {
        display: inline-block;
        position: absolute;
        top: 10px;
        font-size: 14px;
        height: 30px;
        line-height: 20px;
        text-align: center;
        padding: 0 10px;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 5px;
          background-color: #ff8625;
          color: #fff;
          font-style: normal;
        }
        &.con {
          color: #ff4d64;
        }
        &.con::before {
          content: "";
          width: 30px;
          height: 2px;
          background-color: #ff4d64;
          position: absolute;
          bottom: 0;
          left: 50%;
          -webkit-transform: translateX(-50%);
          -ms-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
      .activity {
        width: 96%;
        margin-top: 30px;
        padding-left: 4%;
        height: 30px;
        color: #999;
        border-bottom: 1px solid #f1f1f1;
        border-top: 1px solid #f1f1f1;
        vertical-align: middle;
        .activity-icon {
          float: left;
          width: 20px;
          height: 20px;
          margin-top: 5px;
          text-align: center;
          background-color: #fe7a4c;
          border-radius: 5px;
          color: #fff;
        }
        .activity-title {
          display: inline-block;
          max-width: 80%;
          height: 30px;
          line-height: 30px;
          margin-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        label {
          float: right;
          width: 20px;
          height: 20px;
          margin: 5px 5px 0 0;
          background: url("../../assets/img/right.png") no-repeat center center;
          background-size: contain;
        }
      }
      .scene-list {
        width: 95%;
        height: 75px;
        margin-left: 5%;
        padding: 5px 0;
        border-bottom: 1px solid #e2e2e2;
        .item-wrap {
          float: left;
          width: 78%;
          height: 70px;
          margin-bottom: 9px;
          .item-container {
            width: 100%;
            height: 25px;
            line-height: 25px;
            margin-top: 8px;
            .time {
              float: left;
              font-size: 25px;
            }
            .others {
              float: right;
              width: 70%;
              height: 100%;
              .type {
                float: left;
                width: 45%;
                line-height: 33px;
                font-size: 13px;
              }
              .price {
                float: right;
                width: 55%;
                text-align: right;
                color: #fd2c32;
                font-weight: bold;
                span {
                  font-size: 25px;
                }
              }
            }
            &.item-other {
              color: #999;
              .end-time {
                float: left;
              }
              .item-hall {
                float: left;
                width: 60%;
              }
              .old-price {
                float: left;
                width: 40%;
                text-align: right;
              }
            }
          }
        }
        .btn-wrap {
          position: relative;
          float: right;
          width: 20%;
          height: 100%;
          a {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: block;
            width: 50px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            color: #ff4d64;
            border: 1px solid #ff4d64;
            border-radius: 120px;
          }
        }
      }
      .no-movie {
        width: 100%;
        margin-top: 35px;
        border-top: 1px solid #e2e2e2;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
        color: #999;
      }
    }
  }
}
</style>
