<template>
  <div class="movie clearfix">
    <div class="movie-header clearfix">
      <logoAndCity></logoAndCity>
      <div class="nav">
        <router-link
          to='/movie'
          class="hotMovie"
        >正在热映</router-link>
        <router-link
          to='/movie/soon'
          class="showSoon"
        >即将上映</router-link>
      </div>
    </div>
    <router-view class="movie-box"></router-view>
  </div>
</template>
<script>
import logoAndCity from "../public/logoAndCity";
export default {
  name: "Movie",
  components: {
    logoAndCity
  }
};
</script>
<style lang="scss" scoped>
.movie {
  position: relative;
  .nav {
    float: right;
    width: 50%;
    height: 50px;
    .hotMovie,
    .showSoon {
      display: inline-block;
      width: 40%;
      height: 40px;
      text-align: center;
      color: #777;
      font-size: 0.95rem;
      line-height: 40px;
      margin-left: 5%;
      margin-top: 3%;
    }
    .hotMovie.router-link-exact-active,
    .showSoon.router-link-exact-active {
      color: #ff4d64;
      border-bottom: 2px solid #ff4d64;
      font-weight: bold;
    }
  }
  .movie-box {
    padding-bottom: 55px;
  }
}
</style>
