import request from './request'

// 分页获取问答
export function getTypeListApi(params) {
  return request({
    url: '/api/type',
    method: 'get',
    params
  })
}