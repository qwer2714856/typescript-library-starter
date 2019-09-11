import { isObject } from './index'

export function transformRequest(data: any): any {
  if (isObject(data)) {
    data = JSON.stringify(data)
  }

  return data
}

export function transformResponse(data: any): any {
  let rt = data

  if (typeof data === 'string') {
    try {
      rt = JSON.parse(data)
    } catch (e) {
      // todo
    }
  }

  return rt
}

// 合并多个对象
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
