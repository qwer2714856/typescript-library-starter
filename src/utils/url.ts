import { isArray, isObject, isDate, isUrlSearchParams } from './index'

export const buildUrl = (url: string, params?: any, sr?: (ps: any) => string): string => {
  let result: string[] = []
  let resultUrl = url

  if (!params) {
    return url
  } else {
    if (sr) {
      result = [sr(params)]
    } else {
      if (isUrlSearchParams(params)) {
        result = [params.toString()]
      } else {
        Object.keys(params).forEach(key => {
          const V: any = params[key]

          if (void 0 === V || null === V) {
            return
          }

          let ay: any[] = []

          if (isArray(V)) {
            ay = V
            key += '[]'
          } else {
            ay = [V]
          }

          ay.forEach(v => {
            if (isObject(v)) {
              v = JSON.stringify(v)
            } else if (isDate(v)) {
              v = v.toISOString()
            }
            // 这里如果加上对日期的判断，不能用返回boolean 只能用 xxx is Date 类型谓词保护。
            // 详情移步到utils isDate实现使用了这种断言{//在花括号里面编辑器能推断出类型}
            result.push(`${encode(key)}=${encode(v)}`)
          })
        })
      }
    }
  }

  if (result.length) {
    // 如果有#干掉
    const lst = resultUrl.lastIndexOf('#')
    ;-1 !== lst && (resultUrl = resultUrl.substring(0, lst))

    const fn = resultUrl.indexOf('?') > -1 ? '&' : '?'
    resultUrl += fn + result.join('&')
  }

  return resultUrl
}

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

const a = document.createElement('a')
const currentUrl = crtA(window.location.href)
// 判断同域名请求还是异域请求
export function crtA(url: string): any {
  a.setAttribute('href', url)
  const { protocol, host } = a

  return {
    protocol,
    host
  }
}

export function isUrlSameOrigin(requestUrl: string): boolean {
  const { protocol, host } = crtA(requestUrl)

  return currentUrl.protocol === protocol && currentUrl.host === host
}
