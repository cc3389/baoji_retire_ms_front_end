import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: data
  })
}
export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function adminPage(params) {
  return request({
    url: '/admin/list',
    method: 'GET',
    params
  })
}
export function adminCreate(params) {
  return request({
    url: '/admin/create',
    method: 'post',
    data: params
  })
}
export function adminGrant(params) {
  return request({
    url: '/admin/grant',
    method: 'post',
    data: params
  })
}
export function adminRevoke(params) {
  return request({
    url: '/admin/revoke',
    method: 'post',
    data: params
  })
}
export function adminSuggestion() {
  return request({
    url: '/admin/suggestion',
    method: 'get'
  })
}
