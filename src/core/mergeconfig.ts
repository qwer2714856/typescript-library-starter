import { AxiosConfig } from '../types'
import { isObject } from '../utils'
import { deepMerge } from '../utils/data'

// 策略工厂
const clGroups = Object.create(null)
const statKeyFromVal2 = ['url', 'params', 'data']
statKeyFromVal2.forEach(i => {
  clGroups[i] = fromVTStat
})
const deepKeyMg = ['headers', 'auth']
deepKeyMg.forEach(i => {
  clGroups[i] = deepMergeStat
})

export default function mergConfig(config1: AxiosConfig, config2?: AxiosConfig): AxiosConfig {
  config2 = config2 || {}
  const res = Object.create(null)

  // 策略模式针对不同的内容走不同的策略。
  const keys: any[] = [...Array.from(new Set([...Object.keys(config1), ...Object.keys(config2)]))]

  keys.forEach(i => {
    cl(i)
  })

  // 内部函数做策略的分发
  function cl(name: string): void {
    // 选出策略
    const stat = clGroups[name] || defaultStat

    res[name] = stat(config1[name], config2![name])
  }

  return res
}

// 策略策略函数
function defaultStat(v1: any, v2: any): any {
  return undefined !== typeof v2 ? v2 : v1
}
// 策略2
function fromVTStat(v1: any, v2: any): any {
  return v2
}
// 复杂对象的合并策略
function deepMergeStat(v1: any, v2: any): any {
  if (isObject(v2)) {
    return deepMerge(v1, v2)
  } else if (typeof v2 !== 'undefined') {
    return v2
  } else if (isObject(v1)) {
    return deepMerge(v1)
  } else if (typeof v1 !== 'undefined') {
    return v1
  }
}
