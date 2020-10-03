import { EventContextFactory } from './event-context-factory'
import { EventHandlerDefault } from './event-handler-default'
import { EventHandlerMulti } from './event-handler-multi'
import { EventModule } from './event-module'
import { EventRoute } from './event-route'
import { EventUtilsFactory } from './event-utils-factory'
import { Process } from './process'

export class EventModuleDefault implements EventModule {
  private _contextFactory: EventContextFactory
  private _utilsFactory: EventUtilsFactory
  public constructor(contextFactory: EventContextFactory, utilsFactory: EventUtilsFactory) {
    this._contextFactory = contextFactory
    this._utilsFactory = utilsFactory
  }

  public register(process: Process | EventRoute[]): EventHandlerDefault {
    if (process instanceof Array) {
      return new EventHandlerMulti(process, this._contextFactory, this._utilsFactory)
    } else {
      return new EventHandlerDefault(process, this._contextFactory, this._utilsFactory)
    }
  }
}
