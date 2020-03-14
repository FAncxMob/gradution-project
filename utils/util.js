let config = require('./config')
const moment = require('moment.min.js');




const Utils = {
  formatDate: function (timestap) {
    if (!timestap) return null
    return moment(timestap).format('YYYY-MM-DD HH:mm')
  },
  formatSSDate: function (timestap) {
    if (!timestap) return null
    return moment(timestap).format('YYYY-MM-DD HH:mm:ss')
  },
  formatSimpDate: function (timestap) {
    if (!timestap) return null
    return moment(timestap).format('YYYY-MM-DD')
  },
  formatDotDate: function (timestap) {
    if (!timestap) return null
    return moment(timestap).format('YYYY.MM.DD')
  },
  isToday: function (timestap) {
    return moment().subtract(10, 'days').calendar() === moment(timestap).subtract(10, 'days').calendar()
  },
  getDateTime: function (timestap) {
    let date = moment(timestap).get('date')
    return date + '日'
  },
  formatHMData(timestap) {
    return moment(timestap).format('HH:mm')
  },
  getRemainMinute(time1, time2) {
    return moment(time2).diff(moment(time1), 'minute')
  },
  // 封装的发送请求的方法：
  // 携带token的方式: 1. cookie(不推荐) 2. 作为参数放在url中 3. 放在请求头
  request(url, data = {}, method = 'GET') {
    let token = wx.getStorageSync('token')
    return new Promise(function (resolve, reject) {
      // console.log(token, url)
      wx.request({
        url: config.host + url,
        data,
        method,
        header: {
          authorization: token
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (error) {
          reject(error)
        },
        complete: function () {}
      })
    })
  }
}



module.exports = Utils