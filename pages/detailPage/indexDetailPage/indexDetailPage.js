const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    isFollowing: '',
    commentDetail: [],
    openId: ''
  },
  cancelFollowing(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消关注吗？',
      async success(res) {
        if (res.confirm) {
          let cancelOpenId = e.currentTarget.dataset.openid
          wx.showLoading({
            title: ''
          })
          let result = await util.request('/cancelFollowing', {
            cancelOpenId
          })
          wx.hideLoading()
          if (result.code) {

            that._load(that.data.detail._id)
          }
        }
      }
    })
  },

  async followingTa(e) {
    let followId = e.currentTarget.dataset.openid
    let result = await util.request('/followingTa', {
      followId
    })
    if (result.code) {
      // this._load()
      this._load(this.data.detail._id)
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
        isFollowing: result.data.isFollowing,
        openId: result.data.openId,
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