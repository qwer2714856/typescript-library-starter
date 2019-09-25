import { AxiosConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../utils/base';

/**
 * 主请求模块
 */
export function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method, data = null, params, headers, responseType } = config

    let response: AxiosResponse

    // 创建xmlhttprequest
    const Request = new XMLHttpRequest()

    Request.open(method, url)

    if (responseType) {
      Request.responseType = responseType
    }

    // 处理header
    if (headers) {
      Object.keys(headers).forEach(k => {
        Request.setRequestHeader(k, headers[k])
      })
    }

    // 获取数据
    Request.onreadystatechange = () => {
      if (Request.readyState !== 4) {
        return
      }
      const responseHeaders = Request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? Request.response : Request.responseText
      resolve({
        data: responseData,
        status: Request.status,
        statusText: Request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request: Request
      })
    }

    Request.send(data)
  })
}
