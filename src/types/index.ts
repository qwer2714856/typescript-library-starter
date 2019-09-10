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
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// 数据返回格式
export interface AxiosResponse {
  data: any // 数据
  status: number // 状态码
  statusText: string // 状态描述
  headers: any // 响应头
  config: AxiosConfig // 请求配置
  request: any // 请求实例
}

// Axios 返回对象 promise resolve 返回的就是Promise<T> 的 T
export interface AxiosPromise<T = any> extends Promise<AxiosResponse> {}

// 错误接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}
