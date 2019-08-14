/**
 * header 设置
 */
import { isObject } from './utils'

// 过滤掉Content-Type大小写不统一的问题。
function normalHeadersName(headers: any, normalName: string = 'Content-Type') {
  if (headers) {
    Object.keys(headers).forEach(key => {
      if (normalName !== key && normalName.toLocaleUpperCase() === key.toLocaleUpperCase()) {
        headers[normalName] = headers[key]
        delete headers[key]
      }
    })
  }
}

export function processHeaders(headers: any = {}, data: any): any {
  // 过滤一层
  normalHeadersName(headers)

  // 是否是普通对象如果发送的数据是普通对象就转换
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;chartset=utf-8'
    }
  }

  return headers
}

export function parseHeader(headers: string): any {
  let obj = Object.create(null)
  if (!headers) {
    return
  } else {
    headers.split('/r/n').forEach(v => {
      let [key, val] = v.split(':')
      if (!key) {
        return
      }
      obj[key.trim().toLocaleLowerCase()] = val ? val.trim() : val
    })
  }
  return obj
}
