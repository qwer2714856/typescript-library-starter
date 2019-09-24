/**
 * 对外的声明
 */

// 请求方法采用联合类型
export type MethodType = 'GET' | 'POST' | 'get' | 'post'

// 请求发送config
export interface AxiosConfig {
  url: string
  method: MethodType
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

// 描述主函数
export interface MainAxios {
  (config: AxiosConfig): AxiosPromise
}

// 描述数据返回
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosConfig
  request: XMLHttpRequest
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
