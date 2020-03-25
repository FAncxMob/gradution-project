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
    tabForLost: ["寻找中", "已找回"],
    currentSelectForLost: 0,
    tabForFound: ["寻找中", "已归还"],
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
  drop(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要下架该帖子吗？下架的帖子将不会被其他用户搜索到',
      async success(res) {
        if (res.confirm) {
          let iid = e.detail.iid
          let classify = e.detail.classify
          let index = e.detail.index
          let dropData = e.currentTarget.dataset.dropdata
          let dropName = e.currentTarget.dataset.dropname
          let {
            legWork
          } = that.data

          console.log(iid, classify)

          let result = await util.request('/drop', {
            iid,
            classify
          })

          if (result.code) {
            dropData.splice(index, 1)
            that.setData({
              [dropName]: dropData

            }, () => util.showModal('下架成功，您可以在我的页面的已下架模块查看已下架的帖子'))

          } else {
            util.showModal(`下架失败了，请重试`)
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
  complete(e) {
    let that = this

    let iid = e.detail.iid
    let classify = e.detail.classify
    let index = e.detail.index
    let content = ''

    content = classify === 3 ? '找回' : (classify === 5 ? '归还' : '结束')
    wx.showModal({
      title: '提示',
      content: `您确定要将该帖子设为已${content}吗？`,
      async success(res) {
        if (res.confirm) {
          let dropData = e.currentTarget.dataset.dropdata
          let dropName = e.currentTarget.dataset.dropname
          let completeData = e.currentTarget.dataset.completedata
          let completeName = e.currentTarget.dataset.completename

          console.log(iid, classify)

          let result = await util.request('/complete', {
            iid,
            classify
          })

          if (result.code) {
            dropData[index].status = 2
            completeData.splice(0, 0, dropData[index])
            dropData.splice(index, 1)
            that.setData({
              [dropName]: dropData,
              [completeName]: completeData

            }, () => {
              wx.showToast({
                title: `${content}成功`,
                icon: 'success',
                duration: 2000
              })
            })
          } else {
            util.showModal(`${content}失败了，请重试`)
          }
        }
      }
    })
  },
  edit(e) {

    let iid = e.detail.iid
    let classify = e.detail.classify
    let index = e.detail.index

    let dropData = e.currentTarget.dataset.dropdata
    let dropName = e.currentTarget.dataset.dropname
    console.log(iid, 'iid')

    switch (classify) {
      case 0:
        wx.navigateTo({
          url: `/pages/update/updateLegwork/updateLegwork?iid=${iid}`
        })
        break;
      case 1:
        wx.navigateTo({
          url: `/pages/update/updateSecondhand/updateSecondhand?iid=${iid}`
        })
        break;
      case 2:
        wx.navigateTo({
          url: `/pages/update/updatePartimJob/updatePartimJob?iid=${iid}`
        })
        break;
      case 3:
      case 5:
        wx.navigateTo({
          url: `/pages/update/updateLostAndFound/updateLostAndFound?iid=${iid}`
        })
        break;

      default:
        break;
    }

    // let result = await util.request('/edit', {
    //   iid,
    //   classify
    // })

    // if (result.code) {
    //   dropData[index].status = 2
    //   completeData.splice(0, 0, dropData[index])
    //   dropData.splice(index, 1)
    //   this.setData({
    //     [dropName]: dropData,
    //     [completeName]: completeData

    //   }, () => util.showModal(`${content}成功`))
    // } else {
    //   util.showModal(`${content}失败了，请重试`)
    // }
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