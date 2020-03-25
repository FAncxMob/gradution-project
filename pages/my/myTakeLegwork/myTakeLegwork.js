const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["未完成", "已完成"],
    currentSelect: 0,
    searchResult: [],
    searchStr: '',

  },
  handleSelect(data) {
    this.setData({
      currentSelect: data.detail,
    })
  },
  //搜索时触发
  async searchConfirm(e) {
    let {
      searchStr,
    } = this.data
    wx.showLoading({
      title: '正在检索...'
    })

    let result = await util.request('/searchMyTaker', {
      searchStr,
      statusArr: this.data.currentSelect === 0 ? [1] : [2]
    })
    wx.hideLoading()
    if (result.code) {
      // 
      this.setData({
        [result.classifyStr]: result.data
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
    let result = await util.request('/getMyTaker')
    if (result.code) {
      this.setData({
        ...result.data
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