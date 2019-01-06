<template>
  <div
    class="logo-and-city"
    @click="openSelect()"
  >
    <div class="cityName">{{localCityName}}</div>
    <div class="arrowDrow"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "logoAndCity",
  computed: {
    ...mapState(["localCityName"])
  },
  methods: {
    openSelect() {
      this.$store.commit("changeIsSelect");
    }
  }
};
</script>
<style lang="scss" scoped>
.logo-and-city {
  float: left;
  width: 30%;
  height: 50px;
  line-height: 50px;
  background: url("../assets/img/logo.svg") no-repeat;
  background-size: 25px 25px;
  background-position: 15% 50%;
  .cityName {
    width: 28%;
    float: left;
    margin-left: 40%;
    font-weight: bold;
    font-size: 0.95rem;
    color: #333;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .arrowDrow {
    float: left;
    border: 4px solid #333;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom: none;
    margin-top: 24px;
    margin-left: 4px;
  }
}
</style>
