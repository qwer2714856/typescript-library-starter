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
