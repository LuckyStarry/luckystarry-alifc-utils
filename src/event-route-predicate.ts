import { EventContext } from './event-context'
import { EventUtils } from './event-utils'

export interface EventRoutePredicate {
  (context: EventContext, utils: EventUtils): boolean
}
