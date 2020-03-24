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
    // expectedTime: '',
    // data: {
    //   date: '2020-01-01 13:37',
    //   disabled: false, //设置是否能点击 false可以 true不能点击
    //   startDate: '2020-01-01 12:37',
    //   endDate: '2020-03-12 12:38',
    //   placeholder: '请选择时间'
    // },
    basicInfo: {
      title: '',
      desc: '',
      tag: '',
      price: '',
      expectedTime: ''
    },
    showPreview: false,
    realPath: [],
    maxLength: 6,
    files: []
  },
  previewImage(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      previewImageUrls: this.data.files,
      previewCurrent: index,
      showPreview: true
    });
  },
  async deletePic(e) {
    let index = e.detail.index;
    let {
      files,
      realPath
    } = this.data

    // 删除图片接口
    let result = await util.request('/deletePic', {
      path: `${realPath[index]}`
    })
    if (result.code) {
      files.splice(index, 1);
      realPath.splice(index, 1);
      this.setData({
        files,
        realPath,
        showPreview: false
      });
    } else {
      util.showModal('删除图片失败')
    }

  },

  hide(e) {
    console.log('delete', e.detail)
    this.setData({
      showPreview: false
    })
  },
  async choosePic(e) {
    let {
      realPath,
      maxLength,
      files
    } = this.data
    let res = await wx.chooseImage({
      count: maxLength,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    })

    // const _tempFilePaths = res.tempFilePaths
    res.tempFilePaths.forEach((val, index) => {
      if (files.length < maxLength) {
        let picName = ''
        // 上传图片
        this.uploadPic(val).then((res) => {
          res = JSON.parse(res)
          realPath.push(res.fileName)
          files.push(val)
          this.setData({
            realPath,
            files
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
  // onPickerChange: function (e) {
  //   let date = e.detail.dateString
  //   let expectedTime = new Date(date).getTime()
  //   this.setData({
  //     date,
  //     expectedTime,
  //     // times: times + 1
  //   })
  // },
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
      expectedTime: {
        required: true
      },
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
      },
      price: {
        required: '请输入报酬金额',
        min: '报酬必须高于1软妹币哦~'
      },
      expectedTime: {
        required: '请输入期望送达时间'
      },
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
    if (!this.data.addressData._id) {
      this.showModal({
        msg: '请选择收货地址'
      })
      return false
    }
    // if (this.data.expectedTime === '') {
    //   this.showModal({
    //     msg: '请选择期望送达时间'
    //   })
    //   return false
    // }
    let {
      addressData,
      // expectedTime,
      realPath
    } = this.data

    params.price = params.price.trim()
    params.desc = params.desc.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
    params.expectedTime = params.expectedTime.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
    params.title = params.title.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');

    let values = {
      ...params,
      addressId: addressData._id,
      pic: realPath,
      classify: 0
    }

    console.log(values)

    let result = await util.request('/publishLegWork', values)
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

  // previewImage: function (e) {
  //   wx.previewImage({
  //     current: e.currentTarget.id, // 当前显示图片的http链接
  //     urls: this.data.files // 需要预览的图片http链接列表ss
  //   })
  // },

  // showPreview(e) {
  //   console.log('showPreview', e.detail)
  //   this.setData({
  //     showPreview: true
  //   })
  // },

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