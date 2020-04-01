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
    if (!wx.getStorageSync('token')) {
      wx.showModal({
        title: '提示',
        content: '登陆之后才能查看详细信息哦~',
        confirmText: '去登陆',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/index/index'
            })
          }
        }
      })
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
  moreUserInfo() {
    wx.navigateTo({
      url: '/pages/my/userInfo/userInfo'
    })
  },

  async onLoad() {
    // this._load()
    // console.log(app.globalData.userInfo, 'app.globalData.userInfo')
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //   })
    // }
  },
  async _load() {
    if (wx.getStorageSync('token')) {
      let data = await util.request('/getUserInfo')
      console.log('/getUserInfo')
      this.setData({
        userInfo: data.userInfo,
      })
    }
  },
  async onShow() {
    this._load()
  }


})