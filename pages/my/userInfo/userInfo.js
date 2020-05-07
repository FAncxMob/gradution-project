const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    schoolArray: ['湖北经济学院'],
    schoolIndex: 0,
    facultyArray: ['经济与贸易学院', '金融学院', '财政与公共管理学院', '工商管理学院', '会计学院', '旅游与酒店管理学院', '信息管理与统计学院', '法学院', '艺术设计学院', '新闻与传播学院', '外国语学院', '信息与通信工程学院', '体育经济与管理学院', '低碳经济学院', '财经高等研究院', '继续教育学院'],
    facultyIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatar: '',
    nickName: '',
    isNew: false
  },
  async bindGetUserInfo(e) {
    wx.showLoading({
      title: '更新中...'
    })
    let {
      avatarUrl,
      nickName
    } = e.detail.userInfo
    await this.setData({
      avatar: avatarUrl,
      nickName,
      isNew: true
    })
    wx.hideLoading()

  },
  async formSubmit(e) {
    let {
      schoolArray,
      schoolIndex,
      facultyArray,
      facultyIndex,
      avatar,
      nickName
    } = this.data


    let data = {
      ...e.detail.value,
      avatar,
      nickName,
      school: schoolArray[schoolIndex],
      faculty: facultyArray[facultyIndex]
    }

    wx.showLoading({
      title: '保存信息中...',
    })
    let result = await util.request('/updateUserInfo', data)
    console.log('/updateUserInfo', data)
    wx.hideLoading()
    if (result.code) {
      wx.showToast({
        title: '保存成功啦~',
        icon: 'success',
        duration: 2000
      })
      // wx.startPullDownRefresh()
      // wx.switchTab({
      //   url: '../../my/my/my'
      // })
    } else {
      wx.showToast({
        title: `保存失败了！请重试`,
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
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this._load()
  },

  async _load() {
    let {
      schoolArray,
      facultyArray
    } = this.data
    if (wx.getStorageSync('token') && wx.getStorageSync('haveUser') === 1) {
      let data = await util.request('/getUserInfo')
      console.log('/getUserInfo')
      if (data.code) {
        console.log('/getUserInfo-userInfo')
        let oldSchoolIndex = schoolArray.findIndex(item => item === data.userInfo.school)
        let oldFacultyIndex = facultyArray.findIndex(item => item === data.userInfo.faculty)
        this.setData({
          userInfo: data.userInfo,
          schoolIndex: oldSchoolIndex,
          facultyIndex: oldFacultyIndex,
          avatar: data.userInfo.avatar,
          nickName: data.userInfo.nickName
        })
      }
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