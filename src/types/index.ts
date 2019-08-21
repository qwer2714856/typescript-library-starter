/**
 * @description 项目中公共的声明文件.
 */
export type Method = 'get' | 'post'

export interface AxiosRequestConfig {
  method: Method
  url?: string
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
  transformRequest?: AxiosTransForm | AxiosTransForm[]
  transformResponse?: AxiosTransForm | AxiosTransForm[]
}

// 使用泛型参数格式化返回参数 <T = any> 任意类型可传可不传
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError?: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 定义api的混合对象 描述类的公共方法
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManage<AxiosRequestConfig>
    response: AxiosInterceptorManage<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 函数重载
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

export interface AxiosInterceptorManage<T = any> {
  use(resolve: ResolveFn<T>, reject?: RejectFn<T>): number
  eject(id: number): void
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectFn<T = any> {
  (error: T): T | Promise<T>
}
export interface AxiosTransForm {
  (data: any, headers?: any): any
}
