import { AxiosConfig } from '../types'

function xhr(config: AxiosConfig): void {
  const { data = null, url, method = 'get' } = config

  let requestObj: XMLHttpRequest = new XMLHttpRequest()

  requestObj.open(method.toUpperCase(), url, true)

  // 设置请求头
  if (config.headers) {
    Object.keys(config.headers).forEach(i => {
      requestObj.setRequestHeader(i, config.headers[i])
    })
  }

  requestObj.send(data)
}

export default xhr
