import { DefaultEventContext } from './default-event-context'
import { EventContextFactory } from './event-context-factory'

export class DefaultEventContextFactory implements EventContextFactory {
  public createContext(event: any, context: any): DefaultEventContext {
    return new DefaultEventContext(event, context)
  }
}
