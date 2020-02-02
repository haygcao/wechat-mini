const baseUrl = 'https://demo.meedu.vip' //'https://58hualong.com' //

export default function instance(params) {
    return new Promise((resolve, reject) => {
        wx.showLoading()
        wx.request({
            method: params.method || 'GET',
            url: baseUrl + params.url || '',
            data: params.data || {},
            header: {
                Authorization: `Bearer ${wx.getStorageSync('access_token')}`,
                'third-session': wx.getStorageSync('thirdSession') || ''
            },
            success(res) {
                if (typeof res.data === 'string') {
                    wx.showToast({
                        icon: 'none',
                        title: '请先登陆',
                        success: function() {
                            wx.navigateTo({
                                url: '../login/login',
                                success: function() {
                                    console.log('1')
                                }
                            })
                        }
                    })
                    reject(res.data)
                    return
                }
                if (res.data.code === 0) {
                    resolve((res.data && res.data.data) || {})
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: res.data.message || '程序员小哥哥正在加紧检查中...'
                    })
                    reject(res.data)
                }
            },
            fail(err) {
                reject(err)
            },
            complete() {
                wx.hideLoading()
            }
        })
    })
}
