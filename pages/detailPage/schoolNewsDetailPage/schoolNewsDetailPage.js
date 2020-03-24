const util = require('../../../utils/util')
const config = require('../../../utils/config')
const THE_COMMENT_ID = config.commentId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    isLike: '',
    isCollect: '',
    openId: '',
  },

  async cancelLikePost(e) {
    let result = await util.request('/cancelLikePost', {
      iid: this.data.detail._id
    })

    if (result.code) {
      let detail = this.data.detail
      detail.like -= 1
      this.setData({
        isLike: false,
        detail
      })
    }
  },
  async likePost(e) {
    let result = await util.request('/likePost', {
      iid: this.data.detail._id,
      postOpenId: this.data.detail.openId,
    })
    if (result.code) {
      let detail = this.data.detail
      detail.like += 1
      this.setData({
        isLike: true,
        detail
      })
    }
  },
  async cancelCollectPost(e) {
    let result = await util.request('/cancelCollectPost', {
      iid: this.data.detail._id
    })
    if (result.code) {
      let detail = this.data.detail
      detail.collect -= 1
      this.setData({
        isCollect: false,
        detail
      })
    }
  },
  async collectPost(e) {
    let result = await util.request('/collectPost', {
      iid: this.data.detail._id,
      postOpenId: this.data.detail.openId,
    })
    if (result.code) {
      let detail = this.data.detail
      detail.collect += 1
      this.setData({
        isCollect: true,
        detail
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.iid) {
      let iid = options.iid
      this.setData({
        iid
      })
    } else {
      console.log('吼啦！没传iid，怎么查详情啊')
    }

  },
  async _load(iid) {
    // let {
    //   fakeData
    // } = this.data
    // this.setData({
    //   detail: fakeData.data.detail,
    //   commentDetail: fakeData.data.commentDetail,
    //   isFollowing: fakeData.data.isFollowing,
    //   openId: fakeData.data.openId,
    // })
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
        isLike: result.data.isLike,
        isCollect: result.data.isCollect,
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
    this._load(this.data.iid)

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