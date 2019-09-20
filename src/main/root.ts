import { AxiosInstance, AxiosConfig, AxiosStatic } from '../types'
import AxiosCore from '../core/axioscore'
import { extend } from '../utils'
import defaults from '../core/default'
import mergConfig from '../core/mergeconfig'
import CancelTK from '../cancel/cancelToken'
// 对外的唯一出口
function createInstanceAxios(config?: AxiosConfig): AxiosStatic {
  const Axios = new AxiosCore(mergConfig(defaults, config))
  const Instance = AxiosCore.prototype.request.bind(Axios)
  // 拷贝属性
  extend(Instance, Axios)
  return Instance as AxiosStatic
}

const axios = createInstanceAxios()

axios.create = config => {
  return createInstanceAxios(config)
}
axios.cancelToken = CancelTK

axios.all = function(promises) {
  return Promise.all(promises)
}
axios.spread = function(callback) {
  return function(arr) {
    return callback.apply(null, arr)
  }
}
axios.Axios = AxiosCore

export default axios
