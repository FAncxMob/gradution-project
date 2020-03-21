const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    noDataText: '还没有浏览任何帖子...'
  },
  toDetailPage(e) {
    let iid = e.detail.iid
    wx.navigateTo({
      url: `/pages/detailPage/indexDetailPage/indexDetailPage?iid=${iid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._load()

  },

  async _load() {
    let result = await util.request('/getHistory')
    if (result.code) {
      this.setData({
        history: result.data
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