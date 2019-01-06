export const changeIsSelect = state => {
  state.isSelect = !state.isSelect;
}
export const changeSelectCity = (state, n) => {
  state.localCityName = n;
}
export const changeSelectlocation = (state, n) => {
  state.localtionSel = n;
}
export const changeSelectSort = (state, n) => {
  state.sortSel = n;
}
export const changeSelectSpecial = (state, n) => {
  state.specialSel = n;
}
export const changeLogin = (state, n) => {
  state.isLogin = n
}
