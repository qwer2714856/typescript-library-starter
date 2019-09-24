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
}

// 描述主函数
export interface MainAxios {
  (config: AxiosConfig): void
}
