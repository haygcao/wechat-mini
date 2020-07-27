import instance from './instance'

export function indexBanners(params) {
  return instance({
      url: '/api/v2/index/banners',
      data: params
  })
}

export function sliders() {
  return instance({
      url: '/api/v2/sliders',
      data: {
        platform: 'mini'
      }
  })
}

export function search(params) {
  return instance({
      url: '/api/v2/search',
      data: params
  })
}