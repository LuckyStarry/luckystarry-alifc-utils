import { EventError } from './event-error'

export class EventErrorRouteNotFound extends EventError {
  public constructor(message?: string, code?: string) {
    super(code || EventErrorRouteNotFound.DEFAULT_CODE, message || '没有匹配的路由规则')
  }

  public static get DEFAULT_CODE(): string {
    return '1100'
  }
}
