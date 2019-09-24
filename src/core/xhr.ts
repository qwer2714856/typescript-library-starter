import { AxiosConfig } from '../types'

/**
 * 主请求模块
 */
export function xhr(config: AxiosConfig): void {
  const { url, method, data = null, params, headers } = config

  // 创建xmlhttprequest
  const Request = new XMLHttpRequest()

  Request.open(method, url)

  // 处理header
  if (headers) {
    Object.keys(headers).forEach(k => {
      Request.setRequestHeader(k, headers[k])
    })
  }

  Request.send(data)
}
