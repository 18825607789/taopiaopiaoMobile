<template>
  <div
    class="cinema"
    ref="bigBox"
  >
    <div
      class="cinema-header clearfix"
      ref="header"
    >
      <logoAndCity></logoAndCity>
      <div class="selector clearfix">
        <div class="selector-title">
          <div
            class="title"
            @click="changeSelLoaction()"
          >{{localtionSel}}</div>
        </div>
        <div class="selector-title">
          <div
            class="title"
            @click="changeSelSort()"
          >{{sortSel}}</div>
        </div>
        <div class="selector-title">
          <div
            class="title"
            @click="changeSelSpecial()"
          >{{specialSel}}</div>
        </div>
        <div
          class="selector-title search"
          @click="openSearch()"
        ></div>
      </div>
    </div>
    <transition name="slide">
      <Search v-if="isSearch"></Search>
    </transition>
    <transition name="fade">
      <keep-alive>
        <SelectorLoaction
          v-if="isSelLoaction"
          :cinemaData="cinemaData[0].cinemaFilter"
        ></SelectorLoaction>
      </keep-alive>
    </transition>
    <transition name="fade">
      <keep-alive>
        <SelectorSort v-if="isSelSort"></SelectorSort>
      </keep-alive>
    </transition>
    <transition name="fade">
      <keep-alive>
        <SelectorSpecial
          v-if="isSelSpecial"
          :cinemaData="cinemaData[0].cinemaFilter"
        ></SelectorSpecial>
      </keep-alive>
    </transition>
    <Loading v-if="isLoading"></Loading>
    <div
      class="cinema-list-box"
      ref="cinema"
    >
      <div
        class="cinema-list"
        ref="cinemaList"
      >
        <div
          v-for="(item,index) in cinemaData"
          :key="index"
        >
          <div
            class="cinema-box"
            v-for="(cinema,index) in item.mtopCinemas"
            :key="index"
            @click="showCinema(cinema)"
            v-show="cimenaNameSelect(cinema.cinemaName) && selectLocations(cinema.regionName) && selectSpecial(cinema.displaySupports)"
          >
            <div class="cinema-name-price">
              <span>{{cinema.cinemaName}}</span>
              <span>
                {{cinema.noShowDisplayPrice/100}}元
                <label>起</label>
              </span>
            </div>
            <div class="location">
              {{cinema.address}}
            </div>
            <div class="active">
              <span
                v-for="supports in cinema.displaySupports"
                :key="supports.code"
              >{{supports.name}}</span>
            </div>
            <div class="special">
              <span>特</span>
              特惠
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="move">
      <CinemaMovie
        v-show="isShowCinema"
        :cinemaMovieData="cinemaMovieData"
      ></CinemaMovie>
    </transition>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import logoAndCity from "../public/logoAndCity";
import SelectorLoaction from "../components/Cinema/SelectorLoaction";
import SelectorSort from "../components/Cinema/SelectorSort";
import SelectorSpecial from "../components/Cinema/SelectorSpecial";
import Search from "../components/Cinema/Search";
import CinemaMovie from "../components/Cinema/CinemaMovie";
import Loading from "../public/Loading";
import { mapState } from "vuex";

