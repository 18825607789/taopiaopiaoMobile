<template>
  <div class="hot-moive-box">
    <Banner class="banner"></Banner>
    <Loading v-if="isLoading"></Loading>
    <div
      class="movie-list"
      v-else
    >
      <div
        class="movie-list-item"
        v-for="(item,index) in movieData"
        :key="index"
      >
        <div
          class="moive-img"
          @click='showVideo(item)'
        >
          <img
            class="bg-img"
            :src="'https://gw.alicdn.com/'+ item.poster +'_160x160Q75.jpg'"
          >
          <div class="play-icon"></div>
        </div>
        <div
          class="movie-info"
          @click="showMovieDetail(item)"
        >
          <div class="title">
            <div class="show-name">{{item.showName}}</div>
            <div
              class="show-mark"
              v-if="item.showMark"
            >{{item.showMark}}</div>
          </div>
          <div class="score">
            淘票票评分
            <span class="warning">{{item.remark == ""?'暂无':item.remark}}</span>
          </div>
          <div class="brief director">
            导演：{{item.director}}
          </div>
          <div class="brief star">
            主演：{{item.leadingRole}}
          </div>
          <div class="fantastic">
            <span
              class="hot-now"
              v-if="index === 0"
            >今日最热</span>
            <span
              class="hot-week"
              v-if="index === 0"
            >一周最热</span>
            <span
              class="more-good"
              v-if="index === 0"
            >口碑最佳</span>
          </div>
        </div>
        <div class="buy-btn">
          <router-link
            class="buy-now"
            v-if="item.soldType == 'NORMAL'"
            to="/cinema"
          >购票</router-link>
          <router-link
            class="appointment"
            v-if="item.soldType == 'PRE'"
            to="/cinema"
          >预购</router-link>
          <div class="preferential">特惠</div>
        </div>
      </div>
    </div>
    <transition name="move">
      <Video
        :videoData="videoData"
        :preview="preview"
        :videoModuleShow.sync="videoModuleShow"
        v-show="videoModuleShow"
        class="video"
      ></Video>
    </transition>
    <transition name="move">
      <Detail
        :videoData="videoData"
        :detailModuleShow.sync="detailModuleShow"
        v-show="detailModuleShow"
      ></Detail>
    </transition>
  </div>
</template>
<script>
import Banner from "./Banner";
import Video from "./Video";
import Detail from "./Detail";
import Loading from "../../public/Loading";

export default {
  name: "Hot",
  data() {
    return {
      movieData: [],
      isLoading: true,
      videoData: "",
      preview: "",
      videoModuleShow: false,
      detailModuleShow: false
    };
  },
  created() {
    this.$http.get("/api/movieData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.movieData = res.data;
        this.isLoading = false;
      }
    });
  },
  methods: {
    showVideo(data) {
      this.videoData = data;
      this.videoModuleShow = true;
      this.preview = data.preview[0];
    },
    showMovieDetail(data) {
      this.videoData = data;
      this.detailModuleShow = true;
    }
  },
  components: {
    Banner,
    Video,
    Detail,
    Loading
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/transition.css";
.hot-moive-box {
  width: 100%;
  float: left;
  .banner {
    height: 150px;
  }
  .movie-list {
    width: 100%;
    .movie-list-item {
      position: relative;
      width: 96%;
      height: 145px;
      margin-left: 4%;
      border-bottom: 1px solid #ccc;
      font-size: 0;
      .moive-img {
        width: 65px;
        position: relative;
        .bg-img {
          width: 100%;
          height: 95px;
          margin-top: 25%;
        }
        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -25%);
          width: 25px;
          height: 25px;
          border-radius: 100%;
          background: url("../../assets/img/player.png") no-repeat center center;
          background-size: contain;
        }
      }
      .movie-info {
        width: 62%;
        height: 115px;
        position: absolute;
        top: 10%;
        left: 70px;
        .title {
          width: 100%;
          height: 25px;
          line-height: 25px;
          .show-name {
            display: block;
            float: left;
            max-width: 80%;
            overflow: hidden;
            color: #000;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 500;
            font-size: 0.9rem;
          }
          .show-mark {
            float: left;
            min-width: 34px;
            line-height: 13px;
            border: 1px solid #999;
            margin: 5px;
            padding: 0 2px;
            color: #999;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            white-space: nowrap;
            font-style: normal;
          }
        }
        .score {
          color: #777;
          font-size: 13px;
          margin-top: 3px;
          .warning {
            font-weight: 500;
            color: #fea54c;
          }
        }
        .brief {
          width: auto;
          margin-top: 6px;
          color: #777;
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .fantastic {
          margin-top: 7px;
          span {
            display: inline-block;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            border-radius: 2px;
            padding: 0px 2px;
            margin-right: 5px;
            &.hot-now {
              border: 1px solid #ff4d64;
              color: #ff4d64;
            }
            &.hot-week {
              border: 1px solid #fea54c;
              color: #fea54c;
            }
            &.more-good {
              border: 1px solid #349cec;
              color: #349cec;
            }
          }
        }
      }
      .buy-btn {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 50px;
        a {
          display: block;
          width: 50px;
          height: 28px;
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
        .preferential {
          color: #999;
          font-size: 0.5625rem;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
  }
}
</style>
