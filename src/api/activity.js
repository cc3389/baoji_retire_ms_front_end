import request from '@/utils/request'

/**
 *
 * @param params (name, description, comName)
 * @returns {AxiosPromise}
 */
export function addActivity(params) {
  return request({
    url: '/activity/add',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param params(page, size)
 * @returns {AxiosPromise}
 * @constructor
 */
export function activityPage(params) {
  return request({
    url: '/activity/page',
    method: 'get',
    params
  })
}
