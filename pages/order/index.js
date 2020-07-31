import {
  order
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      id: 0,
      name: '',
      charge: 0,
      type: ''
    },
    total: 0,
    promo_code: '',
    promo_code_charge: 0,
    promoCodeShadowStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'goods.id': options.id,
      'goods.name': options.name,
      'goods.charge': options.total,
      'goods.type': options.type,
      total: options.total,
    });
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

  showPromoCodeShadow() {
    this.setData({
      promoCodeShadowStatus: true
    });
  },

  hidePromoCodeShadow() {
    this.setData({
      promoCodeShadowStatus: false
    });
  },

  promoCodeCheck() {
    if (this.data.promo_code.length === 0) {
      this.setData({
        promoCodeShadowStatus: false,
        promo_code_charge: 0,
        promo_code: ''
      });
    } else {
      order.promoCodeCheck(this.data.promo_code).then(res => {
        if (res.can_use === 0) {
          wx.showToast({
            icon: 'none',
            title: '优惠码不可用',
          })
        } else {
          this.setData({
            promoCodeShadowStatus: false,
            promo_code_charge: res.promo_code.invited_user_reward
          });
        }
      })
    }
  },

  inputPromoCode(e) {
    this.setData({
      promo_code: e.detail.value
    });
  },

  paySubmit() {
    if (this.data.goods.type === 'role') {
      order.role(this.data.goods.id, this.data.promo_code).then(res => {
        this.payHandler(res);
      })
    } else if (this.data.goods.type === 'course') {
      order.course(this.data.goods.id, this.data.promo_code).then(res => {
        this.payHandler(res);
      })
    } else if (this.data.goods.type === 'video') {
      order.video(this.data.goods.id, this.data.promo_code).then(res => {
        this.payHandler(res);
      })
    }
  },

  payHandler(orderData) {
    if (orderData.status_text === '已支付') {
      // 这种情况是优惠码全部抵扣
      wx.showToast({
        icon: 'none',
        title: '支付成功',
      })
      setTimeout(() => {
        // 返回上一页
        wx.navigateBack({
          delta: 0,
        })
      }, 500);
      return
    }

    // 未支付 -> 需要吊起小程序支付
    order.pay(orderData.order_id).then(res => {
      wx.requestPayment({
        nonceStr: res.nonceStr,
        package: res.package,
        paySign: res.paySign,
        timeStamp: res.timeStamp,
        signType: res.signType,
        success: (res) => {
          console.log('支付成功', res);
          wx.showToast({
            icon: 'none',
            title: '支付成功',
          })
          setTimeout(() => {
            // 返回上一页
            wx.navigateBack({
              delta: 0,
            })
          }, 500);
        },
        fail: (res) => {
          console.log('支付失败', res);
          wx.showToast({
            icon: 'none',
            title: '支付失败',
          })
        }
      })
    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: '错误：' + e,
      })
    })
  }
})