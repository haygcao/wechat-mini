const Api = require('../../api/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    promoCode: {
      code: '',
      expired_at: '',
      invite_user_reward: 0,
      invited_user_reward: '',
      per_order_draw: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('access_token')) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
      return;
    }

    Api.user.getUserInfo().then(res => {
      this.setData({
        user: res
      });
    });

    this.getPromoCode();
  },

  getPromoCode() {
    Api.user.getPromoCode().then(res => {
      console.log(res);
      this.setData({
        promoCode: res,
      });
    })
  },

  createPromoCode() {
    Api.user.createPromoCode().then(res => {
      this.getPromoCode();
    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: e || '系统错误'
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
      title: '我是应用名',
      path: '/pages/index/index?promo_code=' + this.data.promoCode.code
    }
  }
})