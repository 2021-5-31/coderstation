import request from './request'

// 查询某一问答评论
export function getIssueCommentApi(id, params) {
  return request({
    url: `/api/comment/issuecomment/${id}`,
    method: 'get',
    params
  })
}

// 新增评论
export function addCommentApi(data) {
  return request({
    url: '/api/comment',
    method: 'post',
    data
  })
}