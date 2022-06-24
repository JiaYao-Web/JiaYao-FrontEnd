import request from '@/utils/request'

// 搜索菜谱
export function searchMenu (param) {
  return request({
    url: '/Search/searchMenu',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 搜索食材
export function searchIngredient (param) {
  return request({
    url: '/Search/searchIngredient',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}

// 搜索用户
export function searchUser (param) {
  return request({
    url: '/Search/searchUser',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: param
  })
}
