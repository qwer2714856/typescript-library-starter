import { isObject, isDate } from './types'

/**
 * url 处理
 */

export interface SF {
  default(key: string, val: any): string
  Object(key: string, val: any): string
  Date(key: string, val: any): string
  Array(key: string, val: any): string
  [propName: string]: any
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
    .replace(/%7B/gi, '{')
    .replace(/%7D/gi, '}')
    .replace(/%22/gi, '"')
}

const strategyFunc: SF = {
  default: function(key: string, val: any): string {
    let rs = `${encode(key)}=${encode(val)}`

    return rs
  },
  Object: function(key: string, val: any): string {
    let rs = `${encode(key)}=${encode(JSON.stringify(val))}`

    return rs
  },
  Date: function(key: string, val: any): string {
    let rs = `${key}=${val.toISOString()}`

    return rs
  },
  Array: function(key: string, val: any): string {
    let rs = ''

    for (let i in val) {
      rs += `${key}[]=${val[i]}&`
    }

    rs && (rs = rs.substring(0, rs.length - 1))

    return rs
  }
}

function strategy(key: string, val: any): string {
  let fmtStr = ''

  // 获取策略
  let strategyKey = 'default'
  // 分析值改使用什么策略
  isObject(val) && (strategyKey = 'Object')
  isDate(val) && (strategyKey = 'Date')
  Array.isArray(val) && (strategyKey = 'Array')

  fmtStr = strategyFunc[strategyKey](key, val)

  return fmtStr
}

// 格式化url 删除乱码七糟的东西#
function clearUrl(url: string): string {
  const lstj = url.lastIndexOf('#')

  if (lstj > -1) {
    url = url.substring(0, lstj)
  }

  const urls = url.split('?')

  if (urls.length > 1) {
    !['?', '&'].includes(url[url.length - 1]) && (url += '&')
  } else {
    !['?', '&'].includes(url[url.length - 1]) && (url += '?')
  }

  return url
}

// 返回params 和 Url 处理后的url
export function fmtUrl(params: any, url: string): string {
  try {
    if (!params || !url) {
      throw new Error('not arg')
    }

    // param 每段经过策略模式处理后的值放在此处
    let urlArg: string[] = []

    for (let i in params) {
      urlArg.push(strategy(i, params[i]))
    }

    // 处理url
    return clearUrl(url) + urlArg.join('&')
  } catch (e) {
    return url ? url : ''
  }
}
