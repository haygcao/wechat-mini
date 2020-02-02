import instance from './instance'

export function passwordLogin(data) {
    return instance({
        method: 'POST',
        url: '/api/v2/login/password',
        data: data
    })
}

export function mobileLogin(data) {
    return instance({
        method: 'POST',
        url: '/api/v2/login/mobile',
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

export function getUserInfo() {
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
