import {
  user
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatar: '',
      nick_name: '',
      invite_balance: 0
    },
    promo_code: '',
    invited_user_reward: 0,
    invite_user_reward: 0,
    per_order_draw: 0,
    invite_user_count: 0
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
    this.getUser();
    this.getInviteUsers();
    this.getPromoCode();
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

  getUser() {
    user.info().then(res => {
      this.setData({
        'user.avatar': res.avatar,
        'user.nick_name': res.nick_name,
        'user.invite_balance': res.invite_balance
      });
    })
  },

  getInviteUsers() {
    user.inviteUsers().then(res => {
      this.setData({
        invite_user_count: res.total
      });
    })
  },

  getPromoCode() {
    user.promoCode().then(res => {
      if (res.code) {
        this.setData({
          'promo_code': res.code,
          'invite_user_reward': res.invite_user_reward,
          'invited_user_reward': res.invited_user_reward,
          'per_order_draw': res.per_order_draw
        });
      }
    })
  },

  createPromoCode() {
    user.createPromoCode().then(res => {
      this.getPromoCode();
    })
  },

  copy() {
    if (this.data.promo_code.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请创建邀请码',
      })
      return
    }
    wx.setClipboardData({
      data: this.data.promo_code,
      success: () => {
        wx.showToast({
          icon: 'none',
          title: '成功',
        })
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '失败',
        })
      }
    })
  },

  goWithdraw() {
    if (this.data.user.invite_balance === 0) {
      wx.showToast({
        icon: 'none',
        title: '余额不足',
      })
      return
    }

    wx.navigateTo({
      url: '/pages/member/ib_withdraw',
    })
  }
})