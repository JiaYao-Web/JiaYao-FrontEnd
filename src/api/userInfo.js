import request from '@/utils/request'

// 获取当前登录者的信息
export function getMyInfo () {
  return request({
    url: '/User/getMyInfo',
    method: 'get'
  })
}

// 修改密码
export function changePassword (params) {
  return request({
    url: '/User/changePassword',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

// 修改用户名
export function changeName (params) {
  return request({
    url: '/User/changeName',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

// 修改用户头像
export function changeImage (params) {
  return request({
    url: '/User/changeImage',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
