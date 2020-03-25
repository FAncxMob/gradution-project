const util = require('../../../utils/util')
import WxValidate from '../../../utils/WxValidate'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicInfo: {
      takerContact: ''
    },
    helpData: []
  },

  async submitHelp(e) {
    let myOpenId = wx.getStorageSync('openId')
    if (this.data.helpData.openId == myOpenId) {
      util.showModal('不能购买自己发的订单哦~')
      return false
    }
    const params = e.detail.value
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let value = {
      takerContact: params.takerContact,
      iid: this.data.helpData._id
    }


    let result = await util.request('/submitHelp', value)
    if (result.code) {
      if (result.data.code === 1) {
        wx.showToast({
          title: "承接成功",
          icon: 'success',
          duration: 2000,
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      } else if (result.data.code === 2) {
        util.showModal('哎呀，下手慢了，已被别人承接了...')
      }
    } else {
      util.showModal('承接失败了，请重试')
    }

  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 2000
    })
  },
  initValidate() {
    const rules = {
      takerContact: {
        required: true,
        tel: true
      }
    };
    const messages = {
      takerContact: {
        required: '请输入您的电话！',
        tel: '请输入正确的手机号码！'
      }
    };
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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
    let result = await util.request('/getHelpData', {
      iid
    })
    wx.hideLoading()
    if (result.code) {
      this.setData({
        helpData: result.data.helpData
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