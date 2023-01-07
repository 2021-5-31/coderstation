
export const httpApi = (promise) => {
  if (!!promise && typeof promise.then === 'function') {
    // 判断参数是否为promise
    return new Promise((resolve, reject) => {
      promise.then(res => {
        if (res.code === 0) {
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const parseTime = (timestamp) => {
  timestamp = +timestamp
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours().toString().padStart(2, 0)
  const minute = date.getMinutes().toString().padStart(2, 0)
  const second = date.getSeconds().toString().padStart(2, 0)
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
