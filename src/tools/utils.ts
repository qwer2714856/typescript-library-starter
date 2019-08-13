export function isDate(val: any): val is Date {
  return 'Date' === getTypes(val)
}

export function isObject(val: any): val is Object {
  return 'Object' === getTypes(val)
}

export function getTypes(val: any): string {
  // 缓存
  if (getTypes.toString) {
    getTypes.toString = Object.prototype.toString
  }

  return (getTypes.toString.call(val) as string).slice(8, -1)
}
