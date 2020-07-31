import {
  login
} from '../../api/index'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    step1: true,
    step2: false,
    redirect: null,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let redirect = options.redirect;
    if (redirect) {
      redirect = decodeURIComponent(redirect);
      this.setData({
        redirect: redirect
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
  onShow: function () {},

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

  getUserInfo(e) {
    let data = e.detail;

    this.setData({
      userInfo: data
    });

    login.wxLogin({
      openid: wx.getStorageSync('openid'),
      iv: data.iv,
      rawData: data.rawData,
      signature: data.signature,
      encryptedData: data.encryptedData
    }).then(res => {
      wx.setStorageSync('access_token', res.token);

      if (this.data.redirect) {
        wx.redirectTo({
          url: this.data.redirect,
        })
      } else {
        wx.navigateBack({
          delta: 0,
        })
      }
    }).catch(e => {
      this.setData({
        step1: false,
        step2: true
      })

      wx.showToast({
        icon: 'none',
        title: '请绑定手机号',
      })
    });
  },

  getPhoneNumber(e) {
    let data = e.detail;

    login.wxMobileLogin({
      openid: wx.getStorageSync('openid'),
      iv: data.iv,
      encryptedData: data.encryptedData,
      userInfo: {
        rawData: this.data.userInfo.rawData,
        signature: this.data.userInfo.signature,
        encryptedData: this.data.userInfo.encryptedData,
        iv: this.data.userInfo.iv
      }
    }).then(res => {
      wx.setStorageSync('access_token', res.token);

      if (this.data.redirect) {
        wx.redirectTo({
          url: this.data.redirect,
        })
      } else {
        wx.navigateBack({
          delta: 0,
        })
      }
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