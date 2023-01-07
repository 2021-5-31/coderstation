import request from './request'

// 分页获取问答
export function getIssueListApi(params) {
  return request({
    url: '/api/issue',
    method: 'get',
    params
  })
}