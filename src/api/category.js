import request from '@/utils/request'

// 获取菜谱分类
export function getMenuCategory (param) {
  return request({
    url: '/Category/getMenuCategory',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 获取食材分类
export function getIngredientCategory (param) {
  return request({
    url: '/Category/getIngredientCategory',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
