import { Axios, AxiosRequestConfig, AxiosPromise } from '../types'

import { axios } from '../axios'

export default class Ax implements Axios {
  //   request(config: AxiosRequestConfig): AxiosPromise {
  //     return axios(config)
  //   }
  // 函数重载 直接用any做 上面的函数
  request(url: any, config?: any): AxiosPromise {
    const cfg = config || {}

    if ('string' === typeof url) {
      cfg.url = url
    }

    return axios(cfg)
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
