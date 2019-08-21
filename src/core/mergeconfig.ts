import { AxiosRequestConfig } from './../types/index'
import defaults from '../default'
import { isObject } from 'util'
import { deepMerge } from '../tools/url'

const stat = Object.create(null)
const statKeyFromVal2 = ['url', 'params', 'data']
statKeyFromVal2.forEach(i => {
  stat[i] = fromVTStat
})
const deepKeyMg = ['headers']
deepKeyMg.forEach(i => {
  stat[i] = deepMergeStat
})

interface DefaultObj {
  [propName: string]: any
}

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) {
  const config = Object.create(null)
  const df: DefaultObj = {}

  const cfg2 = config2 || df
  // 根据不同的对象进行不同的合并策略
  for (let i in cfg2) {
    mergeField(i)
  }

  for (let j in config1) {
    if (!cfg2[j]) {
      mergeField(j)
    }
  }

  // 策略分发
  function mergeField(key: string): void {
    const st = stat[key] || defaultStat
    config[key] = st(config1[key], config2![key])
  }

  return config
}
// 策略1
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
