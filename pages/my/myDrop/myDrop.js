const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["校园跑腿", "二手交易", "兼职招聘", "失物招领"],
    currentSelect: 0,
    tabForLostAndFound: ["丢了东西", "捡了东西"],
    currentSelectForLostAndFound: 0,
    noDataText: '还没有下架任何帖子...',
    searchResult: [],
    searchStr: '',
    legWork: [],
    secondHand: [],
    partTimeJob: [],
    lost: [],
    found: []
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
      classify = currentSelectForLostAndFound === 0 ? 3 : 5
    }

    let result = await util.request('/searchMyDrop', {
      searchStr,
      classify
    })
    wx.hideLoading()
    if (result.code) {
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

  putOn(e) {
    console.log(e.detail)
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要恢复上架该帖子吗？上架后的帖子将会对其他用户可见',
      async success(res) {
        if (res.confirm) {
          let iid = e.detail.iid
          let classify = e.detail.classify
          let index = e.detail.index
          let putOnData = e.currentTarget.dataset.putondata
          let putOnName = e.currentTarget.dataset.putonname


          console.log(iid, classify, putOnData, putOnName)

          let result = await util.request('/putOn', {
            iid,
            classify
          })

          if (result.code) {
            putOnData.splice(index, 1)
            that.setData({
              [putOnName]: putOnData

            }, () => util.showModal(`上架成功，您可以在我的发布模块查看已上架的帖子`, 3000))
          } else {
            util.showModal(`上架失败了，请重试`)
          }
        }
      }
    })
  },

  delete(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '删除的帖子将不可找回，您确定要删除该帖子吗？',
      async success(res) {
        if (res.confirm) {
          let iid = e.detail.iid
          let classify = e.detail.classify
          let index = e.detail.index
          let dropData = e.currentTarget.dataset.dropdata
          let dropName = e.currentTarget.dataset.dropname

          console.log(iid, classify)

          let result = await util.request('/delete', {
            iid,
            classify
          })

          if (result.code) {
            dropData.splice(index, 1)
            that.setData({
              [dropName]: dropData

            }, () => {
              wx.showToast({
                title: "删除成功",
                icon: 'success',
                duration: 2000
              })
            })
          } else {
            util.showModal(`删除失败了，请重试`)
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
    let result = await util.request('/getDrop')
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