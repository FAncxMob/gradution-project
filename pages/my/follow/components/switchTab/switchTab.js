Component({
  /*组件的属性列表*/
  properties: {
    currentSelect: Number,
    arr: Array
  },

  /*组件的初始数据*/
  data: {

  },

  /*组件的方法列表 */
  methods: {
    handleSelect(e) {
      this.triggerEvent('handleSelect', e.currentTarget.dataset.selectstatus)
    }
  }
})