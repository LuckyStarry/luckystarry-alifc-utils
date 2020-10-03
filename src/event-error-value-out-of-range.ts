import { EventError } from './event-error'

export class EventErrorValueOutOfRange extends EventError {
  public constructor(code?: string, message?: string) {
    super(code || '1002', message || '参数的值不在合法范围内')
  }
}
