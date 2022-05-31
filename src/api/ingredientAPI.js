import request from '@/utils/request'

export function uploadIngredient (params) {
  return request({
    url: '/Ingredient/uploadIngredient',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
