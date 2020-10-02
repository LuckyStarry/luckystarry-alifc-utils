import { EventContextFactory } from './event-context-factory'
import { EventHandlerDefault } from './event-handler-default'
import { EventModule } from './event-module'
import { EventUtilsFactory } from './event-utils-factory'
import { Process } from './process'

export class EventModuleDefault implements EventModule {
  private _contextFactory: EventContextFactory
  private _utilsFactory: EventUtilsFactory
  public constructor(contextFactory: EventContextFactory, utilsFactory: EventUtilsFactory) {
    this._contextFactory = contextFactory
    this._utilsFactory = utilsFactory
  }

  public register(process: Process): EventHandlerDefault {
    return new EventHandlerDefault(process, this._contextFactory, this._utilsFactory)
  }
}
