// components/OrderList/OrderList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Array,
    title: String,
    haveDrop: {
      type: Boolean,
      value: false
    },
    haveEdit: {
      type: Boolean,
      value: false
    },
    haveScanCode: {
      type: Boolean,
      value: false
    },
    haveCheckCode: {
      type: Boolean,
      value: false
    },
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
    toDetailPage(e) {
      let iid = e.currentTarget.dataset.iid
      // let classify = e.currentTarget.dataset.classify
      this.triggerEvent('toDetailPage', {
        iid
      })
    },
    drop(e) {
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定要下架该帖子吗？下架的帖子将不会被其他用户搜索到',
        async success(res) {
          if (res.confirm) {
            let iid = e.currentTarget.dataset.iid
            let classify = e.currentTarget.dataset.classify
            let data = {
              iid,
              classify
            }
            console.log(iid, classify)
            that.triggerEvent('drop', data)
            // TODO:删除帖子
          }
        }
      })
    },
    async edit(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      that.triggerEvent('edit', data)
      // TODO:编辑帖子
    },
    async scanCode(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      that.triggerEvent('scanCode', data)
      // TODO:编辑帖子
    },
    async checkCode(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      that.triggerEvent('checkCode', data)
      // TODO:编辑帖子
    },
  }
})