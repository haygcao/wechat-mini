import {
  user
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit1: 0,
    records: [],
    pagination: {
      page: 1,
      page_size: 12,
      is_over: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData(true);
    this.getUser();
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
    this.getData(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getUser() {
    user.info().then(res => {
      this.setData({
        credit1: res.credit1
      });
    })
  },

  getData(reset = false) {
    if (reset) {
      this.setData({
        'pagination.page': 1,
        'pagination.is_over': false,
        records: []
      });
    }
    if (this.data.pagination.is_over) {
      return;
    }
    user.credit1Records(this.data.pagination).then(res => {
      let data = res.data;
      if (data.length === 0) {
        this.setData({
          'pagination.is_over': true
        });
      } else {
        let list = this.data.records;
        list.push(...data);
        this.setData({
          records: list
        });
      }

      if (reset) {
        wx.stopPullDownRefresh();
      }
    })
  },

  loadMore() {
    if (this.data.pagination.is_over) {
      return;
    }
    this.setData({
      'pagination.page': this.data.pagination.page + 1
    });
    this.getData();
  },
})