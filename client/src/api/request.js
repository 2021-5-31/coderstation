import axios from 'axios'

const request = axios.create({
  timeout: 5000
})
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('coderstation-user-token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})
request.interceptors.response.use((res) => {
  const result = res.data
  return result
}, (err) => {
  return Promise.reject(err)
})

export default request