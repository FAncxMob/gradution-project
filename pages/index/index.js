const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["校园跑腿", "二手交易", "兼职招聘", "失物招领"],
    currentSelect: 0,
    tabForLostAndFound: ["丢了东西", "捡了东西"],
    currentSelectForLostAndFound: 0,
    tabForLegWork: ["全部", "未被承接", "已被承接", "已完成"],
    tabForSecondhand: ["全部", "未被购买", "已被购买", "已完成"],
    tabForPartTimeJob: ["全部", "招募中", "已结束"],
    tabForLost: ["全部", "寻找中", "已结束"],
    tabForFound: ["全部", "寻找中", "已结束"],

    currentSelectForLegWork: 0,
    currentSelectForSecondhand: 0,
    currentSelectForPartTimeJob: 0,
    currentSelectForLost: 0,
    currentSelectForFound: 0,

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

  async release(e) {
    let classify = e.currentTarget.dataset.classify
    let url = ''
    switch (classify) {
      case '0':
        url = `/pages/release/releaseLegwork/releaseLegwork`
        break;
      case '1':
        url = `/pages/release/releaseSecondhand/releaseSecondhand`
        break;
      case '2':
        url = `/pages/release/releasePartimJob/releasePartimJob`
        break;
      case '3':
      case '5':
        url = `/pages/release/releaseLostAndFound/releaseLostAndFound`
        break;
      default:
        break;
    }
    wx.navigateTo({
      url
    })

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
      currentSelectForLostAndFound,
      currentSelectForLegWork,
      currentSelectForSecondhand,
      currentSelectForPartTimeJob,
      currentSelectForLost,
      currentSelectForFound,
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

    let statusArr = []
    let statusName = ''
    switch (classify) {
      case 0:
        if (currentSelectForLegWork === 0) {
          statusArr = [0, 1, 2, 4, 5]
          statusName = 'statusIs01245'
        } else if (currentSelectForLegWork === 1) {
          statusArr = [0]
          statusName = 'statusIs0'
        } else if (currentSelectForLegWork === 2) {
          statusArr = [1]
          statusName = 'statusIs1'
        } else if (currentSelectForLegWork === 3) {
          statusArr = [2]
          statusName = 'statusIs2'
        }
        break;
      case 1:
        if (currentSelectForSecondhand === 0) {
          statusArr = [0, 1, 2, 4, 5]
          statusName = 'statusIs01245'
        } else if (currentSelectForSecondhand === 1) {
          statusArr = [0]
          statusName = 'statusIs0'
        } else if (currentSelectForSecondhand === 2) {
          statusArr = [1]
          statusName = 'statusIs1'
        } else if (currentSelectForSecondhand === 3) {
          statusArr = [2]
          statusName = 'statusIs2'
        }
        break;
      case 2:
        if (currentSelectForPartTimeJob === 0) {
          statusArr = [0, 2]
          statusName = 'statusIs02'
        } else if (currentSelectForPartTimeJob === 1) {
          statusArr = [0]
          statusName = 'statusIs0'
        } else if (currentSelectForPartTimeJob === 3) {
          statusArr = [2]
          statusName = 'statusIs2'
        }
        break;
      case 3:
        if (currentSelectForLost === 0) {
          statusArr = [0, 2]
          statusName = 'statusIs02'
        } else if (currentSelectForLost === 1) {
          statusArr = [0]
          statusName = 'statusIs0'
        } else if (currentSelectForLost === 3) {
          statusArr = [2]
          statusName = 'statusIs2'
        }
        break;
      case 5:
        if (currentSelectForFound === 0) {
          statusArr = [0, 2]
          statusName = 'statusIs02'
        } else if (currentSelectForFound === 1) {
          statusArr = [0]
          statusName = 'statusIs0'
        } else if (currentSelectForFound === 3) {
          statusArr = [2]
          statusName = 'statusIs2'
        }
        break;

      default:
        break;
    }

    let result = await util.request('/searchInIndexPage', {
      searchStr,
      classify,
      statusArr
    })
    console.log('/searchInIndexPage', {
      searchStr,
      classify,
      statusArr
    })
    wx.hideLoading()
    if (result.code) {

      // 修改对应类下对应status 的 结果数据
      console.log(this.data[result.classifyStr], statusName)
      let data = this.data[result.classifyStr]
      data[statusName] = result.data
      // console.log(data[statusName])
      this.setData({
        [result.classifyStr]: data
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
    wx.showLoading({
      title: '一生命悬检索中...'
    })
    let result = await util.request('/getAllPost')
    console.log('/getAllPost')
    wx.hideLoading()
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