import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

import { parseHeader } from './tools/header'
import { factoryError } from './tools/error'

export default (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, params, headers, responseType, timeout = 0 } = config

    const Request = new XMLHttpRequest()

    if (responseType) {
      Request.responseType = responseType
    }

    Request.open(method.toLocaleUpperCase(), url!, true) // url! !类型断言，断言是不会出问题的，这个问题的产生原来的url是比传后来改为可选所以报错了，使用参数!告诉编辑器这里不会有问题的。

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

    Request.onerror = () => {
      reject(factoryError('net work', config))
    }

    // 设置超时时间
    Request.timeout = timeout

    Request.onreadystatechange = () => {
      if (4 !== Request.readyState || 0 === Request.status) {
        return
      } else {
        const responseHeader = Request.getAllResponseHeaders()
        const responseData = 'text' !== responseType ? Request.response : Request.responseText

        // 自动根据数据格式提转换

        // 构造AxiosResponse对象
        const response: AxiosResponse = {
          data: responseData,
          status: Request.status,
          statusText: Request.statusText,
          headers: parseHeader(responseHeader),
          config,
          request: Request
        }
        hd(response)
      }
    }

    // 超时事件
    Request.ontimeout = () => {
      reject(new Error('timeout'))
    }

    // 处理请求返回状态码非200的情况
    function hd(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(factoryError('状态码xxx', config))
      }
    }

    Request.send(data)
  })
}
