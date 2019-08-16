import { Axios, AxiosRequestConfig, AxiosPromise } from '../types'

import { axios } from '../axios'

export default class Ax implements Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return axios(config)
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
