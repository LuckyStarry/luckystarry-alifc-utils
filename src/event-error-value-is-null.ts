import { EventError } from './event-error'

export class EventErrorValueIsNull extends EventError {
  public constructor(message?: string, code?: string) {
    super(code || EventErrorValueIsNull.DEFAULT_CODE, message || '参数不可为 NULL')
  }

  public static get DEFAULT_CODE(): string {
    return '1003'
  }
}
