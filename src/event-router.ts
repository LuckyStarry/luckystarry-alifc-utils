import { EventContext } from './event-context'
import { EventProcess } from './event-process'
import { EventUtils } from './event-utils'

export interface EventRouter {
  (context: EventContext, utils: EventUtils): EventProcess
}
