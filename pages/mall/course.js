const Api = require('../../api/index')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {
      charge: 0
    },
    promoCode: {
      code: ''
    },
    discount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Api.course.getCourseInfo(options.id).then(res => {
      this.setData({
        course: res.course,
        chapters: res.chapters,
        videos: res.videos
      });
    });

    // 优惠码读取
    let promoCode = wx.getStorageSync('promo_code');
    if (promoCode) {
      Api.order.checkPromoCode(promoCode).then(res => {
        if (res.can_use === 1) {
          this.setData({
            discount: res.promo_code.invited_user_reward,
            promoCode: res.promo_code
          });
        }
      });
    }
  },

  createOrder() {
    let token = wx.getStorageSync('access_token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    Api.order.createCourseOrder(this.data.course.id, this.data.promoCode.code).then(res => {
      if (res.continue_pay === false) {
        // 直接抵扣了
        wx.showToast({
          icon: 'none',
          title: '订单已完成'
        });
        setTimeout(() => {
          wx.navigateBack({})
        }, 800);
        return;
      }
      // 请求支付订单
      Api.order.payment(res.order_id).then(res => {
        // 发起支付
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success: res => {
            wx.showToast({
              icon: 'none',
              title: '支付成功'
            });
            wx.navigateBack({})
          },
          fail(res) {
            wx.showToast({
              icon: 'none',
              title: '取消支付'
            });
          }
        })
      }).catch(e => {
        wx.showToast({
          icon: 'none',
          title: e || '系统错误'
        });
      });
    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: e || '系统错误'
      });
    });
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