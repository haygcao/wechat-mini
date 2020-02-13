const Api = require('../../api/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    sms_code: '',
    image_captcha: '',
    password: '',
    loginType: 'sms',
    image: {
      img: '',
      key: ''
    },
    sms_expire: 60,
    sms_loading: false,
    sms_expire_seconds: 60
  },

  switchLogin(e) {
    this.setData({
      loginType: e.currentTarget.dataset.id,
    });
  },

  switchCaptchaImage() {
    this.getCaptcha();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCaptcha();
  },

  getCaptcha() {
    Api.user.captchaImage().then(res => {
      this.setData({
        image: {
          img: res.img,
          key: res.key
        },
        image_captcha: '',
      });
    });
  },

  submitLogin() {
    if (this.data.mobile.length !== 11) {
      return;
    }
    if (this.data.loginType === 'sms') {
      if (this.data.sms_code.length === 0) {
        return;
      }
      Api.user.mobileLogin({
        mobile: this.data.mobile,
        mobile_code: this.data.sms_code,
      }).then(res => {
        wx.setStorageSync('access_token', res.token);
        wx.switchTab({
          url: '/pages/member/member'
        })
      }).catch(e => {
        wx.showToast({
          icon: 'none',
          title: e
        });
      })
    } else {
      if (this.data.password.length === 0) {
        return;
      }

      Api.user.passwordLogin({
        mobile: this.data.mobile,
        password: this.data.password
      }).then(res => {
        wx.setStorageSync('access_token', res.token);
        wx.switchTab({
          url: '/pages/member/member'
        })
      }).catch(e => {
        wx.showToast({
          icon: 'none',
          title: e
        });
      });
    }
  },

  sendSmsCode() {
    if (this.data.mobile.length === 0 || this.data.image_captcha.length === 0 || this.data.sms_loading === true) {
      return;
    }
    this.setData({
      sms_expire_seconds: this.data.sms_expire,
    });
    var timeoutHandler = null;

    Api.user.captchaSms({
      mobile: this.data.mobile,
      image_captcha: this.data.image_captcha,
      image_key: this.data.image.key,
      scene: 'login'
    }).then(res => {
      this.setData({
        sms_loading: true
      });
      var timeoutHandler = setInterval(() => {
        if (this.data.sms_loading !== true) {
          return;
        }
        let s = this.data.sms_expire_seconds - 1;
        this.setData({
          sms_expire_seconds: s,
        });
        if (s <= 0) {
          clearInterval(timeoutHandler);
          this.setData({
            sms_loading: false,
          });
          return;
        }
      }, 1000);

    }).catch(e => {
      this.getCaptcha();
      wx.showToast({
        icon: 'none',
        title: e
      });
    })
  },

  inputBind(e) {
    let name = e.currentTarget.dataset.name;
    let v = e.detail.value;
    let obj = {};
    obj[name] = v;
    this.setData(obj);
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

  }
})