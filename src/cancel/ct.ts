import { CT, CR, CRT, CancelTokenSource } from './../types/index'
import Cancel from '../cancel/cancel'
interface ResolvePromise {
  (rs: Cancel): void
}
export default class Ct implements CT {
  throwIfRequestd(): void {
    if (this.rs) {
      throw new Error(this.rs.message)
    }
  }
  promise: Promise<Cancel>
  rs?: Cancel
  constructor(cr: CRT) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(reslove => {
      resolvePromise = reslove
    })

    cr(msg => {
      if (!this.rs) {
        this.rs = new Cancel(msg)
        resolvePromise(this.rs)
      }
    })
  }
  static source(): CancelTokenSource {
    let cancels!: CR
    const token = new Ct(c => {
      cancels = c
    })
    return {
      token,
      cancel: cancels
    }
  }
}
