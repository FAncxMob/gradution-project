// 本组件为搜索组件
// 需要传入addflag   值为true / false （搜索框右侧部分）
// 若显示搜索框右侧部分   需传入右侧图标url以及addhandle函数

Component({

  properties: {
    searchStr: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchFlag: false
  },

  /**
   * 组件的方法列表

   */
  methods: {


    //搜索输入
    searchInput(e) {
      this.triggerEvent("searchInput", e);
    },
    //查询
    searchConfirm(e) {
      this.triggerEvent("searchConfirm");
    },
    //获得焦点
    searchFocus() {
      this.setData({
        searchFlag: true,
      })
      // this.triggerEvent("searchFocus");
    },
    //失去焦点
    searchBluer() {
      // this.triggerEvent("searchBluer");

    },
    // 取消
    searchClear() {
      console.log('searchClear -Search组件')
      this.setData({
        searchFlag: false,
      })
      this.triggerEvent("searchClear");
    },
  }
})