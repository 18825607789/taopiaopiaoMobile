<template>
  <div class="city">
    <div class="list-header">
      选择城市
      <span @click="closeSelect()"></span>
    </div>
    <div class="city-list">
      <div class="item now-city clearfix">
        <span>当前</span>
        <div class="list">{{localCityName}}</div>
      </div>
      <div class="item hot-city clearfix">
        <span>热门</span>
        <div
          class="list"
          v-for="item in hotCity"
          :key="item.id"
          @click="selectCity();closeSelect()"
        >{{item.name}}</div>
      </div>
      <div
        class="item all-city clearfix"
        v-for="(items,key) in cityList"
        :key="key"
      >
        <span>{{key}}</span>
        <div
          class="list"
          v-for="(city,index) in items"
          :key="index"
          @click="selectCity();closeSelect()"
        >{{city.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "City",
  computed: {
    ...mapState(["localCityName"])
  },
  data() {
    return {
      hotCity: [],
      cityList: ""
    };
  },
  created() {
    this.$http.get("/api/cityData").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.hotCity = res.data.hotCities;
        this.cityList = res.data.cities;
      }
    });
  },
  methods: {
    selectCity() {
      var city = event.target.innerHTML;
      this.$store.commit("changeSelectCity", city);
    },
    closeSelect() {
      this.$store.commit("changeIsSelect");
    }
  }
};
</script>
<style lang="scss" scoped>
.city {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  .list-header {
    position: fixed;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    background-color: #fff;
    span {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("../assets/img/X.png") no-repeat center center;
      background-size: 100%;
    }
  }
  .city-list {
    width: 100%;
    margin-top: 45px;
    line-height: 45px;
    .item {
      width: 100%;
      span {
        display: block;
        width: 95%;
        height: 45px;
        padding-left: 5%;
        background: rgba(204, 204, 204, 0.288);
      }
      .list {
        width: 95%;
        height: 45px;
        float: right;
        background: #fff;
        border-bottom: 1px solid rgba(204, 204, 204, 0.288);
        font-size: 16px;
      }
    }
  }
}
</style>
