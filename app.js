const Api = require('./api/index.js');
import { updataInit } from './miniprogram_npm/wx-updata/index' 

App({
  onLaunch: function() {
    Page = updataInit(Page, { debug: false })
  },
  globalData: {
    AppName: 'MeEdu',
    Version: 'v2.0'
  }
})