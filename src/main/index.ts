import { AxiosConfig, AxiosPromise } from '../types'
import xhr from '../core/xhr'
import { buildUrl } from '../utils/url'
import { transformRequest } from '../utils/data'
import { processHeaders } from '../utils/headers'
import transform from '../core/transform'

function Axios(config: AxiosConfig): AxiosPromise {
  // 处理config
  processConfig(config)

  // 主请求
  return xhr(config)
}

function processConfig(config: AxiosConfig): void {
  // 处理params
  const { url, params, headers = {}, data } = config
  // 格式换params
  config.url = buildUrl(url!, params)
  // 处理header 加默认的content-type
  processHeaders(headers, data)
  // 处理data
  config.data = transformData(config)
  // 经过transform处理
  transform(config.data, config.headers, config.transformRequest)
}

function transformData(config: AxiosConfig): any {
  return transformRequest(config.data)
}

export default Axios
