import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  isSelect: false,
  localCityName: "北京",
  localtionSel: "不限区域",
  sortSel: "选择排序",
  specialSel: "不限特色",
  isLogin: false
}

export default new Vuex.Store({
  state,
  mutations
})
