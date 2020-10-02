import { EventContext } from './event-context'
import { EventResult } from './event-result'
import { EventUtils } from './event-utils'

export interface Process {
  (context: EventContext, utils: EventUtils): Promise<EventResult>
}
