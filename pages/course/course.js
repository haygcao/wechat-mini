const Api = require('../../api/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {},
    chapters: [],
    videos: [],
    TabCur: 'desc',
    desc: ''
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Api.course.getCourseInfo(options.id).then(res => {
      this.setData({
        course: res.course,
        chapters: res.chapters,
        videos: res.videos,
        desc: res.course.render_desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto;"')
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.course.title,
      path: '/pages/coure/course?id=' + this.data.course.id + '&promo_code=' + wx.getStorageSync('promo_code'),
      imageUrl: this.data.course.thumb
    }
  }
})