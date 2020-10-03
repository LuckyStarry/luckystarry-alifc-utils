import { EventHandler } from './event-handler'
import { EventRoute } from './event-route'
import { Process } from './process'

export interface EventModule {
  register(process: Process | EventRoute[]): EventHandler
}
