import request from '@/utils/request';

export function insPage(params) {
  return request({
    url: '/institute/list',
    method: 'get',
    params
  })
}
export function insDetail(params) {
  return request({
    url: '/institute/info',
    method: 'get',
    params
  })
}
export function delIns(params) {
  return request({
    url: '/institute/delete',
    method: 'post',
    data: params
  })
}
export function updateIns(params) {
  return request({
    url: '/institute/update',
    method: 'post',
    data: params
  })
}
export function addIns(params) {
  return request({
    url: '/institute/add',
    method: 'post',
    data: params
  })
}
export function insSuggesion() {
  return request({
    url: '/institute/suggestion',
    method: 'get'
  })
}
