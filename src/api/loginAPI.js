import request from '@/utils/request'

export function login (params) {
  return request({
    url: '/User/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
