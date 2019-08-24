import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

import { parseHeader } from './tools/header'
import { factoryError } from './tools/error'
import { isSomeOrigin } from './tools/url'
import cookie from './tools/cookie'
import { isFormData } from './tools/utils'

export default (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      method = 'get',
      url,
      params,
      headers,
      responseType,
      timeout = 0,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

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

    // 设置防xsrf攻击头
    if ((withCredentials || isSomeOrigin(url!)) && xsrfCookieName) {
      // 服务器种的token拿出来
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }

    // 判断是否是formdata
    if (isFormData(data)) {
      delete headers['Content-Type']
    }

    if (auth) {
      headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
    }

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

    // 下载事件
    if (onDownloadProgress) {
      Request.onprogress = onDownloadProgress
    }
    // 上传事件
    if (onUploadProgress) {
      Request.upload.onprogress = onUploadProgress
    }

    // 超时事件
    Request.ontimeout = () => {
      reject(new Error('timeout'))
    }

    // 处理请求返回状态码非200的情况
    function hd(res: AxiosResponse): void {
      if (!validateStatus || validateStatus(res.status)) {
        resolve(res)
      } else {
        reject(factoryError('状态码xxx', config))
      }
    }

    if (cancelToken) {
      cancelToken.promise.then(res => {
        // 中断请求
        Request.abort()
        reject(res)
      })
    }

    // 支持跨域的cookie的传送。
    if (withCredentials) {
      Request.withCredentials = withCredentials
    }

    Request.send(data)
  })
}
