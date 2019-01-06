<template>
  <div
    class="movie-detail"
    ref="detailBox"
  >
    <div class="movie-info">
      <div class="info-bg">
        <span @click="closeDetail()"></span>
      </div>
      <div class="info-content">
        <div class="info">
          <div class="img-box">
            <img :src="'https://gw.alicdn.com/'+ videoData.poster +'_160x160Q75.jpg'">
            <div
              class="show-mark"
              v-if="videoData.showMark"
            >{{videoData.showMark}}</div>
          </div>
          <div class="show-name">
            <div class="name">{{videoData.showName}}</div>
            <div class="english-name">{{videoData.showNameEn}}</div>
          </div>
          <div class="show-detail">
            <p class="show-intro">{{videoData.type}}&nbsp;{{videoData.country}}&nbsp;{{videoData.duration}}分钟</p>
            <p class="show-intro">{{videoData.openTime}}</p>
            <p class="show-intro">
              <span class="want">{{videoData.wantCount}}万人想看</span>
            </p>
          </div>
          <div class="score">
            <div class="score-box">
              淘票票评分：<span>{{videoData.remarkCount}}万人好评</span>
              <div class="num">{{videoData.remark}}</div>
            </div>
          </div>
          <div
            class="nav"
            ref="nav"
          >
            <ul class="clearfix">
              <li @click="clickNav(1,$event)">
                <span :class="{con:navNum === 1}">简介</span>
              </li>
              <li @click="clickNav(2,$event)">
                <span :class="{con:navNum === 2}">影评</span>
              </li>
              <li @click="clickNav(3,$event)">
                <span :class="{con:navNum === 3}">更多</span>
              </li>
            </ul>
          </div>
          <div ref="desc">
            <div
              class="desc"
              @click="openDesc()"
            >
              <div
                class="movie-desc movie-desc-less"
                v-if="idDesc"
              >
                {{desc}}
              </div>
              <div
                class="movie-desc movie-desc-more"
                v-else
              >
                {{desc}}
              </div>
              <div class="desc-btn">{{idDesc ? "展开" : "收起"}}</div>
            </div>
            <div class="video-item video-pic">
              <p class="movie-artist-title">剧照</p>
              <div
                class="pics"
                ref="pics"
              >
                <ul
                  class="picsList clearfix"
                  ref="picsList"
                >
                  <li
                    v-for='artist in videoData.trailer'
                    :key="artist"
                  >
                    <img
                      v-lazy="'https://gw.alicdn.com/'+ artist +'_160x160Q75.jpg'"
                      height='90'
                      width="140"
                      alt=""
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div class="video-item ticket">
              <p class="movie-artist-title">票房</p>
              <div class="ticket-content">
                <div class="statistics-item">
                  <h3>2</h3>
                  <label>今日票房排名</label>
                </div>
                <div class="statistics-item">
                  <h3>17.83</h3>
                  <label>首周票房(万)</label>
                </div>
                <div class="statistics-item">
                  <h3>20.03</h3>
                  <label>积累票房(万)</label>
                </div>
              </div>
            </div>
          </div>
          <div
            class="video-item video-comment"
            ref="comment"
          >
            <p class="movie-artist-title">热门影评</p>
            <p
              v-for="n in 30"
              :key="n"
              class="hot-comment"
            >评论内容{{n}}</p>
          </div>
          <div
            class="video-item dynamic"
            ref="dynamic"
          >
            <p class="movie-artist-title">电影动态</p>
            <div class="dynamic-content">
              <div class="dynamic-box">
                <div class="title">
                  超英巨制首周末票房登顶!《蜘蛛侠：平行宇宙》火热引领贺岁！
                </div>
                <div class="img-box"></div>
                <div class="info">
                  阅读&nbsp;&nbsp;&nbsp;144
                </div>
              </div>
            </div>
            <div class="dynamic-content">
              <div class="dynamic-box">
                <div class="title">
                  超英巨制首周末票房登顶!《蜘蛛侠：平行宇宙》火热引领贺岁！
                </div>
                <div class="img-box"></div>
                <div class="info">
                  阅读&nbsp;&nbsp;&nbsp;144
                </div>
              </div>
            </div>
            <div class="dynamic-content">
              <div class="dynamic-box">
                <div class="title">
                  超英巨制首周末票房登顶!《蜘蛛侠：平行宇宙》火热引领贺岁！
                </div>
                <div class="img-box"></div>
                <div class="info">
                  阅读&nbsp;&nbsp;&nbsp;144
                </div>
              </div>
            </div>
            <div class="box"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="nav nav-top"
      v-show="isShowHeader"
    >
      <ul class="clearfix">
        <li @click="clickNav(1,$event)">
          <span :class="{con:navNum === 1}">简介</span>
        </li>
        <li @click="clickNav(2,$event)">
          <span :class="{con:navNum === 2}">影评</span>
        </li>
        <li @click="clickNav(3,$event)">
          <span :class="{con:navNum === 3}">更多</span>
        </li>
      </ul>
    </div>
    <div class="buy-btn">
      <router-link to="/cinema">选座购票</router-link>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Detail",
  props: ["videoData"],
  data() {
    return {
      desc:
        "蜘蛛侠不止一个！漫威超英动画巨制《蜘蛛侠：平行宇宙》将经典漫画与CGI技术完美呈现，讲述了普通高中生迈尔斯·莫拉斯如何师从蜘蛛侠彼得·帕克，成长为新一代超级英雄的故事。影片中迈尔斯和从其它平行宇宙中穿越而来的彼得、女蜘蛛侠格温、暗影蜘蛛侠、潘妮·帕克和“蜘猪侠”集结成团，六位蜘蛛侠首次同框大银幕，对抗蜘蛛侠宇宙最强反派。",
      idDesc: true,
      navIsTop: true,
      isShowHeader: "",
      navNum: 1,
      boxsHeightArr: [],
      currentIndex: 1
    };
  },
  methods: {
    closeDetail() {
      this.detailModuleShow = false;
      this.$emit("update:detailModuleShow");
    },
    _initDetailScroll() {
      this.$nextTick(() => {
        if (!this.detailScroll) {
          this.detailScroll = new BScroll(this.$refs.detailBox, {
            scrollY: true,
            click: true,
            probeType: 3,
            bounce: {
              top: false
            }
          });
        } else {
          this.detailScroll.refresh();
        }
      });
    },
    _initPic() {
      if (!this.picScroll) {
        if (this.videoData.trailer) {
          let picWidth = 140;
          let margin = 6;
          let width =
            (picWidth + margin) * this.videoData.trailer.length - margin;
          this.$refs.picsList.style.width = width + "px";
          this.$nextTick(() => {
            this.picScroll = new BScroll(this.$refs.pics, {
              scrollX: true
            });
          });
        }
      } else {
        this.picScroll.refresh();
      }
    },
    openDesc() {
      this.idDesc = !this.idDesc;
    },
    navTop() {
      this.detailScroll.on("scroll", ({ y }) => {
        let topSize = this.$refs.nav.getBoundingClientRect().top;
        if (topSize > 0) {
          this.isShowHeader = false;
        } else {
          this.isShowHeader = true;
        }
        this.refreshCurrentIndex(y);
      });
    },
    clickNav(num, event) {
      if (num === 1) {
        this.detailScroll.scrollToElement(this.$refs.desc, 500);
        this.navNum = 1;
      } else if (num === 2) {
        this.detailScroll.scrollToElement(this.$refs.comment, 500);
        this.navNum = 2;
      } else if (num === 3) {
        this.detailScroll.scrollToElement(this.$refs.dynamic, 500);
        this.navNum = 3;
      }
    },
    getBoxsHeight() {
      this.$nextTick(() => {
        let descTopHeight = this.$refs.desc.getBoundingClientRect().top;
        let commentTopHeight =
          this.$refs.comment.getBoundingClientRect().top - 50;
        let dynamicTopHeight = this.$refs.dynamic.getBoundingClientRect().top;
        let allDescHeight = this.$refs.desc.offsetHeight + descTopHeight;
        let allcommentHeight =
          this.$refs.comment.offsetHeight + commentTopHeight - 200;
        let alldynamicHeight =
          this.$refs.dynamic.offsetHeight + dynamicTopHeight;
        this.boxsHeightArr.push(
          descTopHeight,
          commentTopHeight,
          dynamicTopHeight,
          allDescHeight,
          allcommentHeight,
          alldynamicHeight
        );
      });
    },
    refreshCurrentIndex(y) {
      y = parseInt(-y);
      if (y < this.boxsHeightArr[3]) {
        this.navNum = 1;
      } else if (y > this.boxsHeightArr[1] && y < this.boxsHeightArr[4]) {
        this.navNum = 2;
      } else {
        this.navNum = 3;
      }
    }
  },
  mounted() {
    this._initDetailScroll();
  },
  updated() {
    this._initPic();
    this._initDetailScroll();
    this.navTop();
    this.getBoxsHeight();
  }
};
</script>
<style lang="scss" scoped>
.movie-detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #f1f1f1;
  overflow: hidden;
  z-index: 100;
  .movie-info {
    width: 100%;
    position: relative;
    .info-bg {
      width: 100%;
      height: 150px;
      background-color: rgb(232, 111, 111);
      span {
        display: block;
        position: absolute;
        left: 15px;
        top: 15px;
        width: 30px;
        height: 30px;
        background: url("../../assets/img/back2.png") no-repeat center center;
        background-size: 100%;
      }
    }
    .info-content {
      width: 100%;
      height: auto;
      margin-top: -10px;
      background-color: #fff;
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      .info {
        position: relative;
        width: 100%;
        height: auto;
        .img-box {
          position: absolute;
          width: 88px;
          height: 135px;
          margin: -60px 0 0 15px;
          img {
            width: 100%;
            height: 100%;
            border: 2px solid #fff;
            border-radius: 5px;
          }
          .show-mark {
            position: absolute;
            top: 5px;
            left: 5px;
            min-width: 34px;
            line-height: 16px;
            padding: 0 1px;
            background-color: #fff;
            color: black;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            white-space: nowrap;
            font-style: normal;
          }
        }
        .show-name {
          position: absolute;
          top: -60px;
          right: 0;
          width: 250px;
          height: 50px;
          color: #fff;
          .name {
            width: 90%;
            height: 30px;
            line-height: 30px;
            font-size: 22px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .english-name {
            width: 90%;
            height: 20px;
            line-height: 20px;
            font-size: 10px;
            opacity: 0.7;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .show-detail {
          position: absolute;
          top: 0px;
          right: 0;
          width: 250px;
          height: 80px;
          .show-intro {
            padding-top: 5px;
            text-align: left;
            font-size: 12px;
            line-height: 1.8;
            color: #777;
            width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .want {
              color: black;
              font-size: 12px;
              font-weight: bold;
            }
          }
        }
        .score {
          position: relative;
          width: 80%;
          height: 75px;
          margin: 0 auto;
          padding-top: 100px;
          .score-box {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 90px;
            color: #000;
            font-weight: 700;
            font-size: 14px;
            span {
              color: #777;
              font-weight: normal;
            }
            .num {
              width: 62%;
              font-size: 36px;
              font-weight: normal;
            }
          }
        }
        .desc {
          margin-top: 10px;
          .movie-desc {
            width: 90%;
            line-height: 25px;
            margin: 0 auto;
            &.movie-desc-less {
              height: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              flex-direction: column;
            }
          }
          .desc-btn {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            text-align: center;
            color: #349cec;
          }
        }
        .video-item {
          width: 100%;
          background-color: #fff;
          margin-top: 10px;
          .movie-artist-title {
            color: #333;
            font-weight: 700;
            font-size: 1;
            text-align: left;
            padding: 15px 0 0 15px;
            font-size: 16px;
          }
          .pics {
            width: 100%;
            height: 90px;
            padding-bottom: 15px;
            margin: 10px 0 0 15px;
            overflow: hidden;
            ul {
              li {
                float: left;
                margin-right: 6px;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
          .ticket-content {
            width: 90%;
            height: 85px;
            margin: 0 auto;
            .statistics-item {
              float: left;
              width: 30%;
              height: 100%;
              margin-left: 6.5px;
              text-align: center;
              h3 {
                font-size: 30px;
                color: #000;
                line-height: 48px;
                font-weight: 400;
              }
              label {
                display: block;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                color: #999;
              }
            }
          }
          .hot-comment {
            padding: 20px 0 30px 15px;
          }
          .dynamic-content {
            width: 90%;
            height: auto;
            margin: 0 auto;
            .dynamic-box {
              position: relative;
              width: 100%;
              height: 130px;
              .title {
                width: 55%;
                min-height: 90px;
                padding-top: 10px;
                line-height: 25px;
                color: black;
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                flex-direction: column;
              }
              .img-box {
                position: absolute;
                top: 50%;
                right: 0;
                width: 135px;
                height: 110px;
                background-color: #ccc;
              }
              .info {
                color: #777;
              }
            }
          }
          .box {
            width: 100%;
            height: 55px;
          }
        }
      }
    }
  }
  .buy-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background-color: rgb(232, 111, 111);
    line-height: 55px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    a{
      color: #fff;
    }
  }
}
.nav {
  background-color: #fff;
  width: 100%;
  ul {
    li {
      float: left;
      margin-left: 7px;
      width: 30%;
      line-height: 45px;
      span {
        display: block;
        width: 32px;
        height: 45px;
        margin: 0 auto;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #4a4a4a;
        &.con {
          border-bottom: 1px solid #4a4a4a;
        }
      }
    }
  }
  &.nav-top {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
  }
}
</style>
