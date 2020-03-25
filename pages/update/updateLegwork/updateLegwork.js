// const WxValidate = require('../../../utils/WxValidate')
import WxValidate from '../../../utils/WxValidate'
const util = require('../../../utils/util')
let config = require('../../../utils/config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    addressData: {},
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
  },
  previewImage(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
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
    // console.log('delete', e.detail)
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
    let {
      addressData,
      realPath,
      detail
    } = this.data

    params.price = params.price.trim()
    params.desc = util.HHToBr(params.desc)
    params.title = util.HHToBr(params.title)
    params.expectedTime = util.HHToBr(params.expectedTime)

    let values = {
      ...params,
      addressId: addressData._id,
      pic: realPath,
      classify: 0,
      iid: detail._id
    }

    console.log(values)

    let result = await util.request('/updateLegWork', values)

    if (result.code) {
      wx.navigateBack({
        delta: 1,
        success() {
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 2000
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
    console.log(iid, 'iid')
    let result = await util.request('/getPostDetailForUpdate', {
      iid
    })
    wx.hideLoading()

    if (result.code) {
      result.data.detail.desc = util.brToHH(result.data.detail.desc)
      result.data.detail.title = util.brToHH(result.data.detail.title)
      result.data.detail.invitationsDetail.expectedTime = util.brToHH(result.data.detail.invitationsDetail.expectedTime)

      this.setData({
        detail: result.data.detail,
        addressData: result.data.addressData,
        realPath: result.data.detail.pic
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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