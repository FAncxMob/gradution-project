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
      // price: '',
      contact: '',
    },
    showPreview: false,
    realPath: [],
    maxLength: 6,
    typeArray: ['丢了东西', '捡到东西'],
    typeIndex: 0,
  },

  bindPickerChange(e) {
    this.setData({
      typeIndex: e.detail.value
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
          })
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
      // price: {
      //   required: false,
      //   // maxlength: 6
      //   min: 0
      // },
      contact: {
        required: true,
        maxlength: 80
      }
    };
    const messages = {
      title: {
        required: '请输入一个醒目的标题吧！',
        minlength: '标题最少要输入5个字符'
      },
      desc: {
        required: '请输入兼职详情介绍！',
        minlength: '详情介绍最少要输入10个字符',
      },
      // price: {
      //   min: '悬赏金额最小是0~'
      // },
      contact: {
        required: '请输入联系方式！',
      }
    };
    this.WxValidate = new WxValidate(rules, messages)
  },
  async submitForm(e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let {
      realPath,
      typeIndex
    } = this.data
    if (params.price) {
      params.price = params.price.trim()
      params.price = params.price == 0 ? '' : params.price
    }
    params.title = util.HHToBr(params.title)
    params.desc = util.HHToBr(params.desc)
    params.contact = util.HHToBr(params.contact)

    let classify = typeIndex === 0 ? 3 : 5
    let values = {
      ...params,
      pic: realPath,
      classify
    }
    let result = await util.request('/publishLostAndFound', values)
    console.log('/publishLostAndFound', values)
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