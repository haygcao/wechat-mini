const Api = require('./api/index.js');

App({
  onLaunch: function() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    wx.login({
      success(res) {
        Api.login.wxLogin({
          code: res.code
        }).then(res => {
          wx.setStorageSync('openid', res.openid);
          wx.setStorageSync('session_key', res.session_key);
        });
      }
    })
  },
  globalData: {
    AppName: '我是应用名'
  }
})