const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    userInfo: {},
    invitations: {}
  },
  formSubmit: async function (e) {
    var that = this;

    let data = {
      userId: e.detail.value.userId
    }
    let result = await util.request('/getInvitationsByUserId', data)
    that.setData({
      invitations: result.result
    })
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    })
  }


})