<template>
  <div class="movie-video">
    <div class="video-header">
      <div
        class="header-top"
        ref="headerTop"
      >
        <span @click="closeVideo()"></span>
        <div class="title">
          {{preview.title}}
        </div>
      </div>
    </div>
    <div
      class="video-box"
      ref="videoBox"
    >
      <video
        controls
        autoplay
        loop
        :src=src
        :poster=poster
        ref="video"
      >
      </video>
    </div>
    <div
      class="info-box"
      ref="infoBox"
    >
      <div>
        <div class="video-info">
          <div class="show-name">{{videoData.showName}}</div>
          <div class="score">
            淘票票评分：<span class="warning">{{videoData.remark == ""?'暂无':videoData.remark}}</span>
          </div>
          <a
            href="#"
            class="buy-btn buy-now"
            v-if="videoData.soldType == 'NORMAL'"
          >购票</a>
          <a
            href="#"
            class="buy-btn appointment"
            v-if="videoData.soldType == 'PRE'"
          >预购</a>
          <div class="country-and-leadingRole">
            {{videoData.country}}/{{videoData.leadingRole}}
          </div>
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
        <div class="video-item video-comment">
          <p class="movie-artist-title">热门影评</p>
          <p
            v-for="n in 30"
            :key="n"
            class="hot-comment"
          >评论内容{{n}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Video",
  props: ["videoData", "preview"],
  data() {
    return {
      src: "",
      poster: ""
    };
  },
  watch: {
    preview(newValue, oldValue) {
      this.src = newValue.iphoneUrl;
      this.poster = newValue.coverUrl;
    }
  },
  methods: {
    closeVideo() {
      this.videoModuleShow = false;
      this.$refs.video.pause();
      this.$emit("update:videoModuleShow");
    },
    _initPic() {
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
    },
    _initDetailScroll() {
      this.$refs.infoBox.style.top =
        this.$refs.headerTop.offsetHeight +
        this.$refs.videoBox.offsetHeight +
        "px";
      this.$nextTick(() => {
        this.detailScroll = new BScroll(this.$refs.infoBox, {
          scrollY: true,
          click: true
        });
      });
    }
  },
  updated() {
    this._initPic();
    this._initDetailScroll();
  }
};
</script>
<style lang="scss" scoped>
.movie-video {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f1f1f1;
  z-index: 100;
  .video-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    .header-top {
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
  }
  .video-box {
    width: 100%;
    margin-top: 40px;
    video {
      width: 100%;
      height: 210px;
    }
  }
  .info-box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #f1f1f1;
    overflow: hidden;
    .video-info {
      width: 100%;
      height: 100px;
      line-height: 30px;
      background-color: #fff;
      .show-name {
        float: left;
        max-width: 40%;
        height: 30px;
        padding: 20px 0 0 10px;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .score {
        float: left;
        width: 30%;
        height: 30px;
        padding: 20px 0 0 10px;
        color: black;
        font-size: 14px;
        .warning {
          font-weight: 500;
          color: #fea54c;
        }
      }
      .country-and-leadingRole {
        float: left;
        width: 60%;
        height: 30px;
        padding-left: 10px;
        color: #777;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .buy-btn {
        float: right;
        width: 50px;
        height: 28px;
        margin-right: 10px;
        margin-top: 35px;
        line-height: 28px;
        border-radius: 20px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        &.buy-now {
          background: linear-gradient(45deg, #ff7ba0, #ff4d64);
        }
        &.appointment {
          background: linear-gradient(45deg, #55c2ff, #349cec);
        }
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
      .hot-comment {
        padding: 20px 0 30px 15px;
      }
    }
  }
}
</style>
