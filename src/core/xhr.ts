import { AxiosConfig, AxiosPromise, AxiosResponse } from '../types'

function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    let requestObj: XMLHttpRequest = new XMLHttpRequest()

    if (responseType) {
      requestObj.responseType = responseType
    }

    requestObj.open(method.toUpperCase(), url, true)

    // 设置请求头
    Object.keys(headers).forEach(i => {
      if (null === data && i.toLowerCase() === 'content-type') {
        delete headers[i]
      } else {
        requestObj.setRequestHeader(i, headers[i])
      }
    })

    // 接受数据
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState !== 4) {
        return
      }
      // 构造response
      const response: AxiosResponse = {
        headers: requestObj.getAllResponseHeaders(),
        data: responseType !== 'text' ? requestObj.response : requestObj.responseText,
        status: requestObj.status,
        statusText: requestObj.statusText,
        config,
        request: requestObj
      }
      resolve(response)
    }

    requestObj.send(data)
  })
}

export default xhr
