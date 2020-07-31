import util from '../../utils/util'

Component({
  properties: {
    name: {
      type: String,
      value: '',
    },
    thumb: {
      type: String,
      value: '',
    },
    userCount: {
      type: Number,
      value: 0,
    },
    category: {
      type: String,
      value: '',
    },
    charge: {
      type: Number,
      value: 0,
    },
    id: {
      type: Number,
      value: 0,
    }
  },
  data: {
    isIos: util.isIos()
  },
  methods: {
    goDetail() {
      wx.navigateTo({
        url: '/pages/course/detail?id=' + this.id,
      })
    }
  }
})