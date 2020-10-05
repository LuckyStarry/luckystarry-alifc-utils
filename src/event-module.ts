import { EventHandler } from './event-handler'
import { EventProcess } from './event-process'
import { EventRoute } from './event-route'
import { EventRouter } from './event-router'

export interface EventModule {
  register(process: EventProcess): EventHandler
  router(mapping: EventRouter): EventHandler
  routes(configs: EventRoute[]): EventHandler
}
