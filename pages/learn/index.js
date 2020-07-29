import {
  user
} from '../../api/index'

import {loginCheck} from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    pagination: {
      buyCourse: {
        page: 1,
        page_size: 8,
        is_over: false,
        loading: false
      },
      history: {
        page: 1,
        page_size: 8,
        is_over: false,
        loading: false
      },
      collection: {
        page: 1,
        page_size: 8,
        is_over: false,
        loading: false
      }
    },
    courses: {
      buyCourse: [],
      collection: [],
      history: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loginCheck()
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
    this.getCourses();
    this.getCollection();
    this.getHistory();
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

  getData() {
    let active = this.data.active;
    if (active === 0) {
      this.getCourses();
    } else if (active === 1) {
      this.getCollection();
    } else if (active === 2) {
      this.getHistory();
    }
  },

  getCourses() {
    // 购买课程
    user.courses(this.data.pagination.buyCourse).then(res => {
      let list = res.data;
      if (list.length === 0) {
        this.setData({
          'pagination.buyCourse.is_over': true
        });
      } else {
        let data = this.data.courses.buyCourse;
        data.push(...list);
        this.setData({
          'courses.buyCourses': data
        });
      }
    })
  },

  getCollection() {
    // 收藏课程
    user.collectionCourses(this.data.pagination.collection).then(res => {
      let list = res.data;
      if (list.length === 0) {
        this.setData({
          'pagination.collection.is_over': true
        });
      } else {
        let data = this.data.courses.collection;
        data.push(...list);
        this.setData({
          'courses.collection': data
        });
      }
    })
  },

  getHistory() {
    // 观看历史
    user.historyCourses(this.data.pagination.history).then(res => {
      let list = res.data;
      if (list.length === 0) {
        this.setData({
          'pagination.history.is_over': true
        });
      } else {
        let data = this.data.courses.history;
        data.push(...list);
        this.setData({
          'courses.history': data
        });
      }
    })
  },

  loadMore() {
    if (this.data.active === 0) {
      if (this.data.pagination.buyCourse.is_over) {
        return;
      }
      this.setData({
        'pagination.buyCourse.page': this.data.pagination.buyCourse.page + 1
      });
    } else if (this.data.active === 1) {
      if (this.data.pagination.collection.is_over) {
        return;
      }
      this.setData({
        'pagination.collection.page': this.data.pagination.collection.page + 1
      });
    } else if (this.data.active === 2) {
      if (this.data.pagination.history.is_over) {
        return;
      }
      this.setData({
        'pagination.history.page': this.data.pagination.history.page + 1
      });
    }
    this.getData();
  },

  onChange(e) {
    let active = e.detail.index;
    this.setData({
      active: active
    });
  },
})