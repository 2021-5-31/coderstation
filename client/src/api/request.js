import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://127.0.0.1:3000'
  timeout: 5000
})
request.interceptors.request.use((config) => {
  return config
})
request.interceptors.response.use((res) => {
  const result = res.data
  return result
}, (err) => {
  return Promise.reject(err)
})

export default request