import { EventRoutePredicate } from './event-route-predicate'
import { Process } from './process'

export interface EventRoute {
  predicate: EventRoutePredicate
  process: Process
}
