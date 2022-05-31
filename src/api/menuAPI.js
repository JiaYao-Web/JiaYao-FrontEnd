import request from '@/utils/request'

export function uploadMenu (params) {
  return request({
    url: '/Menu/uploadMenu',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
