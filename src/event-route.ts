import { EventProcess } from './event-process'
import { EventRoutePredicate } from './event-route-predicate'

export interface EventRoute {
  predicate: EventRoutePredicate
  process: EventProcess
}
