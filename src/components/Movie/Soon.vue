<template>
  <div class="soon-movie-box">
    <Loading v-if="isLoading"></Loading>
    <div
      v-else
      v-for='(dateTime,index) in openTimes'
      :key="index"
    >
      <p class="movie-date">
        <span class="date-time">{{dateTime}}</span>
        <span class="date-week">{{dateTime | getWeek}}</span>
      </p>
      <div
        class="movie-list-item"
        v-for="item in soonData"
        :key="item.id"
        v-if='dateTime == item.openTime'
      >
        <div
          class="moive-img"
          @click="showVideo(item)"
        >
          <img
            class="bg-img"
            :src="'https://gw.alicdn.com/'+ item.poster +'_160x160Q75.jpg'"
          >
          <div class="play-icon"></div>
        </div>
        <div class="movie-info" @click="showMovieDetail(item)">
          <div class="title">
            <div class="show-name">{{item.showName}}</div>
            <div
              class="show-mark"
              v-if="item.showMark"
            >{{item.showMark}}</div>
          </div>
          <div class="score">
            <span class="warning">{{item.wantCount}}</span>
            人想看
          </div>
          <div class="brief director">
            导演：{{item.director}}
          </div>
          <div class="brief star">
            主演：{{item.leadingRole}}
          </div>
        </div>
        <div class="buy-btn">
          <router-link
            class="appointment"
            v-if='item.soldType == "PRE"'
            to="/cinema"
          >预购</router-link>
        </div>
      </div>
    </div>
    <div
      v-for='(items,key) in movieData'
      :key="key"
    >
      <p class="movie-date">
        <span class="date-time">{{key}}</span>
        <span class="date-week">待定</span>
      </p>
      <div
        class="movie-list-item"
        v-for='(item,index) in items'
        :key="index"
      >
        <div class="moive-img" @click="showVideo(item)">
          <img
            class="bg-img"
            :src="'https://gw.alicdn.com/'+ item.poster +'_160x160Q75.jpg'"
          >
          <div class="play-icon"></div>
        </div>
        <div class="movie-info" @click="showMovieDetail(item)">
          <div class="title">
            <div class="show-name">{{item.showName}}</div>
            <div
              class="show-mark"
              v-if="item.showMark"
            >{{item.showMark}}</div>
          </div>
          <div class="score">
            <span class="warning">{{item.wantCount}}</span>
            人想看
          </div>
          <div class="brief director">
            导演：{{item.director}}
          </div>
          <div class="brief star">
            主演：{{item.leadingRole}}
          </div>
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
import Video from "./Video";
import Detail from "./Detail";
import Loading from "../../public/Loading";

export default {
  name: "Soon",
  data() {
    return {
      movieData: "",
      soonData: "",
      openTimes: [],
      videoData: "",
      preview: "",
      videoModuleShow: false,
      detailModuleShow: false,
      isLoading: true
    };
  },
  created() {
    this.$http.get("/api/soonData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.movieData = res.data.soonShowGuideMap;
        this.soonData = res.data.soonShows;
        this.isLoading = false;
      }
      this.getDateTime();
    });
  },
  components: {
    Loading,
    Video,
    Detail
  },
  methods: {
    getDateTime() {
      var len = this.soonData.length;
      for (let i = 0; i < len; i++) {
        if (this.openTimes.indexOf(this.soonData[i].openTime) === -1) {
          this.openTimes.push(this.soonData[i].openTime);
        }
      }
    },
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
  filters: {
    getWeek(val) {
      var showDay = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      return showDay[new Date(val).getDay()];
    }
  }
};
</script>
<style lang="scss" scoped>
.soon-movie-box {
  width: 100%;
  float: left;
  .movie-date {
    width: 100%;
    height: 39px;
    line-height: 39px;
    color: black;
    background: rgba(204, 204, 204, 0.288);
    font-size: 12px;
    .date-time {
      padding: 0 5px 0 20px;
    }
  }
  .movie-list-item {
    position: relative;
    width: 96%;
    height: 120px;
    margin-left: 4%;
    border-bottom: 1px solid #ccc;
    font-size: 0;
    .moive-img {
      width: 65px;
      position: relative;
      .bg-img {
        width: 100%;
        height: 95px;
        margin-top: 20%;
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
        &.appointment {
          background: linear-gradient(45deg, #55c2ff, #349cec);
        }
      }
    }
  }
}
</style>
