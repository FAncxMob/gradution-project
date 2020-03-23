const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCollect: [],
    noDataText: '还没有收藏任何帖子...',
    btnData: {
      btnText: '取消收藏',
      btnConfirmText: '确定要取消收藏该帖子吗?'
    }
  },
  toDetailPage(e) {
    let iid = e.detail.iid
    wx.navigateTo({
      url: `/pages/detailPage/indexDetailPage/indexDetailPage?iid=${iid}`
    })
  },

  async cancelCollectPost(e) {
    console.log(e.detail, '父组件')
    let cancelInvitationsId = e.detail.cancelInvitationsId
    wx.showLoading({
      title: ''
    })
    let result = await util.request('/cancelCollectPost', {
      iid: cancelInvitationsId
    })
    wx.hideLoading()
    if (result.code) {
      this._load()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._load()

  },

  async _load() {

    let result = await util.request('/getMyCollect')
    if (result.code) {
      console.log('/getMyCollect')
      this.setData({
        myCollect: result.data
      })
    } else {
      console.log('获取失败了')
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