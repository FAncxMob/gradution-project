const util = require('../../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        duration: 2000,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
          // wx.navigateTo({
          //   url: '/pages/my/addressManager/addressManager'
          // })
        }
      })
    } else {
      wx.showToast({
        title: `添加失败了！请重试`,
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