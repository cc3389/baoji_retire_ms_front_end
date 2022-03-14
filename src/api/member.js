import request from '@/utils/request'

export function queryMember(params) {
  return request({
    url: '/member/page',
    method: 'get',
    params
  })
}
export function queryMemberDetail(params) {
  return request({
    url: '/member/one',
    method: 'get',
    params
  })
}
export function updateMember(params) {
  return request({
    url: '/member/update',
    method: 'post',
    data: params
  })
}
export function transOut(params) {
  return request({
    url: '/member/out',
    method: 'post',
    data: params
  })
}
export function transIn(params) {
  return request({
    url: '/member/in',
    method: 'post',
    data: params
  })
}
export function deathPage(params) {
  return request({
    url: '/member/deathPage',
    method: 'get',
    params
  })
}

export function deathReport(params) {
  return request({
    url: '/member/death',
    method: 'post',
    data: params
  })
}

/**
 *
 * @param params(size, page)
 * @returns {AxiosPromise}
 */
export function feePage(params) {
  return request({
    url: '/member/feePage',
    method: 'get',
    params
  })
}
export function exportMem(params) {
  return request({
    url: '/member/export',
    method: 'post',
    data: params
  })
}
