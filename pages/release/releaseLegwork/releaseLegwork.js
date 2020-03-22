// const WxValidate = require('../../../utils/WxValidate')
import WxValidate from '../../../utils/WxValidate'
const utils = require('../../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {},
    expectedTime: '',
    // date: '2019-01-01 13:37',
    // times: 0,
    data: {
      date: '2020-01-01 13:37',
      disabled: false, //设置是否能点击 false可以 true不能点击
      startDate: '2020-01-01 12:37',
      endDate: '2020-03-12 12:38',
      placeholder: '请选择时间'
    },
    basicInfo: {
      title: '',
      desc: '',
      tag: '',
      expectedTime: '',
      address: '' // 选择收货地址
    }
  },

  choosePic(e) {
    let that = this
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths
        })
      }
    })
  },
  chooseAddress(e) {
    wx.showLoading({
      title: '跳转中...'
    })
    wx.navigateTo({
      url: '/pages/my/addressManager/addressManager?type=choose',
      success: function (res) {
        wx.hideLoading()
      }
    })
  },
  onPickerChange: function (e) {
    let date = e.detail.dateString
    let expectedTime = new Date(date).getTime()
    this.setData({
      date,
      expectedTime,
      // times: times + 1
    })
  },
  initValidate() {
    const rules = {
      title: {
        required: true,
        minlength: 5,
        maxlength: 50
      },
      desc: {
        required: true,
        minlength: 10,
      },
      tag: {
        required: false,
        maxlength: 6
      }
    };
    const messages = {
      title: {
        required: '请输入标题',
        minlength: '标题最少要输入5个字符',
        maxlength: '标题最多输入50个字符',
      },
      desc: {
        required: '请输入跑腿需求描述',
        minlength: '需求描述最少要输入10个字符',
      },
      tag: {
        required: '请输入标签',
        maxlength: '标签最多输入6个字符'
      }
    };
    this.WxValidate = new WxValidate(rules, messages)
  },
  // formChange(val) {
  //   let obj = {}
  //   obj[`basicInfo.${val.currentTarget.dataset.val}`] = val.detail.value
  //   this.setData(obj)
  // },
  submitForm(e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    if (!this.data.addressData._id) {
      this.showModal({
        msg: '请选择收货地址'
      })
      return false
    }
    if (this.data.expectedTime === '') {
      this.showModal({
        msg: '请选择期望送达时间'
      })
      return false
    }
    let {
      addressData,
      expectedTime,
      tempFilePaths
    } = this.data
    let values = {
      ...params,
      expectedTime,
      iid: addressData._id,
    }

    console.log(values)
    // 提交操作

  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
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