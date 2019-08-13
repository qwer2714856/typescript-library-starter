import { AxiosRequestConfig } from './types'

export default (config: AxiosRequestConfig): void => {
  const { data = null, method = 'get', url, params, headers } = config

  const Request = new XMLHttpRequest()

  Request.open(method.toLocaleUpperCase(), url, true)

  const arams = new URLSearchParams('')
  for (let i in data) {
    arams.append(i, data[i])
  }

  // 这个很有讲头你要告诉服务端你传的是个什么玩意，你传的如果是json如果是表单就是表单 如果是流体需要文件上传头。
  // Request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;'); 当没有设置头，URLSearchParams 直接发他默认使用的是这个头。
  // Request.setRequestHeader('Content-Type', 'multipart/form-data');
  // Request.setRequestHeader('Content-Type', 'application/json');

  Object.keys(headers).forEach(key => {
    if (null === data && key.toLocaleLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      Request.setRequestHeader(key, headers[key])
    }
  })

  Request.send(data)
}
