import request from '@/utils/request'

export function forgetPassword (params) {
  return request({
    url: '/User/forgetPassword',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}
