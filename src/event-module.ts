import { EventHandler } from './event-handler'
import { Process } from './process'

export interface EventModule {
  register(process: Process): EventHandler
}
