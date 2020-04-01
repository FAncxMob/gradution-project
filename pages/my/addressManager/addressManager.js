const util = require('../../../utils/util')

Page({
  data: {
    address: [],
    type: ''
  },
  chooseAddress(e) {
    if (this.data.type !== 'choose') {
      return
    }
    let currentIndex = e.currentTarget.dataset.currentindex

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    let addressData = this.data.address[currentIndex]
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      addressData
    });

    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },

  bindToPage: function (event) {
    let addressData = event.currentTarget.dataset.addressdata
    wx.navigateTo({
      url: '../addressManager/editAddress/editAddress?addressId=' + addressData._id,
    })
  },

  addAddress() {
    wx.navigateTo({
      url: '/pages/my/addressManager/addAddress/addAddress'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.type) {
      this.setData({
        type: 'choose'
      })
    }

  },

  async _load() {

    let result = await util.request('/getAddress')
    console.log('/getAddress')
    if (result.code) {
      this.setData({
        address: result.data
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