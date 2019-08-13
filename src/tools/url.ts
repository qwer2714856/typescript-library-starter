/**
 * 工具
 */

import { isDate, isObject } from './utils'

export function encode(val: string): string {
  let rt = ''

  rt = encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')

  return rt
}

export function fmtUrl(baseUrl: string, params?: any): string {
  const rt: string[] = []

  if (!params) {
    return baseUrl
  }

  Object.keys(params).forEach(key => {
    // 根据值判断类型
    const d = params[key]

    // 如果是null 或者 undefined 直接不传
    if (null === d || void 0 === typeof d) {
      return
    }

    // 如果值是数据直接用数组，不是数组就规范为一个数组
    let ay: any[] = []
    key += '[]'
    if (Array.isArray(d)) {
      ay = d
    } else {
      ay = [d]
    }

    ay.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isObject(v)) {
        v = JSON.stringify(v)
      }

      rt.push(`${encode(key)}=${v}`)
    })
  })

  // 把数组键值对拆出来变@
  const join = rt.join('&')

  if (join) {
    const hash = baseUrl.lastIndexOf('#')
    if (-1 !== hash) {
      baseUrl = baseUrl.substring(0, hash)
    }

    let fh = ''
    baseUrl.indexOf('?') > -1 ? (fh = '&') : (fh = '?')

    baseUrl += fh + join
  }

  return baseUrl
}
