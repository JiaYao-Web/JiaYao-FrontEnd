import request from '@/utils/request'

// 获取所有的用户信息
export function getAllUser () {
  return request({
    url: '/Follow/getAllUsers',
    method: 'get'
  })
}

// 获取首页的用户信息
export function getAllUserHome () {
  return request({
    url: '/Follow/getHomeUsers',
    method: 'get'
  })
}
