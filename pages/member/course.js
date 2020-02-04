const Api = require('../../api/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    page: 1,
    pageSize: 5,
    loadMore: true,
    loadMoreStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourses(true);
  },

  getCourses(refresh) {
    if (refresh) {
      this.setData({
        courses: [],
        page: 1
      });
    }
    Api.user.getUserCourses({
      page: this.data.page,
      page_size: this.data.pageSize
    }).then(res => {
      this.setData({
        loadMoreStatus: false,
      });
      if (res.data.length === 0) {
        this.setData({
          loadMore: false
        });
      }
      var data = this.data.courses;
      res.data.forEach(item => {
        data.push(item);
      });
      this.setData({
        courses: data
      });
    })
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

  onPullDownRefresh() {
    this.setData({
      page: 1,
    });
    this.getCourses(true);
  },
  
  onReachBottom() {
    if (this.data.loadMore === false) {
      return;
    }
    this.setData({
      loadMoreStatus: true,
    })
    this.setData({
      page: this.data.page + 1,
    });
    this.getCourses(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})