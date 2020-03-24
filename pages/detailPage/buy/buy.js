const util = require('../../../utils/util')
import WxValidate from '../../../utils/WxValidate'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyData: [],
  },
  chooseAddress() {
    wx.showLoading({
      title: '跳转中...'
    })
    wx.navigateTo({
      url: '/pages/my/addressManager/addressManager?type=choose',
      success: function (res) {
        wx.hideLoading()
      }
    })
  },
  async submitBuy(e) {
    let {
      addressData
    } = this.data
    if (!addressData) {
      util.showModal('请选择您的收货地址')
      return false
    }
    let value = {
      buyerAddressId: addressData._id,
      iid: this.data.buyData._id
    }
    console.log(value)
    let result = await util.request('/submitBuy', value)
    if (result.code) {
      if (result.data.code === 1) {
        wx.showToast({
          title: "购买成功",
          icon: 'success',
          duration: 2000,
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else if (result.data.code === 2) {
        util.showModal('哎呀，下手慢了，已被别人购买了...')
      }
    } else {
      util.showModal('购买失败了，请重试')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.iid) {
      let iid = options.iid
      this._load(iid)
    } else {
      console.log('吼啦！怎么没传iid啊')
    }

  },
  async _load(iid) {
    wx.showLoading({
      title: '拼命加载中'
    })
    let result = await util.request('/getBuyData', {
      iid
    })
    wx.hideLoading()
    if (result.code) {
      this.setData({
        buyData: result.data.buyData
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})