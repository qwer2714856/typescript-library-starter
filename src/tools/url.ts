/**
 * 工具
 */

import { isDate, isObject, isUrlSearchParams } from './utils'

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

export function fmtUrl(
  baseUrl: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  const rt: string[] = []

  if (!params) {
    return baseUrl
  }
  let join: string
  if (paramsSerializer) {
    join = paramsSerializer(params)
  } else if (isUrlSearchParams(params)) {
    join = params.toString()
  } else {
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
    join = rt.join('&')
  }
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

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isObject(val)) {
          if (isObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
const urlParseUrl = document.createElement('a')
const currentOriginUrl = resolveUrl(window.location.href)
function resolveUrl(url: string): any {
  urlParseUrl.setAttribute('href', url)
  const { protocol, host, port } = urlParseUrl
  return {
    protocol,
    host,
    port
  }
}
export function isSomeOrigin(requestUrl: string): boolean {
  // 判断是否同源 通过协议 host
  // 采用一个技巧创建一个a标签，解析出protocol host
  const parseOrigin = resolveUrl(requestUrl)
  let rt: boolean = true
  for (let i in parseOrigin) {
    if (currentOriginUrl[i] !== parseOrigin[i]) {
      rt = false
      break
    }
  }

  return rt
}

export function isAbUrl(url: string): boolean {
  return /(^[a-z][a-z\d+\-\.]*:)?\/\//i.test(url)
}
export function combineUrl(surl: string, toUrl?: string): string {
  return toUrl ? surl.replace(/\/+$/, '') + '/' + toUrl.replace(/^\/+/, '') : surl
}
