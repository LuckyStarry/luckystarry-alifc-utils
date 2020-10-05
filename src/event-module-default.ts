import { EventContext } from './event-context'
import { EventContextFactory } from './event-context-factory'
import { EventErrorRouteNotFound } from './event-error-route-not-found'
import { EventHandlerDefault } from './event-handler-default'
import { EventModule } from './event-module'
import { EventProcess } from './event-process'
import { EventResult } from './event-result'
import { EventRoute } from './event-route'
import { EventRouter } from './event-router'
import { EventUtils } from './event-utils'
import { EventUtilsFactory } from './event-utils-factory'

export class EventModuleDefault implements EventModule {
  private _contextFactory: EventContextFactory
  private _utilsFactory: EventUtilsFactory
  public constructor(contextFactory: EventContextFactory, utilsFactory: EventUtilsFactory) {
    this._contextFactory = contextFactory
    this._utilsFactory = utilsFactory
  }

  public register(process: EventProcess): EventHandlerDefault {
    return new EventHandlerDefault(process, this._contextFactory, this._utilsFactory)
  }

  public wrap(process: (context: EventContext, utils: EventUtils) => Promise<EventResult>): EventProcess {
    return process
  }

  public router(mapping: EventRouter): EventHandlerDefault {
    return this.register(async (c, u) => {
      let p = mapping(c, u)
      if (p) {
        return await p(c, u)
      }
      throw new EventErrorRouteNotFound()
    })
  }

  public routes(configs: EventRoute[]): EventHandlerDefault {
    return this.router((c, u) => {
      for (let route of configs) {
        if (route.predicate(c, u)) {
          return route.process
        }
      }
    })
  }
}
