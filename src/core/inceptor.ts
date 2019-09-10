import { AxiosInceptor, ResolveFn, RejectFn } from './../types/index'

export interface Interceptor<T = any> {
  resolve: ResolveFn<T>
  reject?: RejectFn
}

export default class AxiosInceptorcs<T = any> implements AxiosInceptor {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolve: ResolveFn<T>, reject?: RejectFn): number {
    return this.interceptors.push({
      resolve,
      reject
    })
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(rs => {
      rs && fn(rs)
    })
  }

  eject(id: number): void {
    this.interceptors[id] && (this.interceptors[id] = null)
  }
}
