import { isObject } from './types'
/**
 * 处理发送数据
 */

export function transformRequestData(data: any): any {
  let rt = null

  if (isObject(data)) {
    rt = JSON.stringify(data)
  }

  return rt
}

// 解析data
export function transformData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // todo
    }
  }
  return data
}
