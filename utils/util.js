let config = require('./config')


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 封装的发送请求的方法：
let token = wx.getStorageSync('token')
// 携带token的方式: 1. cookie(不推荐) 2. 作为参数放在url中 3. 放在请求头
const request = function (url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        authorization: token
      },
      success: function (res) {
        // console.log("data:", res.data)
        resolve(res.data)
        // success
      },
      fail: function (error) {
        reject(error)
        // fail
      },
      complete: function () {
        // complete
      }
    })
  })


}

module.exports = {
  formatTime: formatTime,
  request
}