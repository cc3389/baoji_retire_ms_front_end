import request from '@/utils/request'

export function communityPage(params) {
  return request({
    url: '/community/page',
    method: 'get',
    params
  })
}
export function delCommunity(params) {
  return request({
    url: '/community/del',
    method: 'post',
    data: params
  })
}
export function editCommunity(params) {
  return request({
    url: '/community/update',
    method: 'post',
    data: params
  })
}
export function addCommunity(params) {
  return request({
    url: '/community/add',
    method: 'post',
    data: params
  })
}
export function comSuggestion() {
  return request({
    url: '/community/suggestion',
    method: 'get'
  })
}
