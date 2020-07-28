import {
  base
} from './api/index';

App({
  onLaunch: function () {

    // 请求meedu的系统配置
    base.config().then(res => {
      this.globalData.user_protocol = res.user_protocol;
      this.globalData.user_private_protocol = res.user_private_protocol;
      this.globalData.aboutus = res.aboutus;
      this.globalData.player_cover = res.player.cover;
    })

    // 小程序session flash
    wx.login({
      success: (res) => {
        base.wxLogin({
          code: res.code
        }).then(res => {
          wx.setStorageSync('openid', res.openid);
        })
      }
    })
  },
  globalData: {
    AppName: 'MeEdu',
    Version: 'v2.0',
    user_protocol: '',
    user_private_protocol: '',
    aboutus: '',
    player_cover: ''
  }
})