import { AxiosConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../utils/headers'
import { transformResponse } from '../utils/data'
import { createAxiosErrorcs } from '../utils/axioserror'
import { isUrlSameOrigin } from '../utils/url'
import cookie from '../utils/cookie'
import { isFormData } from '../utils'

function xhr(config: AxiosConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout = 0,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onUploadProgress,
      onDownloadProgress,
      auth
    } = config

    let requestObj: XMLHttpRequest = new XMLHttpRequest()

    if (responseType) {
      requestObj.responseType = responseType
    }

    if (timeout) {
      requestObj.timeout = timeout // 单位毫秒
    }

    requestObj.open(method.toUpperCase(), url!, true)

    // 支持跨域携带cookie
    requestObj.withCredentials = withCredentials!

    // xsrf
    // 判断是否同域
    if ((withCredentials || !isUrlSameOrigin(url!)) && xsrfCookieName) {
      const token = cookie.read(xsrfCookieName)

      // 设置header
      if (token && xsrfHeaderName) {
        headers[xsrfHeaderName] = token
      }
    }

    // 如果是FormData修改头信息 没有默认发的就是流
    if (isFormData(data)) {
      delete headers['Content-Type']
    }

    // auth 头
    if (auth) {
      headers['authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
    }

    // 设置请求头
    Object.keys(headers).forEach(i => {
      if (null === data && i.toLowerCase() === 'content-type') {
        delete headers[i]
      } else {
        requestObj.setRequestHeader(i, headers[i])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then((reason: string) => {
        requestObj.abort()
        reject(new Error('timeout'))
      })
    }

    // 接受数据
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState !== 4) {
        return
      }
      // 构造response
      const response: AxiosResponse = {
        headers: parseHeaders(requestObj.getAllResponseHeaders()),
        data: transformResponse(
          responseType !== 'text' ? requestObj.response : requestObj.responseText
        ),
        status: requestObj.status,
        statusText: requestObj.statusText,
        config,
        request: requestObj
      }
      responseProcess(response)
    }

    // 异常处理
    requestObj.onerror = () => {
      reject(new Error('net work error'))
    }

    // 接收超时时间
    requestObj.ontimeout = () => {
      reject(new Error('timeout'))
    }

    // 进度事件的绑定
    onDownloadProgress && (requestObj.onprogress = onDownloadProgress)
    onUploadProgress && (requestObj.upload.onprogress = onUploadProgress)

    // 对返回数据加上异常处理
    function responseProcess(response: AxiosResponse): void {
      const { status } = response
      if (status >= 200 && status < 300) {
        resolve(response)
      } else {
        reject(
          createAxiosErrorcs(true, config, '异常', '状态码异常', status + '', requestObj, response)
        )
      }
    }

    requestObj.send(data)
  })
}

export default xhr
