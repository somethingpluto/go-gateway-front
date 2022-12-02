import request from '@/utils/request'

// 添加HTTP服务
export function addTCPService(data) {
  return request({
    url: '/service/service_add_tcp',
    method: 'post',
    data
  })
}

export function updateHTTPService(data) {
  return request({
    url: '/service/service_update_tcp',
    method: 'post',
    data
  })
}
