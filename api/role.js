import instance from './instance'

export function list() {
  return instance({
    url: `/api/v2/roles`
  })
}
