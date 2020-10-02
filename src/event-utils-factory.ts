import { EventContext } from './event-context'
import { EventUtils } from './event-utils'

export interface EventUtilsFactory {
  createUtils(context: EventContext): EventUtils
}
