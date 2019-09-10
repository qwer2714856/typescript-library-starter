import { AxiosInstance, AxiosConfig } from '../types'
import AxiosCore from '../core/axioscore'
import { extend } from '../utils'

// 对外的唯一出口
function createInstanceAxios(): AxiosInstance {
  const Axios = new AxiosCore()
  const Instance = AxiosCore.prototype.request.bind(Axios)
  // 拷贝属性
  extend(Instance, Axios)
  return Instance as AxiosInstance
}

export default createInstanceAxios()
