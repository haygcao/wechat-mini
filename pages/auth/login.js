import {
  login
} from '../../api/index'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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

  },

  bindGetUserInfo(e) {
    let data = e.detail;

    login.wxMobileLogin({
      openid: wx.getStorageSync('openid'),
      iv: data.iv,
      rawData: data.rawData,
      signature: data.signature,
      encryptedData: data.encryptedData
    }).then(res => {
      wx.setStorageSync('access_token', res.token);

      wx.navigateBack({
        delta: 0,
      })
    })
  },

  openUserProtocol() {
    wx.navigateTo({
      url: '/pages/common/web?url=' + app.globalData.user_protocol,
    })
  },

  openUserPrivateProtocol() {
    wx.navigateTo({
      url: '/pages/common/web?url=' + app.globalData.user_private_protocol,
    })
  },

})