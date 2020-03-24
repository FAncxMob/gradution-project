const util = require('../../utils/util')

Page({
  data: {
    background: ['../../icon/dong.jpg', '../../icon/hanlu.jpg', '../../icon/lidong.jpg', '../../icon/shuangjiang.jpg'],
    noDataText: '还没有任何校园热点新闻...',
    schoolNews: [],

    searchResult: [],
    searchStr: '',
  },
  toDetailPage(e) {
    let iid = e.detail.iid
    wx.navigateTo({
      url: `/pages/detailPage/schoolNewsDetailPage/schoolNewsDetailPage?iid=${iid}`
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

    let result = await util.request('/searchSchoolNews', {
      searchStr,
      classify: 4
    })
    wx.hideLoading()
    if (result.code) {
      // 
      this.setData({
        schoolNews: result.data
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
  onLoad: function (options) {

  },

  async _load() {

    let result = await util.request('/getSchoolNews')
    if (result.code) {
      this.setData({
        schoolNews: result.data
      })
    } else {
      console.log('获取失败了')
    }

  },
  onShow() {
    this._load()

  }

})