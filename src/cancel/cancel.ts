import { Cancel as CancelIfc } from './../types/index'
export default class Cancel implements CancelIfc {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

export const isCancel = (value: any): boolean => {
  return value instanceof Cancel
}
