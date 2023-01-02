import request from './request'

export function getCaptchaApi() {
  return request({
    url: '/res/captcha',
    method: 'get'
  })
}

export function addStudentApi(data) {
  return request({
    url: '/students',
    method: 'post',
    data
  })
}
