const util = require('../../../utils/util')
const config = require('../../../utils/config')
const THE_COMMENT_ID = config.commentId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fakeData: {
      "code": 1,
      "data": {
        "detail": {
          "_id": "5e67824f8d6d8077c0ffd415",
          "openId": "ojoS-4qM_mvYAidQ7XwCkzQCvdzI",
          "classify": 0,
          "title": "帮忙带小吃街的吃的吃测试标题长度吃测试标题长度",
          "desc": "臭豆腐锅盔和超市的臭豆腐锅盔和超市的臭豆腐锅盔和超市的臭豆腐锅盔和超市的臭豆腐锅盔和超市的臭豆腐锅盔和超市的臭豆腐锅盔和超市的",
          "pic": ["https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132", "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132"],
          "createTime": 1584527118000,
          "price": "20",
          "status": 3,
          "invitationsDetail": {
            "_id": "5e679c101fb09f0580c83734",
            "status": 3,
            "verify": "",
            "iid": "5e67824f8d6d8077c0ffd415",
            "openId": "ojoS-4qM_mvYAidQ7XwCkzQCvdzI",
            "tag": "小吃街",
            "expectedTime": 2134565,
            "addressId": "1",
            "takerId": "3",
            "__v": 0
          },
          "collect": 3,
          "like": 3,
          "watch": 7,
          "comments": 6,
          "userDetail": {
            "createTime": 1584786033454,
            "openId": "ojoS-4qM_mvYAidQ7XwCkzQCvdzI",
            "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNH2AlQjvewNWobOiafYEA0cw/132",
            "nickName": "SoundOnly.",
            "completedOrderNum": 2
          }
        },
        "commentDetail": [{
          "_id": "5e6648325ada4b4be82efd2d",
          "openId": "4",
          "iid": "5e67824f8d6d8077c0ffd415",
          "replyCommentId": "5e73a4fc3793ae3a44a97e52",
          "parentCommentId": "5e73a4fc3793ae3a44a97e52",
          "content": "想要",
          "createTime": 5583733016809,
          "likes": 2,
          "userDetail": {
            "openId": "4",
            "nickName": "我是用户4的昵称啦",
            "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132"
          },
          "iLikeThis": true,
          "reply": []
        }, {
          "_id": "5e65d8977bcb981b101f30f1",
          "openId": "2",
          "iid": "5e67824f8d6d8077c0ffd415",
          "replyCommentId": "5e73a4fc3793ae3a44a97e52",
          "parentCommentId": "5e73a4fc3793ae3a44a97e52",
          "content": "游戏是港版还是日版？",
          "createTime": 1583733016809,
          "likes": 3,
          "userDetail": {
            "openId": "2",
            "nickName": "我是用户2的昵称啦",
            "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132"
          },
          "iLikeThis": true,
          "reply": [{
            "_id": "5e665e38f6c2e729c09dc972",
            "openId": "4",
            "iid": "5e67824f8d6d8077c0ffd415",
            "replyCommentId": "5e65d8977bcb981b101f30f1",
            "parentCommentId": "5e65d8977bcb981b101f30f1",
            "content": "@我是用户2的昵称啦 ？？？",
            "createTime": 6583733016809,
            "likes": 1,
            "userDetail": {
              "openId": "4",
              "nickName": "我是用户4的昵称啦",
              "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132"
            },
            "iLikeThis": true
          }, {
            "_id": "5e71cff502fdc63e6c97de74",
            "openId": "5",
            "iid": "5e67824f8d6d8077c0ffd415",
            "replyCommentId": "5e65d9da50b7941b10b64ac8",
            "parentCommentId": "5e65d8977bcb981b101f30f1",
            "content": "@SoundOnly. 谢谢",
            "createTime": 3583893096809,
            "likes": 3,
            "userDetail": {
              "openId": "5",
              "nickName": "我是用户5的昵称啦",
              "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132"
            },
            "iLikeThis": true
          }, {
            "_id": "5e65d9da50b7941b10b64ac8",
            "openId": "ojoS-4qM_mvYAidQ7XwCkzQCvdzI",
            "iid": "5e67824f8d6d8077c0ffd415",
            "replyCommentId": "5e65d9a850b7941b10b64ac7",
            "parentCommentId": "5e65d8977bcb981b101f30f1",
            "content": "@我是用户3的昵称啦 不是哦，我这个是港版的",
            "createTime": 3583793096809,
            "likes": 4,
            "userDetail": {
              "openId": "ojoS-4qM_mvYAidQ7XwCkzQCvdzI",
              "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNH2AlQjvewNWobOiafYEA0cw/132",
              "nickName": "SoundOnly."
            },
            "iLikeThis": true
          }, {
            "_id": "5e65d9a850b7941b10b64ac7",
            "openId": "3",
            "iid": "5e67824f8d6d8077c0ffd415",
            "replyCommentId": "5e65d8977bcb981b101f30f1",
            "parentCommentId": "5e65d8977bcb981b101f30f1",
            "content": "@我是用户2的昵称啦 这个游戏目前只有日版吧",
            "createTime": 2583733096809,
            "likes": 3,
            "userDetail": {
              "openId": "3",
              "nickName": "我是用户3的昵称啦",
              "avatar": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWheJRmxCGTbHncmcqgWhOVsd6nPsTAK6cbpuCibMs5icibzSZBZH0KzNZk2DYIAvlBBpk0hibg98wmw/132"
            },
            "iLikeThis": true
          }]
        }],
        "isFollowing": 1,
        "openId": "ojoS-4qM_mvYAidQ7XwCkzQCvdzI"
      }
    },
    detail: [],
    isFollowing: '',
    isLike: '',
    isCollect: '',
    commentDetail: [],
    openId: '',
    commentStr: '',
    focus: false,
    replyCommentId: '',
    parentCommentId: '',
    commentNickName: '',
  },
  toHelpOrBuy(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/detailPage/${type}/${type}?iid=${this.data.detail._id}`
    })
  }, //搜索时触发
  async sendComment(e) {
    // 点击别人的留言 也会触发输入留言   如果是楼中楼评论则自动加上@昵称    传replyComentId和parentCommentId（点击id评论的_id和detail[index]._id）
    let {
      commentStr,
      replyCommentId,
      parentCommentId,
      commentNickName,
    } = this.data
    wx.showLoading({
      title: '正在发送...'
    })
    let content = commentStr
    if (commentNickName && replyCommentId !== parentCommentId) {
      content = `@${commentNickName} ${commentStr}`
    }

    let result = await util.request('/sendComment', {
      content,
      iid: this.data.detail._id,
      replyCommentId,
      parentCommentId
    })
    console.log('/sendComment', {
      content,
      iid: this.data.detail._id,
      replyCommentId,
      parentCommentId
    })
    wx.hideLoading()
    if (result.code) {
      // 
      this.setData({
        commentStr: '',
        focus: false,
        replyCommentId: '',
        parentCommentId: '',
        commentNickName: '',
      }, this._load(this.data.detail._id))
    }
  },
  //输入时触发
  commentInput(e) {
    this.setData({
      commentStr: e.detail.value,
    })
    // console.log(commentStr)
  },

  commentBluer(e) {
    this.setData({
      focus: false
    })
  },
  commentFocus(e) {
    // console.log(e)
  },

  async commentFather(e) {

    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行留言')
      return
    }
    // 直接对帖子进行评论
    this.setData({
      focus: true,
      replyCommentId: THE_COMMENT_ID,
      parentCommentId: THE_COMMENT_ID,
      commentNickName: '',
    })
    // 弹出键盘
  },
  async commentChild(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行回复')
      return
    }
    let replyCommentId = e.currentTarget.dataset.replycommentid
    let parentCommentId = e.currentTarget.dataset.parentcommentid
    let nickName = e.currentTarget.dataset.nickname
    let _str = this.data.commentStr
    this.setData({
      focus: true,
      replyCommentId,
      parentCommentId,
      commentNickName: nickName
    })
    // 弹出键盘
  },
  async cancelFollowing(e) {
    let cancelOpenId = e.currentTarget.dataset.openid
    wx.showLoading({
      title: ''
    })
    let result = await util.request('/cancelFollowing', {
      cancelOpenId
    })
    console.log('/cancelFollowing', {
      cancelOpenId
    })
    wx.hideLoading()
    if (result.code) {
      this.setData({
        isFollowing: false
      })
      // this._load(this.data.detail._id)
    }
  },
  async cancelCommentLikeChild(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行取消点赞操作')
      return
    }
    let commentId = e.currentTarget.dataset.commentid
    let currentFatherIndex = e.currentTarget.dataset.currentfatherindex
    let currentReplyIndex = e.currentTarget.dataset.currentreplyindex
    let result = await util.request('/cancelCommentLike', {
      commentId
    })
    console.log('/cancelCommentLike', {
      commentId
    })
    if (result.code) {
      let _commentDetail = this.data.commentDetail
      _commentDetail[currentFatherIndex].reply[currentReplyIndex].iLikeThis = false
      _commentDetail[currentFatherIndex].reply[currentReplyIndex].likes -= 1
      this.setData({
        commentDetail: _commentDetail
      })
    }
  },
  async commentLikeChild(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行点赞操作')
      return
    }
    let commentId = e.currentTarget.dataset.commentid
    let currentFatherIndex = e.currentTarget.dataset.currentfatherindex
    let currentReplyIndex = e.currentTarget.dataset.currentreplyindex
    let result = await util.request('/commentLike', {
      commentId,
      postOpenId: this.data.detail.openId
    })
    console.log('/commentLike', {
      commentId,
      postOpenId: this.data.detail.openId
    })
    if (result.code) {
      let _commentDetail = this.data.commentDetail
      _commentDetail[currentFatherIndex].reply[currentReplyIndex].iLikeThis = true
      _commentDetail[currentFatherIndex].reply[currentReplyIndex].likes += 1
      this.setData({
        commentDetail: _commentDetail
      })
    }
  },
  async commentLike(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行点赞操作')
      return
    }
    let commentId = e.currentTarget.dataset.commentid
    let currentIndex = e.currentTarget.dataset.currentindex
    let result = await util.request('/commentLike', {
      commentId,
      postOpenId: this.data.detail.openId
    })
    console.log('/commentLike', {
      commentId,
      postOpenId: this.data.detail.openId
    })
    if (result.code) {
      let _commentDetail = this.data.commentDetail
      _commentDetail[currentIndex].iLikeThis = true
      _commentDetail[currentIndex].likes += 1
      this.setData({
        commentDetail: _commentDetail
      })
    }
  },
  async cancelCommentLike(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行取消点赞操作')
      return
    }
    let commentId = e.currentTarget.dataset.commentid
    let currentIndex = e.currentTarget.dataset.currentindex
    let result = await util.request('/cancelCommentLike', {
      commentId
    })
    console.log('/cancelCommentLike', {
      commentId
    })
    if (result.code) {
      let _commentDetail = this.data.commentDetail
      _commentDetail[currentIndex].iLikeThis = false
      _commentDetail[currentIndex].likes -= 1
      this.setData({
        commentDetail: _commentDetail
      })
    }
  },


  async followingTa(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行关注操作')
      return
    }
    let followId = e.currentTarget.dataset.openid
    let result = await util.request('/followingTa', {
      followId
    })
    console.log('/followingTa', {
      followId
    })
    if (result.code) {
      this.setData({
        isFollowing: true
      })
      // this._load()
      // this._load(this.data.detail._id)
    }
  },
  async cancelLikePost(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行取消点赞操作')
      return
    }
    let result = await util.request('/cancelLikePost', {
      iid: this.data.detail._id
    })
    console.log('/cancelLikePost', {
      iid: this.data.detail._id
    })
    if (result.code) {
      let detail = this.data.detail
      detail.like -= 1
      this.setData({
        isLike: false,
        detail
      })
    }
  },
  async likePost(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行点赞操作')
      return
    }
    let result = await util.request('/likePost', {
      iid: this.data.detail._id,
      postOpenId: this.data.detail.openId,
    })
    console.log('/likePost', {
      iid: this.data.detail._id,
      postOpenId: this.data.detail.openId,
    })
    if (result.code) {
      let detail = this.data.detail
      detail.like += 1
      this.setData({
        isLike: true,
        detail
      })
    }
  },
  async cancelCollectPost(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行取消收藏操作')
      return
    }
    let result = await util.request('/cancelCollectPost', {
      iid: this.data.detail._id
    })
    console.log('/cancelCollectPost', {
      iid: this.data.detail._id
    })
    if (result.code) {
      let detail = this.data.detail
      detail.collect -= 1
      this.setData({
        isCollect: false,
        detail
      })
    }
  },
  async collectPost(e) {
    if (this.data.detail.status === 3) {
      util.showModal('请恢复上架后再进行收藏操作')
      return
    }
    let result = await util.request('/collectPost', {
      iid: this.data.detail._id,
      postOpenId: this.data.detail.openId,
    })
    console.log('/collectPost', {
      iid: this.data.detail._id,
      postOpenId: this.data.detail.openId,
    })
    if (result.code) {
      let detail = this.data.detail
      detail.collect += 1
      this.setData({
        isCollect: true,
        detail
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.iid) {
      let iid = options.iid
      this.setData({
        iid
      })
    } else {
      console.log('吼啦！没传iid，怎么查详情啊')
    }

  },
  async _load(iid) {
    wx.showLoading({
      title: '拼命搜索中'
    })
    let result = await util.request('/getPostDetail', {
      iid
    })
    console.log('/getPostDetail', {
      iid
    })
    wx.hideLoading()

    if (result.code) {
      // result.data.detail.watch += 1
      this.setData({
        detail: result.data.detail,
        commentDetail: result.data.commentDetail,
        isFollowing: result.data.isFollowing,
        isLike: result.data.isLike,
        isCollect: result.data.isCollect,
        openId: result.data.openId,
      })
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
    this._load(this.data.iid)

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