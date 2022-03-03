import request from '@/utils/request'

export function transPage(params) {
  return request({
    url: '/trans/page',
    method: 'get',
    params
  })
}
export function transSuggestion() {
  return request({
    url: '/trans/suggestion',
    method: 'get'
  })
}

