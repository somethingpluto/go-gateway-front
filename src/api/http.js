import request from '@/utils/request'

// 添加HTTP服务
export function addHTTPService(data) {
  return request({
    url: '/service/service_add_http',
    method: 'post',
    data
  })
}

export function updateHTTPService(data) {
  return request({
    url: '/service/service_update_http',
    method: 'post',
    data
  })
}
