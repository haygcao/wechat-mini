import {
  user,
  role
} from '../../api/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    roles: [],
    order: {
      id: 0,
      name: '',
      total: 0
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
    this.getUser();
    this.roleList();
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
        user: res
      })
    });
  },

  roleList() {
    role.list().then(res => {
      this.setData({
        roles: res
      })
    })
  },

  choice(e) {
    let data = e.currentTarget.dataset;
    let id = data.id;
    let charge = data.charge;
    let name = data.name;
    this.setData({
      'order.id': id,
      'order.total': charge,
      'order.name': name
    });
  },

  buy() {
    if (this.data.order.id === 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择会员',
      })
      return;
    }

    wx.navigateTo({
      url: `/pages/order/index?id=${this.data.order.id}&total=${this.data.order.total}&name=${this.data.order.name}&type=role`,
    })
  }
})