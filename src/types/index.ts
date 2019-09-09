/**
 * 类型声明
 */

export type RequestType = 'GET' | 'get' | 'post' | 'POST'
export interface AxiosConfig {
  url: string
  method?: RequestType
  params?: any
  data?: any
  headers?: any
}
