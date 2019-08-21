import { AxiosResponse, ResolveFn, RejectFn } from './../types/index'
import { Axios, AxiosRequestConfig, AxiosPromise } from '../types'

import { axios } from '../axios'
import Interceptor from './interceptor'
import defaults from '../default'
import mergeConfig from './mergeconfig'

export interface Interceptors {
  request: Interceptor<AxiosRequestConfig>
  response: Interceptor<AxiosResponse>
}

interface PromiseChain<T = any> {
  resolve: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  reject?: RejectFn<T>
}

export default class Ax implements Axios {
  // 默认配置
  defaults: AxiosRequestConfig
  // 拦截器
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new Interceptor<AxiosRequestConfig>(),
      response: new Interceptor<AxiosResponse>()
    }
    this.defaults = initConfig
  }
  //   request(config: AxiosRequestConfig): AxiosPromise {
  //     return axios(config)
  //   }
  // 函数重载 直接用any做 上面的函数
  request(url: any, config?: any): AxiosPromise {
    let cfg = config || url || {}

    if ('string' === typeof url) {
      cfg.url = url
    }

    // 合并配置
    cfg = mergeConfig(this.defaults, cfg)

    // 链式调用拦截器
    const chain: PromiseChain<any>[] = [
      {
        resolve: axios,
        reject: undefined
      }
    ]

    this.interceptors.request.forEach(i => {
      chain.unshift(i)
    })

    this.interceptors.response.forEach(j => {
      chain.push(j)
    })

    const promise = Promise.resolve(cfg)
    while (chain.length) {
      const { resolve, reject } = chain.shift()!
      promise.then(resolve, reject)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig | undefined): AxiosPromise {
    return axios({
      ...(config || {}),
      url,
      method: 'get'
    })
  }
  post(url: string, data?: any, config?: AxiosRequestConfig | undefined): AxiosPromise {
    return axios({
      ...(config || {}),
      url,
      data,
      method: 'get'
    })
  }
}
