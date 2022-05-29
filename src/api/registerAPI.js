import request from '@/utils/request'

export function register (params) {
  return request({
    url: '/User/register',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
