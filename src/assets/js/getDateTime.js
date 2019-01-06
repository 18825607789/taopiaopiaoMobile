export function getDateTime(time, template) {
  let date = new Date(parseInt(time));
  let year = date.getFullYear() + ''
  template = template.replace(/(y+)/, function (val) {
    return year.substr(4 - val.length)
  })
  let dateObj = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for (let key in dateObj) {
    let reg = new RegExp(key, 'g')
    template = template.replace(reg, function (val) {
      let str = dateObj[key]
      if (val.length === 1) {
        return str
      } else {
        return ('00' + str).substr(str.toString().length)
      }
    })
  }
  return template
}
