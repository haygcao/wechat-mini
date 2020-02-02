const Api = require('../../api/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {},
    chapters: [],
    videos: [],
    palyInfo: {
      url: 'https://player.alicdn.com/video/aliyunmedia.mp4',
      duration: '',
      format: ''
    }
  },

  switchVideo(e) {
    var id = e.currentTarget.dataset.id;
    this.getVideo(id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getVideo(options.id);
  },

  getVideo(id) {
    Api.video.getVideoInfo(id).then(res => {
      this.setData({
        video: res.video,
        videos: res.videos,
        chapters: res.chapters,
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

  }
})