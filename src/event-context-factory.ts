import { EventContext } from './event-context'

export interface EventContextFactory {
  createContext(event: any, context: any): EventContext
}
