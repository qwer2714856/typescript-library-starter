/**
 * @description 项目中公共的声明文件.
 */
export type Method = 'get' | 'post'

export interface AxiosRequestConfig {
  url: string
  method: Method
  data?: any
  params?: any,
  headers?:any,
}
