import { EventHandler } from './event-handler'
import { EventProcess } from './event-process'
import { EventRoute } from './event-route'

export interface EventModule {
  register(process: EventProcess | EventRoute[]): EventHandler
}
