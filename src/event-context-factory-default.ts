import { EventContextDefault } from './event-context-default'
import { EventContextFactory } from './event-context-factory'

export class EventContextFactoryDefault implements EventContextFactory {
  public createContext(event: any, context: any): EventContextDefault {
    return new EventContextDefault(event, context)
  }
}
