import instance from './instance';

export function createCourseOrder(courseId, promoCodeId) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/course',
    data: {
      course_id: courseId,
      promo_code: promoCodeId
    }
  })
}

export function creteRoleOrder(roleId, promoCodeId) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/role',
    data: {
      role_id: roleId,
      promo_code: promoCodeId
    }
  })
}

export function payment(order_id) {
  return instance({
    method: 'POST',
    url: '/api/v2/order/payment/wechat/mini',
    data: {
      order_id: order_id,
      openid: wx.getStorageSync('openid')
    }
  })
}

export function checkPromoCode(code) {
  return instance({
    method: 'GET',
    url: '/api/v2/promoCode/' + code + '/check',
    data: {}
  })
}