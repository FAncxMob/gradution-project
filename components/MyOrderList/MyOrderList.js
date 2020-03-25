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
    haveDelete: {
      type: Boolean,
      value: false
    },
    havePutOn: {
      type: Boolean,
      value: false
    },
    haveComplete: {
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
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let index = e.currentTarget.dataset.index
      let data = {
        iid,
        classify,
        index
      }
      // console.log(iid, classify)
      this.triggerEvent('drop', data)

    },

    putOn(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let index = e.currentTarget.dataset.index
      let data = {
        iid,
        classify,
        index
      }
      this.triggerEvent('putOn', data)
    },

    delete(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let index = e.currentTarget.dataset.index
      let data = {
        iid,
        classify,
        index
      }
      this.triggerEvent('delete', data)
    },

    complete(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let index = e.currentTarget.dataset.index
      let data = {
        iid,
        classify,
        index
      }
      this.triggerEvent('complete', data)
    },

    edit(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      this.triggerEvent('edit', data)
    },
    scanCode(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      this.triggerEvent('scanCode', data)
    },
    checkCode(e) {
      let iid = e.currentTarget.dataset.iid
      let classify = e.currentTarget.dataset.classify
      let data = {
        iid,
        classify
      }
      console.log(iid, classify)
      this.triggerEvent('checkCode', data)
    },
  }
})