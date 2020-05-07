const util = require('../../../utils/util')
import WxValidate from '../../../utils/WxValidate'
let app = getApp()
import EventEmitter from '../../../utils/EventEmitter'

// 点击登录按钮会 有授权获取用户信息的弹窗，只有授权后（获得了用户的头像和昵称）才会发送登录请求
// 如果没授权，则不会发送登录请求  
//TODO: 用户进入系统后，在个人中心的修改个人资料中  增加 头像和昵称的 显示， 后增加 获取最新用户头像|昵称 这里再做确认授权操作

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray: ['湖北经济学院', '武汉音乐学院', '武汉大学'],
    schoolIndex: 0,
    facultyArray: ['经济与贸易学院', '金融学院', '财政与公共管理学院', '工商管理学院', '会计学院', '旅游与酒店管理学院', '信息管理与统计学院', '法学院', '艺术设计学院', '新闻与传播学院', '外国语学院', '信息与通信工程学院', '体育经济与管理学院', '低碳经济学院', '财经高等研究院', '继续教育学院'],
    facultyIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    formValue: {},
    basicInfo: {
      sno: '',
      name: '',
      idCard: '',
      tel: ''
    },
  },
  async saveFormValue(e) {
    let that = this
    const params = e.detail.value
    that.setData({
      formValue: e.detail.value
    }, () => {
      if (!that.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        that.showModal(error)
        return false
      }
    })

  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 2000
    })
  },
  async login() {
    let {
      schoolArray,
      schoolIndex,
      facultyArray,
      facultyIndex,
      formValue,
      userInfo
    } = this.data
    // TODO: 为了测试先注释掉
    // formValue.idCard = formValue.idCard.toUpperCase()


    let data = {
      ...formValue,
      school: schoolArray[schoolIndex],
      faculty: facultyArray[facultyIndex],
      avatar: userInfo.avatarUrl,
      nickName: userInfo.nickName
    }

    wx.showLoading({
      title: '登陆中...',
    })
    let result = await util.request('/login', data)
    console.log('/login', data)
    wx.hideLoading()
    if (result.code) {
      // 登陆成功之后修改本地的newUser

      wx.setStorageSync('haveUser', 1)
      wx.showToast({
        title: '登陆成功',
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
        url: '../../my/my/my'
      })
    } else {
      wx.showToast({
        title: `认证失败\r\n，请仔细确认学号，姓名和身份证是否输入正确`,
        icon: 'none',
        duration: 3000
      })
    }
  },
  bindPickerChange(e) {
    let picker = e.currentTarget.dataset.picker
    picker === 'school' ? this.setData({
      schoolIndex: e.detail.value
    }) : this.setData({
      facultyIndex: e.detail.value
    })
  },
  async bindGetUserInfo(e) {
    let userInfo = e.detail.userInfo
    // console.log(userInfo, 'GetUserInfo')
    await this.setData({
      userInfo
    })
    if (userInfo) {
      if (!this.WxValidate.checkForm(this.data.formValue)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
      } else {
        this.login()
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  initValidate() {
    const rules = {
      tel: {
        required: false,
        tel: true
      },
      sno: {
        required: true,
        // digits: true
      },
      name: {
        required: true
      },
      idCard: {
        required: true,
        // idcard: true,
      }
    };
    const messages = {
      tel: {
        tel: "请输入正确的手机号"
      },
      sno: {
        required: "请输入学号",
        // digits: "请输入正确的学号"
      },
      name: {
        required: "请输入真实姓名",
      },
      idCard: {
        required: "请输入身份证号",
        // idcard: "请输入正确的身份证号",
      },
    };
    this.WxValidate = new WxValidate(rules, messages)
  },

  onLoad: function (options) {
    this.initValidate()
    let token = wx.getStorageSync('token')
    let haveUser = wx.getStorageSync('haveUser')

    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     console.log(res, 'res')
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log(res.authSetting, 'authSetting')
    //       wx.getUserInfo({
    //         success: function (res) {
    //           //从数据库获取用户信息
    //           console.log(res, 'getUserInfo')
    //         }
    //       });
    //     }
    //   }
    // })

    console.log(haveUser, 'haveUser-login.js')
    if (haveUser) {
      wx.switchTab({
        url: '/pages/my/my/my'
      })
    }

    EventEmitter.on('storageOk', (haveUser) => {
      console.log(haveUser)
      if (haveUser) {
        wx.switchTab({
          url: '/pages/my/my/my'
        })
      }
    })
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