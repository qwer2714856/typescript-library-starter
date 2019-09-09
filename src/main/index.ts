import { AxiosConfig } from '../types'
import xhr from '../core/xhr'
import { buildUrl } from '../utils/url'
import { transformRequest } from '../utils/data'
import { processHeaders } from '../utils/headers'

function Axios(config: AxiosConfig): void {
  // 处理config
  processConfig(config)

  // 主请求
  xhr(config)
}

function processConfig(config: AxiosConfig): void {
  // 处理params
  const { url, params, headers, data } = config
  // 格式换params
  config.url = buildUrl(url, params)

  // 处理data
  config.data = transformData(config)

  // 处理header 加默认的content-type
  processHeaders(headers, data)
}

function transformData(config: AxiosConfig): any {
  return transformRequest(config.data)
}

export default Axios
