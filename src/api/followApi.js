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

// 关注&取关
export function followUser (param) {
  return request({
    url: '/Follow/followUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 获取详细信息
export function getUserDetail (param) {
  return request({
    url: '/Follow/getUserInfoDetail',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 获取上传的菜谱
export function getUserMenu (param) {
  return request({
    url: '/Follow/getUserMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 获取关注内容
export function getUserFollow (param) {
  return request({
    url: '/Follow/getUserFollow',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 获取被关注数量
export function getUserFavorite (param) {
  return request({
    url: '/Follow/getUserFavorite',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 获取点赞菜谱
export function getLikeMenu (param) {
  return request({
    url: '/Follow/getLikeMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 获取点赞食材
export function getLikeIngredient (param) {
  return request({
    url: '/Follow/getLikeIngredient',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 获取点赞菜谱
export function getFavoriteMenu (param) {
  return request({
    url: '/Follow/getFavoriteMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
// 获取点赞食材
export function getFavoriteIngredient (param) {
  return request({
    url: '/Follow/getFavoriteIngredient',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
