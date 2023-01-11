import request from './request'

// 查找所有分类对应的面试题标题
export function getInterviewTitleApi(params) {
  return request({
    url: '/api/interview/interviewTitle',
    method: 'get',
    params
  })
}

export function getInterviewContentApi(id) {
  return request({
    url: `/api/interview/${id}`,
    method: 'get'
  })
}
