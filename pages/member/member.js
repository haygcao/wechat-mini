const Api = require('../../api/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: '',
      nick_name: ''
    },
    token: wx.getStorageSync('access_token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  getPromoCode() {
    if (!wx.getStorageSync('access_token')) {
      return;
    }
    Api.user.getPromoCode().then(res => {
      wx.setStorageSync('promo_code', res.code);
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
    let token = wx.getStorageSync('access_token');
    if (token) {
      Api.user.getUserInfo().then(res => {
        this.setData({
          user: res,
        });
      });
    }
    // 获取用户的优惠码
    this.getPromoCode();
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

  }
})