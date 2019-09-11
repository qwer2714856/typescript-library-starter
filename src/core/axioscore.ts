import { MAxios, AxiosConfig, AxiosPromise, AxiosResponse } from '../types'
import Axios from '../main/index'
import AxiosInceptorcs from './inceptor'
import mergConfig from './mergeconfig'

export interface Interceptors {
  request: AxiosInceptorcs<AxiosConfig>
  response: AxiosInceptorcs<AxiosResponse>
}

export default class AxiosCore implements MAxios {
  defaults: AxiosConfig
  interceptors: Interceptors
  constructor(df: AxiosConfig) {
    this.interceptors = {
      request: new AxiosInceptorcs<AxiosConfig>(),
      response: new AxiosInceptorcs<AxiosResponse>()
    }
    this.defaults = df
  }
  request(url: any, config?: any): AxiosPromise {
    // 函数重载
    if ('string' === typeof url) {
      config = config || { method: 'GET' }
      config.url = url
    } else {
      config = { ...url, ...config }
    }

    // 合并配置文件
    const mgConfig: any = mergConfig(this.defaults, config)
    // 由于配置文件是由 commmon get post 组成 所以这里要做一次构建
    const cfg: AxiosConfig = {
      ...mgConfig.headers.common,
      ...mgConfig.headers[config.method.toLowerCase()]
    }
    config.headers = cfg

    // 实现链式调用
    const chain: any[] = [
      {
        resolve: Axios,
        reject: undefined
      }
    ]

    this.interceptors.request.forEach(v => {
      chain.unshift(v)
    })

    this.interceptors.response.forEach(v => {
      chain.push(v)
    })

    // 循环调用链
    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolve, reject } = chain.shift()
      promise = promise.then(resolve, reject)
    }

    return promise
  }
  get(url: string, config?: AxiosConfig | undefined): AxiosPromise {
    return this.request({
      url,
      method: 'GET',
      ...(config || {})
    })
  }
  post(url: string, data?: any, config?: AxiosConfig | undefined): AxiosPromise {
    return this.request({
      url,
      method: 'POST',
      ...(data || {}),
      ...(config || {})
    })
  }
}

// 实现混合将类和方法混合
