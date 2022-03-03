import request from '@/utils/fileRequest'

export function addMember(params) {
  return request({
    url: '/member/insert',
    method: 'post',
    data: params
  })
}
export function editMember(params) {
  return request({
    url: '/member/edit',
    method: 'post',
    data: params
  })
}

