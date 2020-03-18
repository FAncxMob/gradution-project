const util = require('../../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    schoolArray: ['湖北经济学院'],
    schoolIndex: 0,
    facultyArray: ['经济与贸易学院', '金融学院', '财政与公共管理学院', '工商管理学院', '会计学院', '旅游与酒店管理学院', '信息管理与统计学院', '法学院', '艺术设计学院', '新闻与传播学院', '外国语学院', '信息与通信工程学院', '体育经济与管理学院', '低碳经济学院', '财经高等研究院', '继续教育学院'],
    facultyIndex: 0,
    items: [{
        name: '1',
        value: '是'
      },
      {
        name: '0',
        value: '否',
        checked: 'true'
      },
    ]
  },
  async formSubmit(e) {
    let data = {
      ...e.detail.value
    }

    wx.showLoading({
      title: '保存信息中...',
    })
    let result = await util.request('/addAddress', data)
    wx.hideLoading()
    if (result.code) {
      wx.showToast({
        title: '添加成功啦~',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: `保存失败了！请重试`,
        icon: 'none',
        duration: 3000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this._load()
  },

  async _load() {

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