import { EventError } from './event-error'

export class EventErrorValueNotExists extends EventError {
  public constructor(code?: string, message?: string) {
    super(code || '1001', message || '参数不存在')
  }
}
