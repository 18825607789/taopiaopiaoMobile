<template>
  <div class="special-container">
    <div class="special-box">
      <span
        v-for="(item,index) in cinemaData.supports"
        :key="index"
        @click="selectSpecialion(index)"
        :class='{con : special === index}'
      >
        {{item.desc}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectorSpecial",
  props: ["cinemaData"],
  data() {
    return {
      special: ""
    };
  },
  methods: {
    selectSpecialion(index) {
      var special = event.target.innerHTML;
      if (this.special !== index) {
        this.special = index;
        this.$store.commit("changeSelectSpecial", special);
      } else {
        this.special = "";
        this.$store.commit("changeSelectSpecial", "不限特色");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.special-container {
  position: fixed;
  top: 51px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 111;
  .special-box {
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
