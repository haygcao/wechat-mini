import instance from './instance'

export function indexBanners(params) {
  return instance({
      url: '/api/v2/index/banners',
      data: params
  })
}