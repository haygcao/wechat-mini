import instance from './instance'

export function list() {
  return instance({
    url: `/api/v2/roles`
  })
}

export function info(id) {
  return instance({
    url: `/api/v2/role/${id}`
  })
}
