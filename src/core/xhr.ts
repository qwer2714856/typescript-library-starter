import { AxiosConfig } from '../types'

/**
 * 主请求模块
 */
export function xhr(config: AxiosConfig): void {
  const { url, method, data = null, params } = config

  // 创建xmlhttprequest
  const Request = new XMLHttpRequest()

  Request.open(method, url)

  Request.send(data)
}
