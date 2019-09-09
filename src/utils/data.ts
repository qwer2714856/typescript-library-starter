import { isObject } from './index'

export function transformRequest(data: any): any {
  if (isObject(data)) {
    data = JSON.stringify(data)
  }

  return data
}

export function transformResponse() {
  // TODO
}
