import { ResolveFn, RejectFn, AxiosInterceptorManage } from './../types/index'
export interface Ictor<T = any> {
  resolve: ResolveFn<T>
  reject?: RejectFn<T>
}

export default class Interceptor<T = any> implements AxiosInterceptorManage {
  // 收集所有的拦截器
  private interceptors: Array<Ictor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolve: ResolveFn<T>, reject?: RejectFn<T>): number {
    this.interceptors.push({
      resolve,
      reject
    })

    return this.interceptors.length - 1
  }

  eject(id: number): void {
    this.interceptors[id] && (this.interceptors[id] = null)
  }

  forEach(fn: (ictor: Ictor<T>) => void): void {
    this.interceptors.forEach(item => {
      item && fn(item)
    })
  }
}
