<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer">
      <router-link
        class="footerItem"
        to='/movie'
      >电影</router-link>
      <router-link
        class="footerItem"
        to='/cinema'
      >影院</router-link>
      <router-link
        class="footerItem"
        to='/mine'
      >我的</router-link>
    </div>
    <transition name="move">
      <City
        class="city"
        v-show="isSelect"
      ></City>
    </transition>
  </div>
</template>
<script>
import City from "../src/public/City";
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["isSelect"])
  },
  components: {
    City
  }
};
</script>

<style lang="scss">
@import "../src/assets/css/transition.css";
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 3px;
    border-top: 1px solid #ddd;
    background-color: #fff;
    font-size: 0;
    .footerItem {
      display: inline-block;
      width: 33.33%;
      height: 100%;
      padding-top: 28px;
      padding-bottom: 0.2rem;
      text-align: center;
      font-size: 0.85rem;
    }
    .footerItem:nth-of-type(1) {
      background: url("../src/assets/img/moive.png") no-repeat;
      background-size: 25px 25px;
      background-position: 50% 0;
    }
    .footerItem:nth-of-type(2) {
      background: url("../src/assets/img/cinema.png") no-repeat;
      background-size: 25px 25px;
      background-position: 50% 0;
    }
    .footerItem:nth-of-type(3) {
      background: url("../src/assets/img/user.png") no-repeat;
      background-size: 25px 25px;
      background-position: 50% 0;
    }
    .footerItem.router-link-active:nth-of-type(1) {
      color: #ff4d64;
      background: url("../src/assets/img/moive_active.png") no-repeat;
      background-size: 25px 25px;
      background-position: 50% 0;
    }
    .footerItem.router-link-active:nth-of-type(2) {
      color: #ff4d64;
      background: url("../src/assets/img/cinema_active.png") no-repeat;
      background-size: 25px 25px;
      background-position: 50% 0;
    }
    .footerItem.router-link-active:nth-of-type(3) {
      color: #ff4d64;
      background: url("../src/assets/img/user_active.png") no-repeat;
      background-size: 25px 25px;
      background-position: 50% 0;
    }
  }
  .city{
    z-index: 999;
  }
}
</style>
