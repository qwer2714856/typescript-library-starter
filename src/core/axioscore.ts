import { MAxios, AxiosConfig, AxiosPromise, AxiosResponse } from '../types'
import Axios from '../main/index'
import AxiosInceptorcs from './inceptor'

export interface Interceptors {
  request: AxiosInceptorcs<AxiosConfig>
  response: AxiosInceptorcs<AxiosResponse>
}

export default class AxiosCore implements MAxios {
  interceptors: Interceptors
  constructor() {
    this.interceptors = {
      request: new AxiosInceptorcs<AxiosConfig>(),
      response: new AxiosInceptorcs<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosPromise {
    // 函数重载
    if ('string' === typeof url) {
      config = config || { method: 'GET' }
      config.url = url
    } else {
      config = { ...url, ...config }
    }

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
