// const WxValidate = require('../../../utils/WxValidate')
import WxValidate from '../../../utils/WxValidate'
const util = require('../../../utils/util')
let config = require('../../../utils/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {},
    expectedTime: '',
    // date: '2019-01-01 13:37',
    // times: 0,
    basicInfo: {
      title: '',
      desc: '',
      tag: '',
      price: '',
      buyPrice: '',
    },
    showPreview: false,
    realPath: [],
    maxLength: 6,
    deliveryArray: ['都可以', '仅支持自提', '仅支持送货上门'],
    deliveryIndex: 0,
  },

  bindPickerChange(e) {
    this.setData({
      deliveryIndex: e.detail.value
    })
  },
  previewImage(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      previewImageUrls: this.data.realPath,
      previewCurrent: index,
      showPreview: true
    });
  },
  async deletePic(e) {
    let index = e.detail.index;
    let {
      realPath
    } = this.data
    // 删除图片接口
    let result = await util.request('/deletePic', {
      path: `${realPath[index]}`
    })
    console.log('/deletePic', {
      path: `${realPath[index]}`
    })
    if (result.code) {
      realPath.splice(index, 1);
      this.setData({
        realPath,
        showPreview: false
      });
    } else {
      util.showModal('删除图片失败')
    }


  },

  hide(e) {
    this.setData({
      showPreview: false
    })
  },
  async choosePic(e) {
    let {
      realPath,
      maxLength,
    } = this.data
    wx.showLoading({
      title: '正在上传图片...'
    })
    let res = await this.chooseImg()

    // const _tempFilePaths = res.tempFilePaths
    res.tempFilePaths.forEach((val, index) => {
      if (realPath.length < maxLength) {
        let picName = ''
        // 上传图片
        this.uploadPic(val).then((res) => {
          res = JSON.parse(res)
          realPath.push(res.fileName)
          this.setData({
            realPath,
          }, () => wx.hideLoading())
        }).catch((res) => {
          wx.hideLoading()
          util.showModal('上传图片失败了X_X')
        })
      } else {
        console.log(`您最多选择${maxLength}张`)
      }
    })
  },
  chooseImg() {
    let {
      realPath,
      maxLength,
    } = this.data
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: maxLength,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  uploadPic(path) {
    // 上传图片
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.host + `/uploadPic`,
        filePath: path,
        name: 'file',
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
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
      },
      price: {
        required: true,
        min: 1
      },
      buyPrice: {
        required: true,
        min: 1
      }
    };
    const messages = {
      title: {
        required: '请输入一个醒目的标题吧！',
        minlength: '标题最少要输入5个字符',
        maxlength: '标题最多输入50个字符',
      },
      desc: {
        required: '请输入物品详细介绍！',
        minlength: '需求描述最少要输入10个字符',
      },
      tag: {
        required: '请输入物品的类别！',
        maxlength: '类别最多输入6个字符'
      },
      price: {
        required: '请输入出售金额！',
        min: '出售金额必须是大于1的数字哦~'
      },
      buyPrice: {
        required: '请输入入手金额！',
        min: '入手金额必须是大于1的数字哦~'
      }
    };
    this.WxValidate = new WxValidate(rules, messages)
  },
  // formChange(val) {
  //   let obj = {}
  //   obj[`basicInfo.${val.currentTarget.dataset.val}`] = val.detail.value
  //   this.setData(obj)
  // },
  async submitForm(e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    console.log(this.data.deliveryIndex != 2, !this.data.addressData._id)
    if (this.data.deliveryIndex != 2 && !this.data.addressData._id) {
      this.showModal({
        msg: '请选择收货地址'
      })
      return false
    }
    if (this.data.realPath.length == 0) {
      this.showModal({
        msg: '请选择一张图片作为帖子的主图吧！'
      })
      return false
    }
    let {
      addressData,
      deliveryIndex,
      realPath
    } = this.data

    params.price = params.price.trim()
    params.buyPrice = params.buyPrice.trim()
    params.desc = util.HHToBr(params.desc)
    params.title = util.HHToBr(params.title)


    let values = {}
    if (+deliveryIndex !== 2) {
      values = {
        ...params,
        deliveryAddressId: addressData._id,
        pic: realPath,
        classify: 1,
        deliveryWay: deliveryIndex
      }
    } else {
      values = {
        ...params,
        pic: realPath,
        classify: 1,
        deliveryWay: deliveryIndex
      }
    }

    console.log(values)

    let result = await util.request('/publishSecondhand', values)
    console.log('/publishSecondhand', values)
    if (result.code) {
      wx.showToast({
        title: "发布成功",
        icon: 'success',
        duration: 2000,
        success() {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    } else {
      util.showModal('发布失败了，请重试')
    }

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

    this.initValidate()

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