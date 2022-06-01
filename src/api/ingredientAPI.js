import request from '@/utils/request'

// 上传食材
export function uploadIngredient (params) {
  return request({
    url: '/Ingredient/uploadIngredient',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}

// 获取所有的食材
export function getAllIngredient () {
  return request({
    url: '/Ingredient/getAllIngredient',
    method: 'get'
  })
}

// 获取食材详情
export function getIngredientDetail (param) {
  return request({
    url: '/Ingredient/IngredientDetail',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 收藏食材
export function favoriteIngredient (param) {
  return request({
    url: '/Ingredient/favoriteIngredient',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 点赞食材
export function likeIngredient (param) {
  return request({
    url: '/Ingredient/likeIngredient',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
