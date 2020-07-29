import instance from './instance'

export function wxLogin(data) {
  return instance({
    method: 'POST',
    url: '/api/v2/login/wechatMini',
    data: data
  })
}

export function wxMobileLogin(data) {
  return instance({
    method: 'POST',
    url: '/api/v2/login/wechatMiniMobile',
    data: data
  })
}