import { Interceptors } from '../core/axioscore'

/**
 * 类型声明
 */

export type RequestType = 'GET' | 'get' | 'post' | 'POST'
export interface AxiosConfig {
  url?: string
  method?: RequestType
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
  transformRequest?: Transform | Transform[]
  transformResponse?: Transform | Transform[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (e: ProgressEvent) => void
  onDownloadProgress?: (e: ProgressEvent) => void
  auth?: Auth
  vd?: (val: number) => boolean
  // 自定义解析规则
  pmSr?: (pms: any) => string
  // base url
  baseUrl?: string
}

// 数据返回格式
export interface AxiosResponse<T = any> {
  data: T // 数据
  status: number // 状态码
  statusText: string // 状态描述
  headers: any // 响应头
  config: AxiosConfig // 请求配置
  request: any // 请求实例
}

// Axios 返回对象 promise resolve 返回的就是Promise<T> 的 T
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 错误接口
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// 描述主入口的接口
export interface MAxios {
  interceptors: Interceptors

  defaults: AxiosConfig

  request<T = any>(config: AxiosConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosConfig): AxiosPromise<T>

  getUri(config?: AxiosConfig): string
}
// 描述主入口的混合类型接口
export interface AxiosInstance extends MAxios {
  <T = any>(config: AxiosConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosConfig): AxiosPromise<T>
}

// 为axios提供静态创建方法
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosConfig): AxiosInstance

  cancelToken: CancelTokenStatic

  cancel: CancelStatic

  isCancel: (val: any) => boolean

  all<T = any>(promise: Array<T | Promise<T>>): Promise<T[]>

  spread<T = any, R = any>(callback: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic
}

export interface AxiosClassStatic {
  new (config: AxiosConfig): MAxios
}

// 定义拦截器
export interface AxiosInceptor<T = any> {
  // number 做为拦截器的id用来删除用
  use(resolve: ResolveFn<T>, reject?: RejectFn): number
  // 删除
  eject(id: number): void
}

export interface ResolveFn<T = any> {
  (val: T): T | Promise<T>
}
export interface RejectFn {
  (val: any): any
}
export interface Transform {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<string>
  reason?: string

  throwIfRequest(): void
}
export interface Canceler {
  (message?: string): void
}
export interface CancelExe {
  (canceler: Canceler): void
}
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}
// 类类型，对构造函数的定义和静态方法的定义。
export interface CancelTokenStatic {
  new (c: CancelExe): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}
export interface CancelStatic {
  new (c: string): Cancel
}

export interface Auth {
  username: string
  password: string
}
