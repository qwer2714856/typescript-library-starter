import { CancelToken, CancelExe, CancelTokenSource, Canceler } from '../types'

interface ResolvePromise {
  (reason: string): void
}

/**
 * cancelToken 实例
 */
export default class CancelTK implements CancelToken {
  throwIfRequest(): void {
    if (this.reason) {
      throw new Error('重复token')
    }
  }
  promise: Promise<string>
  reason?: string

  constructor(exe: CancelExe) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise((resolve, reject) => {
      resolvePromise = resolve
    })

    exe(message => {
      if (!this.reason) {
        this.reason = message
        resolvePromise(this.reason!)
      }
    })
  }
  static source(): CancelTokenSource {
    let cancel: Canceler
    let token = new CancelTK((c: Canceler) => {
      cancel = c
    })

    return {
      token,
      cancel: cancel!
    }
  }
}
