import {
  user
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      invite_balance: 0
    },
    records: [],
    pagination: {
      page: 1,
      page_size: 12,
      is_over: false
    },
    showBox: false,
    form: {
      account: '',
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
    this.getData(true);
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
        'user.invite_balance': res.invite_balance
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
    user.inviteBalanceRecords(this.data.pagination).then(res => {
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

  showWithdraw() {
    this.setData({
      showBox: true
    });
  },
  cancelWithdraw() {
    this.setData({
      showBox: false
    });
  },

  confirmWithdraw() {
    if (this.data.form.account.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入支付宝账号',
      })
      return
    }
    if (this.data.form.name.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入姓名',
      })
      return
    }
    if (this.data.form.total <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入提现金额',
      })
      return
    }
    if (this.data.form.total > this.data.user.invite_balance) {
      wx.showToast({
        icon: 'none',
        title: '请输入合理的提现金额',
      })
      return
    }

    user.createWithdraw({
      channel: '支付宝',
      channel_account: this.data.form.account,
      channel_name: this.data.form.name,
      total: this.data.form.total,
    }).then(() => {
      wx.showToast({
        icon: 'none',
        title: '提交成功',
      })
      this.getUser();
      this.getData(true);
      this.cancelWithdraw();
    })
  },

  showWithdrawRecords() {
    wx.navigateTo({
      url: '/pages/member/withdraw_records',
    })
  },

  inputChange(e) {
    let key = e.currentTarget.dataset.key;
    let val = e.detail.value;
    let obj = {};
    obj[`form.${key}`] = val;
    this.setData(obj);
  }
})