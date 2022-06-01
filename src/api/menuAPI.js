import request from '@/utils/request'

// 上传菜单
export function uploadMenu (params) {
  return request({
    url: '/Menu/uploadMenu',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}

// 获取所有的菜单
export function getAllMenu () {
  return request({
    url: '/Menu/getAllMenu',
    method: 'get'
  })
}

// 获取菜单详情
export function getMenuDetail (param) {
  return request({
    url: '/Menu/menuDetail',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 收藏食材
export function favoriteMenu (param) {
  return request({
    url: '/Menu/favoriteMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 点赞食材
export function likeMenu (param) {
  return request({
    url: '/Menu/likeMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
