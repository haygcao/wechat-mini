import instance from './instance'


export function info() {
    return instance({
        url: '/api/v2/member/detail'
    })
}

export function getUserOrders(data) {
    return instance({
        url: '/api/v2/member/orders',
        data: data
    })
}

export function getUserRoles(data) {
    return instance({
        url: '/api/v2/member/roles',
        data: data
    })
}

export function courses(data) {
  return instance({
    url: '/api/v2/member/courses',
    data: data
  })
}

export function collectionCourses(data) {
  return instance({
    url: '/api/v2/member/courses/like',
    data: data
  })
}

export function historyCourses(data) {
  return instance({
    url: '/api/v2/member/courses/history',
    data: data
  })
}

export function getPromoCode() {
  return instance({
    url: '/api/v2/member/promoCode',
    data: {}
  })
}

export function createPromoCode() {
  return instance({
    method: 'POST',
    url: '/api/v2/member/promoCode',
    data: {}
  })
}

export function getInviteBalanceRecrods(data) {
  return instance({
    url: '/api/v2/member/inviteBalanceRecrods',
    data: data
  })
}