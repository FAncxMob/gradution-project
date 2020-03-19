const util = require('../../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: []
  },
  async formSubmit(e) {
    let data = {
      ...e.detail.value,
      _id: this.data.addressData._id
    }
    console.log(data)

    wx.showLoading({
      title: '保存信息中...',
    })
    let result = await util.request('/editAddress', data)
    wx.hideLoading()
    if (result.code) {
      wx.showToast({
        title: '修改成功啦~',
        icon: 'success',
        duration: 2000,
        success: function () {
          wx.navigateTo({
            url: '/pages/my/addressManager/addressManager'
          })
        }
      })
    } else {
      wx.showToast({
        title: `修改失败了！请重试`,
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.addressId) {
      this._load(options.addressId)
    }
  },
  async _load(addressId) {
    let result = await util.request('/getAddressByAddressId', {
      addressId
    })
    if (result.code) {
      this.setData({
        addressData: result.data
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