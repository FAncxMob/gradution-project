// components/OrderList/OrderList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array,
    title: String,
    haveOperation: Boolean,
    noDataHeight: String
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
    deleteInvitations(e) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定要删除该帖子吗？',
        async success(res) {
          if (res.confirm) {
            let iid = e.currentTarget.dataset.iid
            let classify = e.currentTarget.dataset.classify
            let data = {
              iid,
              classify
            }
            console.log(iid, classify)
            // that.triggerEvent('deleteInvitations', data)
            // TODO:删除帖子
          }
        }
      })
    },
    async editInvitations(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      // that.triggerEvent('deleteInvitations', data)
      // TODO:编辑帖子
    },
  }
})