import { DefaultEventUtils } from './default-event-utils'
import { EventContext } from './event-context'
import { EventUtilsFactory } from './event-utils-factory'

export class DefaultEventUtilsFactory implements EventUtilsFactory {
  public createUtils(context: EventContext): DefaultEventUtils {
    return new DefaultEventUtils(context)
  }
}
