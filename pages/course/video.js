import {
  video
} from '../../api/index';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: null,
    course: null,
    chapters: [],
    videos: [],
    attachs: [],
    navTab: 'menu',
    isBuy: false,
    videoWatchedProgress: [],
    comments: [],
    commentUsers: [],
    videoId: 0,
    commentContent: '',
    playInfo: [],
    playUrl: '',
    poster: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      videoId: options.id
    });

    this.setData({
      poster: app.globalData.player_cover
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
    if (!wx.getStorageSync('access_token')) {
      wx.navigateTo({
        url: '/pages/auth/login',
      })
    } else {
      this.getVideo();
      this.getComments();
    }
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
    return {
      title: this.data.video.title,
      path: `/pages/course/video?id=${this.data.videoId}`,
      imageUrl: this.data.course.thumb
    }
  },

  getVideo() {
    video.info(this.data.videoId).then(res => {
      wx.setNavigationBarTitle({
        title: res.video.title,
      })

      // 富文本图片溢出
      res.video.render_desc = res.video.render_desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');

      this.setData({
        video: res.video,
        course: res.course,
        chapters: res.chapters,
        videos: res.videos,
        isBuy: res.is_watch,
        videoWatchedProgress: res.videoWatchedProgress
      });

      // 如果可以看，则获取视频地址
      if (res.is_watch) {
        this.getPlayInfo();
      }
    })
  },

  getPlayInfo() {
    video.playUrl(this.data.video.id).then(res => {
      if (res.urls.length === 0) {
        wx.showToast({
          icon: 'none',
          title: '播放地址为空',
        })
      } else {
        console.log(res.urls[0].url);
        this.setData({
          playInfo: res.urls,
          playUrl: res.urls[0].url
        });
      }
    })
  },

  getComments() {
    video.comments(this.data.videoId).then(res => {
      this.setData({
        commentUsers: res.users,
        comments: res.comments
      });
    })
  },

  switchNavTab(e) {
    let tab = e.currentTarget.dataset.tab;
    if (this.data.navTab === tab) {
      return;
    }
    this.setData({
      navTab: tab
    });
  },

  inputCommentContent(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },

  createComment() {
    if (!wx.getStorageSync('access_token')) {
      wx.navigateTo({
        url: '/pages/auth/login',
      })
      return
    }

    if (this.data.commentContent.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入内容',
      })
      return
    }

    video.createComment(this.data.videoId, {
      content: this.data.commentContent
    }).then(() => {

      this.setData({
        commentContent: ''
      });

      this.getComments();

      wx.showToast({
        icon: 'none',
        title: '成功，审核通过将会展示',
      });

    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: e,
      })
    })
  },

  goVideo(e) {
    let videoId = e.currentTarget.dataset.videoId;
    wx.redirectTo({
      url: '/pages/course/video?id=' + videoId,
    })
  }
})