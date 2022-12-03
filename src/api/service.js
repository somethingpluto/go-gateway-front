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

export function serviceDetail(query) {
  return request({
    url: '/service/service_detail',
    method: 'get',
    params: query
  })
}

export function serviceStat(query) {
  return request({
    url: '/service/service_static',
    method: 'get',
    params: query
  })
}

export function servicePanelData() {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get'
  })
}
