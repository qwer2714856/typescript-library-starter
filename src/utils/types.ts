/**
 * 类型的基础校验
 */
export function getTypes(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function isObject(val: any): boolean {
  return 'Object' === getTypes(val)
}

export function isDate(val: any): boolean {
  return 'Date' === getTypes(val)
}
