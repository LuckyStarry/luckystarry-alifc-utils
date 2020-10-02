import { EventContext } from './event-context'
import { EventUtilsDefault } from './event-utils-default'
import { EventUtilsFactory } from './event-utils-factory'

export class EventUtilsFactoryDefault implements EventUtilsFactory {
  public createUtils(context: EventContext): EventUtilsDefault {
    return new EventUtilsDefault(context)
  }
}
