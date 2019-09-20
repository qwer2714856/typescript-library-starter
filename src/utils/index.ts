/**
 * 工具
 */
export const isObject = (arg: any): boolean => {
  return 'Object' === getType(arg)
}

export const isArray = (arg: any): boolean => {
  return 'Array' === getType(arg)
}

export const isDate = (arg: any): arg is Date => {
  return 'Date' === getType(arg)
}

export const getType = (arg: any): string => {
  return Object.prototype.toString.call(arg).slice(8, -1)
}

// 拷贝 from 到 to
export function extend<T, U>(to: T, from: U): T & U {
  for (let i in from) {
    ;(to as T & U)[i] = from[i] as any
  }
  return to as T & U
}

export function isFormData(val: any): val is FormData {
  return void 0 !== val && val instanceof FormData
}

export function isUrlSearchParams(val: any): val is URLSearchParams {
  return val instanceof URLSearchParams
}
