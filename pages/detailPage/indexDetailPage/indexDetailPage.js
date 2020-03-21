const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.iid) {
      let iid = options.iid
      this._load(iid)
    } else {
      console.log('吼啦！没传iid，怎么查详情啊')
    }

  },
  async _load(iid) {
    wx.showLoading({
      title: '拼命搜索中'
    })
    let result = await util.request('/getPostDetail', {
      iid
    })
    wx.hideLoading()
    if (result.code) {
      this.setData({
        detail: result.data.detail,
        commentDetail: result.data.commentDetail,
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