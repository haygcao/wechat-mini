import {
  course
} from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    courses: [],
    pagination: {
      page: 1,
      page_size: 8,
      category_id: 0
    },
    isOver: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourse()
    course.categories().then(res => {
      this.setData({
        categories: res
      })
    })
  },

  getCourse(reset = false) {
    if (reset) {
      this.setData({
        'pagination.page': 1,
        isOver: false,
        courses: []
      });
    }
    if (this.data.isOver) {
      return;
    }
    course.list(this.data.pagination).then(res => {
      let data = res.data;
      if (data.length === 0) {
        this.setData({
          isOver: true
        });
        return;
      }
      let courses = this.data.courses;
      courses.push(...data);
      this.setData({
        courses: courses
      })
    })
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'course'
      })
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

  },

  swtichCategory(e) {
    let cid = parseInt(e.currentTarget.dataset.cid);
    this.setData({
      pagination: {
        category_id: cid,
      }
    })
    console.log(this.data.pagination);
    this.getCourse(true);
  },
  loadMore() {
    if (this.data.isOver) {
      return;
    }
    this.setData({
      'pagination.page': this.data.pagination.page + 1
    });
    console.log(this.data.pagination);
    this.getCourse();
  }
})