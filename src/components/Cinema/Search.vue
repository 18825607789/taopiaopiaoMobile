<template>
  <div class="search">
    <div class="search-box">
      <input
        class='search-input'
        type="text"
        v-model='cinemaName'
      >
    </div>
    <button
      class="search-back"
      @click="closeSearch()"
    >取消</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cinemaName: ""
    };
  },
  methods: {
    closeSearch() {
      this.$parent.isSearch = false;
    }
  },
  watch: {
    cinemaName(newValue, oldValue) {
      this.$parent.searchName = newValue;
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 111;
  .search-box {
    padding-right: 60px;
    padding-left: 15px;
    margin-top: 9px;
    .search-input {
      width: 100%;
      margin-top: 0.15rem;
      box-sizing: border-box;
      height: 1.7rem;
      padding-left: 30px;
      background: url("../../assets/img/search.png") no-repeat 5px center;
      background-size: 1.2rem auto;
      border-radius: 3px;
      border: 1px solid #eee;
      outline: none;
    }
  }
  .search-back {
    outline: none;
    width: 55px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 9px;
    border: 0;
    background-color: #fff;
    font-size: 0.9rem;
    color: #349cec;
    height: 2rem;
  }
}
</style>
