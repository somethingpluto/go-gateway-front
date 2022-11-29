import request from '@/utils/request'

export function getServiceList(query) {
  return request({
    url: '/service/service_list',
    method: 'get',
    params: query
  })
}

