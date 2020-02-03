import instance from './instance'

export function wxLogin(data) {
  return instance({
    method: 'POST',
    url: '/api/v2/wechat/mini/login',
    data: data
  })
}