import request from '@/utils/request'

// 获取收藏的食材
export function getFavoriteIngredient () {
  return request({
    url: '/Favorite/getFavoriteIngredient',
    method: 'get'
  })
}

// 获取收藏的菜谱
export function getFavoriteMenu () {
  return request({
    url: '/Favorite/getFavoriteMenu',
    method: 'get'
  })
}
