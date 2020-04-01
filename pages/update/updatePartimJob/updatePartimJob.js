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
      price: '',
      contact: '',
      workPlace: '',
      workTime: ''
    },
    showPreview: false,
    realPath: [],
    maxLength: 6,
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

    realPath.splice(index, 1);
    this.setData({
      realPath,
      showPreview: false
    });

    // 删除图片接口
    // let result = await util.request('/deletePic', {
    //   path: `${realPath[index]}`
    // })
    // if (result.code) {
    //   realPath.splice(index, 1);
    //   this.setData({
    //     realPath,
    //     showPreview: false
    //   });
    // } else {
    //   util.showModal('删除图片失败')
    // }


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
    let res = await wx.chooseImage({
      count: maxLength,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    })

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
      price: {
        required: true,
        // maxlength: 6
        min: 1
      },
      contact: {
        required: true,
        maxlength: 80
      },
      workPlace: {
        required: true
        // maxlength: 6
      },
      workTime: {
        required: true
        // maxlength: 6
      },
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
      price: {
        required: '请输入薪酬金额！',
        min: '薪酬必须是大于1的数字哦~'
      },
      contact: {
        required: '请输入联系方式！',
      },
      workPlace: {
        required: '请输入工作地点！',
      },
      workTime: {
        required: '请输入工作时间！',
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
      realPath
    } = this.data

    params.price = params.price.trim()
    params.title = util.HHToBr(params.title)
    params.desc = util.HHToBr(params.desc)
    params.contact = util.HHToBr(params.contact)
    params.workTime = util.HHToBr(params.workTime)
    params.workPlace = util.HHToBr(params.workPlace)

    let values = {
      ...params,
      pic: realPath,
      classify: 2,
      iid: this.data.detail._id
    }
    let result = await util.request('/updatePartTimeJob', values)
    console.log('/updatePartTimeJob', values)
    if (result.code) {
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function (res) {
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 2000,
            success() {}
          })
        }
      })
    } else {
      util.showModal('修改失败了，请重试')
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
  async onLoad(options) {
    this.initValidate()


    this._load(options.iid)
  },
  async _load(iid) {
    wx.showLoading({
      title: '拼命搜索中'
    })
    // let iid = options.iid
    let result = await util.request('/getPostDetailForUpdate', {
      iid
    })
    console.log('/getPostDetailForUpdate', {
      iid
    })
    wx.hideLoading()
    if (result.code) {

      result.data.detail.title = util.brToHH(result.data.detail.title)
      result.data.detail.desc = util.brToHH(result.data.detail.desc)
      result.data.detail.invitationsDetail.contact = util.brToHH(result.data.detail.invitationsDetail.contact)
      result.data.detail.invitationsDetail.workTime = util.brToHH(result.data.detail.invitationsDetail.workTime)
      result.data.detail.invitationsDetail.workPlace = util.brToHH(result.data.detail.invitationsDetail.workPlace)


      this.setData({
        detail: result.data.detail,
        realPath: result.data.detail.pic,
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