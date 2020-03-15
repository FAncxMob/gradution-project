const util = require('../../../utils/util')

const app = getApp()
let {
  globalData
} = app

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  bindToPage: function (event) {
    if (!globalData.userInfo) {
      return
    }
    let page = event.currentTarget.dataset.page
    wx.navigateTo({
      url: page
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  async onLoad() {
    if (wx.getStorageSync('token') && wx.getStorageSync('haveUser') === 1) {
      let data = await util.request('/getUserInfo')
      console.log('/getUserInfo-my')
      this.setData({
        userInfo: data.userInfo,
      })
    }
    // console.log(app.globalData.userInfo, 'app.globalData.userInfo')
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //   })
    // }
  }
})