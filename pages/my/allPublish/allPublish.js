const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["校园跑腿", "二手交易", "兼职招聘", "失物招领"],
    currentSelect: 0,
    tabForLegWork: ["未被承接", "已被承接", "已完成"],
    currentSelectForLegWork: 0,
    tabForSecondhand: ["未被购买", "已被购买", "已完成"],
    currentSelectForSecondhand: 0,
    tabForPartTimeJob: ["招募中", "已结束"],
    currentSelectForPartTimeJob: 0,
    tabForLostAndFound: ["丢了东西", "捡了东西"],
    currentSelectForLostAndFound: 0,
    tabForLost: ["寻找中", "已结束"],
    currentSelectForLost: 0,
    tabForFound: ["寻找中", "已结束"],
    currentSelectForFound: 0,
    legWork: [],
    secondHand: [],
    partTimeJob: [],
    lostAndFound: [],
    lost: [],
    found: []
  },

  handleSelectForLost(data) {
    this.setData({
      currentSelectForLost: data.detail,
    })
  },
  handleSelectForFound(data) {
    this.setData({
      currentSelectForFound: data.detail,
    })
  },
  handleSelectForLostAndFound(data) {
    this.setData({
      currentSelectForLostAndFound: data.detail,
    })
  },
  handleSelectForPartTimeJob(data) {
    this.setData({
      currentSelectForPartTimeJob: data.detail,
    })
  },
  handleSelectForSecondhand(data) {
    this.setData({
      currentSelectForSecondhand: data.detail,
    })
  },
  handleSelectForLegWork(data) {
    this.setData({
      currentSelectForLegWork: data.detail,
    })
  },
  handleSelect(data) {
    this.setData({
      currentSelect: data.detail,
    })
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


  },

  async _load() {

    let result = await util.request('/getAllPublish')
    if (result.code) {
      this.setData({
        legWork: result.data.legWork,
        secondHand: result.data.secondHand,
        partTimeJob: result.data.partTimeJob,
        lost: result.data.lost,
        found: result.data.found
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
    this._load()
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