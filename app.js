const util = require('./utils/util')

App({
  onLaunch: async function () {
    console.log('onLaunch() -app')
    let haveUser = wx.getStorageSync('haveUser')
    let token = wx.getStorageSync('token')
    if (!token) {
      // 获取openId
      console.log('获取openId')
      wx.showLoading({
        title: '加载中...',
      })
      wx.login({
        success: async (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // 1. res.code是获取用户登录的临时凭证，和用户是否授权没有直接关系
          let data = {
            code: res.code
          }
          // 2. 发送code给服务端
          let result = await util.request('/getOpenId', data)
          // this.globalData.haveUser = result.haveUser
          // 3. 将自定义登录状态缓存到storage中
          console.log('保存token和haveUser到本地')
          wx.hideLoading()
          wx.setStorageSync('token', result.token)
          wx.setStorageSync('haveUser', result.haveUser)
          this.onLaunch()
        }
      })
    }

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: ''
  }
})