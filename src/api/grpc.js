import request from '@/utils/request'

// 添加HTTP服务
export function addGRPCService(data) {
  return request({
    url: '/service/service_add_grpc',
    method: 'post',
    data
  })
}

export function updateGRPCService(data) {
  return request({
    url: '/service/service_update_grpc',
    method: 'post',
    data
  })
}
