import request from '@/utils/request'

export function queryit(params) {
  return request({
    url: '/api/goodspricelibaray/findGoodsPriceIT',
    method: 'get',
    params
  })
}

export function exportGoodsPriceIT(params) {
  return request({
    url: '/api/goodspricelibaray/exportGoodsPriceIT ',
    method: 'get',
    params
  })
}

export function queryGoodsPriceITByDescipt(params) {
  return request({
    url: '/api/goodspricelibaray/queryGoodsPriceITByDescipt',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/goodspricelibaray/findGoodsPriceIT',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/goodspricelibaray/findGoodsPriceIT',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/goodspricelibaray/findGoodsPriceIT',
    method: 'put',
    data
  })
}

export default { add, edit, del }