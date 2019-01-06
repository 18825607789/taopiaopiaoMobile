<template>
  <div class="selector-container">
    <div class="local-box">
      <span
        v-for="(name,index) in cinemaData.regionNames"
        :key="name"
        @click="selectLocation(index)"
        :class='{con : localtion === index}'
      >
        {{name}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectorLoaction",
  props: ["cinemaData"],
  data() {
    return {
      localtion: ""
    };
  },
  methods: {
    selectLocation(index) {
      var local = event.target.innerHTML;
      if (this.localtion !== index) {
        this.localtion = index;
        this.$store.commit("changeSelectlocation", local);
      } else {
        this.localtion = "";
        this.$store.commit("changeSelectlocation", "不限区域");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.selector-container {
  position: fixed;
  top: 51px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 111;
  .local-box {
    width: 100%;
    span {
      display: inline-block;
      width: 76px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-weight: bold;
      border: 1px solid #e2e2e2;
      margin: 7.5px;
      &.con {
        color: red;
        border-color: red;
      }
    }
  }
}
</style>
