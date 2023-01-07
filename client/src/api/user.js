import request from './request'

// 获取验证码
export function getCaptchaApi() {
  return request({
    url: '/res/captcha',
    method: 'get'
  })
}

// 检查注册的用户是否存在
export function checkRegisterIdApi(loginId) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: 'get'
  })
}

// 注册用户
export function addUserApi(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

// 用户登录
export function userLoginApi(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 根据id查找用户
export function getUserInfoApi(id) {
  return request({
    url: `/api/user/${id}`,
    method: 'get'
  })
}

// 恢复登录
export function resumeLoginApi() {
  return request({
    url: '/api/user/whoami',
    method: 'get'
  })
}

// 积分前十用户
export function getUserPointRankApi() {
  return request({
    url: '/api/user/pointsrank',
    method: 'get'
  })
}