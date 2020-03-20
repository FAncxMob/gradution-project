const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["校园跑腿", "二手交易", "兼职招聘", "失物招领"],
    tabArrForLostAndFound: ["丢了东西", "捡了东西"],
    currentSelect: 0,
    currentSelectForLostAndFound: 0,
    legWork: [],
    secondHand: [],
    partTimeJob: [],
    lost: [],
    found: [],

    searchResult: [],

    searchStr: '',

    // btnData: {
    //   btnText: '我要帮忙',
    //   btnConfirmText: '确定要取消收藏该帖子吗?'
    // }
  },

  handleSelect(data) {
    this.setData({
      currentSelect: data.detail,
    })
  },
  handleSelectForLostAndFound(data) {
    this.setData({
      currentSelectForLostAndFound: data.detail,
    })
  },
  //搜索时触发
  async searchConfirm(e) {
    let {
      searchStr,
      currentSelect,
      currentSelectForLostAndFound
    } = this.data
    wx.showLoading({
      title: '正在检索...'
    })

    let classify
    if (currentSelect !== 3) {
      classify = currentSelect
    } else {
      classify = currentSelectForLostAndFound == 0 ? 3 : 5
    }

    let result = await util.request('/searchInIndexPage', {
      searchStr,
      classify
    })
    wx.hideLoading()
    if (result.code) {
      // 
      let data = this.data[result.str]
      this.setData({
        [result.str]: result.data
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
    console.log('clear')
    this.setData({
      searchStr: ''
    })
  },
  // //清空搜索框
  // activity_clear(e) {

  //   this.setData({
  //     searchstr: ''
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._load()

  },

  async _load() {
    let result = await util.request('/getAllPost')
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