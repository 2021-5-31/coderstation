import request from './request'

// 分页获取问答
export function getIssueListApi(params) {
  return request({
    url: '/api/issue',
    method: 'get',
    params
  })
}

// 新增问答
export function addIssueApi(data) {
  return request({
    url: '/api/issue',
    method: 'post',
    data
  })
}

// 问答详情
export function getIssueDetailApi(id) {
  return request({
    url: `/api/issue/${id}`,
    method: 'get'
  })
}

// 修改问答
export function updateIssueApi(id, data) {
  return request({
    url: `/api/issue/${id}`,
    method: 'patch',
    data
  })
}