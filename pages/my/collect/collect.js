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
    },
    searchResult: [],
    searchStr: '',
  },

  //搜索时触发
  async searchConfirm(e) {
    let {
      searchStr,
    } = this.data
    wx.showLoading({
      title: '正在检索...'
    })

    let result = await util.request('/searchMyCollect', {
      searchStr
    })
    console.log('/searchMyCollect', {
      searchStr
    })
    wx.hideLoading()
    if (result.code) {
      // 
      this.setData({
        myCollect: result.data
      })
    }
  },
  //输入时触发
  searchInput(e) {
    this.setData({
      searchStr: e.detail.detail.value
    })
  },
  // 清空搜索时触发
  searchClear() {
    this.setData({
      searchStr: ''
    })
  },

  toDetailPage(e) {
    let iid = e.detail.iid
    let classify = e.detail.classify
    let status = e.detail.status
    if (status == 6) {
      util.showModal('该帖子已被发帖人删除！无法查看详情')
      return
    }
    if (classify === 4) {
      wx.navigateTo({
        url: `/pages/detailPage/schoolNewsDetailPage/schoolNewsDetailPage?iid=${iid}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/detailPage/indexDetailPage/indexDetailPage?iid=${iid}`
      })
    }


  },

  async cancelCollectPost(e) {
    let cancelInvitationsId = e.detail.cancelInvitationsId
    wx.showLoading({
      title: ''
    })
    let result = await util.request('/cancelCollectPost', {
      iid: cancelInvitationsId
    })
    console.log('/cancelCollectPost', {
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
    console.log('/getMyCollect')
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