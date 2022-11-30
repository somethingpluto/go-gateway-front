import request from '@/utils/request'

export function getServiceList(query) {
  return request({
    url: '/service/service_list',
    method: 'get',
    params: query
  })
}

export function deleteService(form) {
  return request({
    url: '/service/service_delete',
    method: 'post',
    params: form
  })
}

export function serviceAddHttp(data) {
  return request({
    url: '/service/service_add_http',
    method: 'post',
    data
  })
}

export function serviceUpdateHttp(data) {
  return request({
    url: '/service/service_update_http',
    method: 'post',
    data
  })
}

export function serviceDetail(query) {
  return request({
    url: '/service/service_detail',
    method: 'get',
    params: query
  })
}
