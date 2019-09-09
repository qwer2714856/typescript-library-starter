import { isArray, isObject } from './index'

export const buildUrl = (url: string, params?: any): string => {
  let result: string[] = []

  if (!params || !isObject(params)) {
    return url
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
        }

        result.push(`${encode(key)}=${v}`)
      })
    })
  }

  return result.join('&')
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
