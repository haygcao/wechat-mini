import instance from './instance';

export function course(courseId, promoCode) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/course',
    data: {
      course_id: courseId,
      promo_code: promoCode
    }
  })
}

export function video(videoId, promoCode) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/video',
    data: {
      video_id: videoId,
      promo_code: promoCode
    }
  })
}

export function role(roleId, promoCode) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/role',
    data: {
      role_id: roleId,
      promo_code: promoCode
    }
  })
}

export function pay(order_id) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/payment/wechat/mini',
    data: {
      order_id: order_id,
      openid: wx.getStorageSync('openid')
    }
  })
}

export function promoCodeCheck(code) {
  return instance({
    method: 'GET',
    url: '/api/v2/promoCode/' + code + '/check',
    data: {}
  })
}