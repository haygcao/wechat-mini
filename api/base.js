import instance from './instance'

export function config() {
  return instance({
    url: '/api/v2/other/config'
  })
}

export function wxLogin(data) {
  return instance({
    method: 'POST',
    url: '/api/v2/wechat/mini/login',
    data: data
  })
}

export function captchaImage(data) {
  return instance({
    method: 'get',
    url: '/api/v2/captcha/image',
    data: data
  })
}

export function captchaSms(data) {
  return instance({
    method: 'POST',
    url: '/api/v2/captcha/sms',
    data: data // scene[login:登录,register:注册,password_reset:密码重置]
  })
}