import { Cancel } from './../types/index'
export default class Cl implements Cancel {
  message?: string
  constructor(message: string) {
    this.message = message
  }
}

export function isCancel(val: any): boolean {
  return val instanceof Cl
}