export default {
  name: "Cinema",
  data() {
    return {
      cinemaData: "",
      isLoading: true,
      isSelLoaction: false,
      isSelSort: false,
      isSelSpecial: false,
      isSearch: false,
      searchName: "",
      isShowCinema: false,
      cinemaMovieData: ""
    };
  },
  computed: {
    ...mapState(["localtionSel"]),
    ...mapState(["sortSel"]),
    ...mapState(["specialSel"])
  },
  methods: {
    _initCinemaScroll() {
      this.$nextTick(() => {
        this.cinemaScroll = new BScroll(this.$refs.cinema, {
          scrollY: true,
          click: true
        });
      });
    },
    getHeight() {
      this.$refs.bigBox.style.height =
        this.$refs.header.offsetHeight +
        this.$refs.cinemaList.offsetHeight +
        "px";
    },
    changeSelLoaction() {
      this.isSelLoaction = !this.isSelLoaction;
      this.isSelSort = false;
      this.isSelSpecial = false;
    },
    changeSelSort() {
      this.isSelSort = !this.isSelSort;
      this.isSelLoaction = false;
      this.isSelSpecial = false;
    },
    changeSelSpecial() {
      this.isSelSpecial = !this.isSelSpecial;
      this.isSelLoaction = false;
      this.isSelSort = false;
    },
    openSearch() {
      this.isSearch = true;
    },
    showCinema(data) {
      this.isShowCinema = true;
      this.cinemaMovieData = data;
    },
    cimenaNameSelect(cinemaName) {
      if (this.searchName !== "") {
        if (cinemaName.indexOf(this.searchName) !== -1) {
          return true;
        }
        return false;
      }
      return true;
    },
    selectLocations(local) {
      if (this.localtionSel === "不限区域" || !this.localtionSel) {
        return true;
      } else if (this.localtionSel.trim() === local) {
        return true;
      }
      return false;
    },
    selectSpecial(specal) {
      if (this.specialSel === "不限特色" || !this.specialSel) {
        return true;
      } else {
        for (let i = 0; i < specal.length; i++) {
          if (this.specialSel.trim() === specal[i].name) {
            return true;
          }
        }
        return false;
      }
    }
  },
  created() {
    this.$http.get("/api/cityData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.cinemaData = res.data.hotCities;
        this.isLoading = false;
      }
    });
  },
  mounted() {
    this._initCinemaScroll();
    this.getHeight();
  },
  updated() {
    this._initCinemaScroll();
    this.getHeight();
  },
  components: {
    logoAndCity,
    Loading,
    SelectorLoaction,
    SelectorSort,
    SelectorSpecial,
    Search,
    CinemaMovie
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/transition.css";
.cinema {
  width: 100%;
  .cinema-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    z-index: 111;
    .selector {
      float: right;
      width: 70%;
      height: 50px;
      .selector-title {
        float: left;
        width: 75px;
        height: 100%;
        text-align: center;
        line-height: 50px;
        .title {
          margin: 0 auto;
          max-width: 55px;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title::before {
          float: right;
          margin-top: 41%;
          content: "";
          border: 4px solid #333;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom: none;
        }
      }
      .search {
        width: 37px;
        height: 50px;
        background: url("../assets/img/search.png") no-repeat center center;
        background-size: 20px 20px;
      }
      .selector-title::before {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: 25px;
        top: 12px;
        bottom: 0;
        background: #e2e2e2;
      }
    }
  }
  .cinema-list-box {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    width: 100%;
    .cinema-list {
      width: 100%;
      height: auto;
      background-color: #fff;
      .cinema-box {
        width: 95%;
        height: 115px;
        margin: 0 auto;
        border-bottom: 1px solid #e2e2e2;
        .cinema-name-price {
          width: 100%;
          height: 25px;
          line-height: 25px;
          padding-top: 10px;
          font-size: 18px;
          span:nth-of-type(1) {
            display: inline-block;
            max-width: 70%;
            color: black;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          span:nth-of-type(2) {
            max-width: 20%;
            float: right;
            font-size: 14px;
            color: red;
            label {
              color: #999;
            }
          }
        }
        .location {
          max-width: 70%;
          color: #666;
          margin-top: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .active {
          max-width: 70%;
          margin-top: 5px;
          span {
            display: inline-block;
            height: 16px;
            padding: 1px 3px;
            margin-right: 2px;
            border: 1px solid #349cec;
            border-radius: 2px;
            font-size: 10px;
            color: #349cec;
          }
        }
        .special {
          width: 80px;
          margin-top: 5px;
          height: 20px;
          span {
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background-color: #fe7a4c;
            border-radius: 4px;
            color: white;
          }
        }
      }
    }
  }
}
</style>
