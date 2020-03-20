// components/ShowPostList/ShowPostList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array,
    title: String,
    haveOperation: {
      type: Boolean,
      value: false
    },
    isMyPost: {
      type: Boolean,
      value: true
    },
    noDataHeight: String,
    btnData: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapBtn(e) {
      let that = this
      wx.showModal({
        title: '提示',
        content: this.data.btnData.btnConfirmText,
        async success(res) {
          if (res.confirm) {

            let cancelInvitationsId = e.currentTarget.dataset.iid
            that.triggerEvent('tapBtn', {
              cancelInvitationsId
            })
            // wx.showLoading({
            //   title: ''
            // })
            // let result = await util.request('/cancelCollectPost', {
            //   cancelInvitationsId
            // })
            // wx.hideLoading()
            // if (result.code) {
            //   that._load()
            // }
          }
        }
      })
      let iid = e.currentTarget.dataset.iid
      console.log(iid)

    }
  }
})