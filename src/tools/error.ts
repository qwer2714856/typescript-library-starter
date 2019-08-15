import { AxiosRequestConfig, AxiosResponse, AxiosError as AxiosErrorType } from '../types'

export class AxiosErrors extends Error {
  isAxiosError?: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    // 这东西是解决typescript的一个坑，当继承一些内置对象的时候他的原型链子会变为继承对象所以通过这个在改回来。改为它自己。 如果没有这个instanceof 自己就是false
    Object.setPrototypeOf(this, AxiosErrors.prototype)
  }
}

export function factoryError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosErrorType {
  const AxiosError: AxiosErrorType = new AxiosErrors(message, config, code, request, response)

  return AxiosError
}
