import request from '@/utils/request'

/**
 *
 * @param param(page, size)
 * @returns {AxiosPromise}
 */
export function visitPage(params) {
  return request({
    url: '/visit/page',
    method: 'get',
    params
  })
}
export function visitAdd(params) {
  return request({
    url: '/visit/add',
    method: 'post',
    data: params
  })
}
export function visitChart() {
  return request({
    url: '/visit/chart',
    method: 'get'
  })
}
