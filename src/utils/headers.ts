import { isObject } from './index'

// 处理前如果有 Content-Type 删掉
function normalS(headers: any, name: string): void {
  if (headers) {
    Object.keys(headers).forEach(i => {
      if (i !== name && i.toUpperCase() === name.toUpperCase()) {
        headers[name] = headers[i]
        delete headers[i]
      }
    })
  }
}

export function processHeaders(headers: any, data: any): any {
  normalS(headers, 'Content-Type')
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json; charset=utf-8'
    }
  }
}
