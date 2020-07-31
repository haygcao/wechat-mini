import {
  course
} from '../../api/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: null,
    chapters: [],
    videos: [],
    attachs: [],
    navTab: 'desc',
    isCollect: false,
    isBuy: false,
    videoWatchedProgress: [],
    comments: [],
    commentUsers: [],
    courseId: 0,
    commentContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.id
    });
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
    this.getCourse();
    this.getComments();
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
    return {
      title: this.data.course.title,
      path: `/pages/course/detail?id=${this.data.courseId}`,
      imageUrl: this.data.course.thumb
    }
  },

  getCourse() {
    course.detail(this.data.courseId).then(res => {
      wx.setNavigationBarTitle({
        title: res.course.title,
      })

      // 富文本图片溢出
      res.course.render_desc = res.course.render_desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');

      this.setData({
        course: res.course,
        chapters: res.chapters,
        videos: res.videos,
        isBuy: res.isBuy,
        isCollect: res.isCollect,
        attachs: res.attachs,
        videoWatchedProgress: res.videoWatchedProgress
      });
    })
  },

  getComments() {
    course.comments(this.data.courseId).then(res => {
      this.setData({
        commentUsers: res.users,
        comments: res.comments
      });
    })
  },

  switchNavTab(e) {
    let tab = e.currentTarget.dataset.tab;
    if (this.data.navTab === tab) {
      return;
    }
    this.setData({
      navTab: tab
    });
  },

  collectAction() {
    if (!wx.getStorageSync('access_token')) {
      wx.navigateTo({
        url: '/pages/auth/login',
      })
      return
    }

    course.like(this.data.courseId).then(res => {
      let status = res;
      this.setData({
        isCollect: status === 0 ? false : true
      })
    });
  },

  goRole() {
    if (!wx.getStorageSync('access_token')) {
      wx.navigateTo({
        url: '/pages/auth/login',
      })
      return
    }

    wx.navigateTo({
      url: '/pages/role/index',
    })
  },

  inputCommentContent(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },

  createComment() {
    if (!wx.getStorageSync('access_token')) {
      wx.navigateTo({
        url: '/pages/auth/login',
      })
      return
    }

    if (this.data.commentContent.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入内容',
      })
      return
    }

    course.createComment(this.data.courseId, {
      content: this.data.commentContent
    }).then(() => {

      this.setData({
        commentContent: ''
      });

      this.getComments();

      wx.showToast({
        icon: 'none',
        title: '成功，审核通过将会展示',
      })

    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: e,
      })
    })
  },

  goVideo(e) {
    let videoId = e.currentTarget.dataset.videoId;
    wx.navigateTo({
      url: '/pages/course/video?id=' + videoId,
    })
  },

  buy() {
    wx.navigateTo({
      url: `/pages/order/index?id=${this.data.course.id}&total=${this.data.course.charge}&name=${this.data.course.title}&type=course`,
    })
  }
})