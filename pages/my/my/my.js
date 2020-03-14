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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  async getUserInfo(e) {
    let userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    if (!userInfo) {
      return
    }
    // 授权获取userInfo
    // 发送token（openId）和和userInfo到数据库
    // let token = wx.getStorageSync('token')
    let data = {
      userInfo
    }
    let result = await util.request('/saveOpenId', data)
    if (result !== 'error') {
      globalData.login = true
    }
    console.log('登录结果:', result)

    this.setData({
      userInfo,
      hasUserInfo: true
    })



  }
})