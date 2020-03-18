const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCollect: []
  },

  cancelCollectPost(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏该帖子吗？',
      async success(res) {
        if (res.confirm) {

          let cancelInvitationsId = e.currentTarget.dataset.invitationsid
          wx.showLoading({
            title: ''
          })
          let result = await util.request('/cancelCollectPost', {
            cancelInvitationsId
          })
          wx.hideLoading()
          if (result.code) {
            that._load()
          }
        }
      }
    })
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