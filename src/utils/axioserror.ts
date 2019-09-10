import { AxiosError, AxiosConfig, AxiosResponse } from '../types/index'
export class AxiosErrorcs extends Error implements AxiosError {
  isAxiosError: boolean
  config: AxiosConfig
  code?: string | null | undefined
  request?: any
  response?: AxiosResponse | undefined
  name: string
  message: string
  // stack?: string | undefined;

  constructor(
    isAxiosError: boolean,
    config: AxiosConfig,
    name: string = '',
    message: string = '',
    code?: string | null | undefined,
    request?: any,
    response?: AxiosResponse | undefined,
    stack?: string | undefined
  ) {
    super(message)
    this.isAxiosError = isAxiosError
    this.config = config
    this.name = name
    this.message = message
    this.code = code
    this.request = request
    this.response = response
    // this.stack = stack;

    // 为什么加这个东西？因为ts有个坑当你继承了内置类当前类的proptype就会改变指向
    Object.setPrototypeOf(this, AxiosErrorcs.prototype)
  }
}

export function createAxiosErrorcs(
  isAxiosError: boolean,
  config: AxiosConfig,
  name: string = '',
  message: string = '',
  code?: string | null | undefined,
  request?: any,
  response?: AxiosResponse | undefined,
  stack?: string | undefined
): AxiosErrorcs {
  return new AxiosErrorcs(isAxiosError, config, name, message, code, request, response, stack)
}
