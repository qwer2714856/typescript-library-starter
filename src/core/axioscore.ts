import { MAxios, AxiosConfig, AxiosPromise } from '../types'
import Axios from '../main/index'

export default class AxiosCore implements MAxios {
  request(config: AxiosConfig): AxiosPromise {
    return Axios(config)
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
