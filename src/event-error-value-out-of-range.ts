import { EventError } from './event-error'

export class EventErrorValueOutOfRange extends EventError {
  public constructor(message?: string, code?: string) {
    super(code || EventErrorValueOutOfRange.DEFAULT_CODE, message || '参数的值不在合法范围内')
  }

  public static get DEFAULT_CODE(): string {
    return '1002'
  }
}
