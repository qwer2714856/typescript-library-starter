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
