/**
 * 处理body数据
 */
import { isObject } from './utils'

export function transformRequest(data: any): any {
  return isObject(data) ? JSON.stringify(data) : data
}

export function transformResponse(data: any): any {
  if ('string' === typeof data) {
    try {
      data = JSON.parse(data)
    } catch (e) {
      //
    }
  }

  return data
}
