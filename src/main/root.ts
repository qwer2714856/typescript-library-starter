import { AxiosConfig, MainAxios } from './../types/index'
import { xhr } from '../core/xhr'
/**
 * 对外输出库的主入口
 */
const mainAxios: MainAxios = (config: AxiosConfig) => {
  xhr(config)
}

export default mainAxios
