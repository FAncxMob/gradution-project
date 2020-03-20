const util = require('../../utils/util')

Page({
  data: {
    background: ['../../icon/dong.jpg', '../../icon/hanlu.jpg', '../../icon/lidong.jpg', '../../icon/shuangjiang.jpg'],
    noDataText: '还没有任何校园热点新闻...',
    schoolNews: []
  },
  onLoad: function (options) {
    this._load()

  },

  async _load() {

    let result = await util.request('/getSchoolNews')
    if (result.code) {
      this.setData({
        schoolNews: result.data
      })
    } else {
      console.log('获取失败了')
    }

  },

})