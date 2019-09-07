import { AxiosConfig } from '../types'
import xhr from '../core/xhr'

function Axios(config: AxiosConfig): void {
  // 主请求
  xhr(config)
}

export default Axios
