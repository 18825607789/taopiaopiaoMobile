<template>
  <div class="sort-container">
    <div class="sort-box">
      <span
        v-for="(item,index) in sortData"
        :key="index"
        @click="selectLocation(index)"
        :class='{con : sort === index}'
      >{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectorSort",
  data() {
    return {
      sort: "",
      sortData: ["综合排序", "离我最近", "价格最低"]
    };
  },
  methods: {
    selectLocation(index) {
      var sort = event.target.innerHTML;
      if (this.sort !== index) {
        this.sort = index;
        this.$store.commit("changeSelectSort", sort);
      } else {
        this.sort = "";
        this.$store.commit("changeSelectSort", "选择排序");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.sort-container {
  position: fixed;
  top: 51px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 111;
  .sort-box {
    width: 100%;
    span {
      display: block;
      width: 90%;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      border-bottom: 1px solid #e2e2e2;
      &.con{
          color: red;
      }
    }
  }
}
</style>
