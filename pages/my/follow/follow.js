const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["我的关注", "我的粉丝"],
    currentSelect: 0,
    following: [],
    follower: []
  },

  handleSelect(data) {
    this.setData({
      currentSelect: data.detail,
    })
  },

  cancelFollowing(e) {
    let nickName = e.currentTarget.dataset.nickname
    let that = this
    wx.showModal({
      title: '提示',
      content: `确定要取消关注 ${nickName} 吗？`,
      async success(res) {
        if (res.confirm) {

          let cancelOpenId = e.currentTarget.dataset.openid
          wx.showLoading({
            title: ''
          })
          let result = await util.request('/cancelFollowing', {
            cancelOpenId
          })
          console.log('/cancelFollowing', {
            cancelOpenId
          })
          wx.hideLoading()
          if (result.code) {
            that._load()
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
    console.log('/followingTa', {
      followId
    })
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

    let result = await util.request('/getFollowingAndFollowerByOpenId')
    console.log('/getFollowingAndFollowerByOpenId')
    if (result.code) {
      this.setData({
        following: result.data.following,
        follower: result.data.follower,
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