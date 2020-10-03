import { EventError } from './event-error'

export class EventErrorValueNotExists extends EventError {
  public constructor(message?: string, code?: string) {
    super(code || EventErrorValueNotExists.DEFAULT_CODE, message || '参数不存在')
  }

  public static get DEFAULT_CODE(): string {
    return '1001'
  }
}
