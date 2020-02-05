const Api = require('../../api/index')

Page({
  data: {
    scrollLeft: 0,
    categories: [],
    courses: [],
    category_id: 0,
    page: 1,
    page_size: 5,
    loadMore: true,
    loadMoreStatus: false
  },
  categoryTap(e) {
    this.setData({
      category_id: e.currentTarget.dataset.id,
    })
    this.getCourses(true);
  },
  onLoad() {
    Api.course.getCourseCategories().then(res => {
      this.setData({
        categories: res
      });
    })
    this.getCourses(true);
  },
  getCourses(refresh) {
    if (refresh) {
      this.setData({
        courses: [],
        page: 1
      });
    }
    Api.course.getCourseList({
      category_id: this.data.category_id,
      page: this.data.page,
      page_size: this.data.page_size
    }).then(res => {
      this.setData({
        loadMoreStatus: false,
      });
      if (res.data.length === 0) {
        this.setData({
          loadMore: false
        });
      }
      var data = this.data.courses;
      res.data.forEach(item => {
        data.push(item);
      });
      this.setData({
        courses: data
      });
    })
  },
  onPullDownRefresh() {
    this.setData({
      page: 1,
    });
    this.getCourses(true);
  },
  onReachBottom() {
    if (this.data.loadMore === false) {
      return;
    }
    this.setData({
      loadMoreStatus: true,
    })
    this.setData({
      page: this.data.page + 1,
    });
    this.getCourses(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我是应用名',
      path: '/pages/index/index?promo_code=' + wx.getStorageSync('promo_code')
    }
  }
})