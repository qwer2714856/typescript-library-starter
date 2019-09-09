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
