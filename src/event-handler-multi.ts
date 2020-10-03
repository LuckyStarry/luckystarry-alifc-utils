import { EventContextFactory } from './event-context-factory'
import { EventHandlerDefault } from './event-handler-default'
import { EventRoute } from './event-route'
import { EventUtilsFactory } from './event-utils-factory'

export class EventHandlerMulti extends EventHandlerDefault {
  public constructor(routes: EventRoute[], contextFactory: EventContextFactory, utilsFactory: EventUtilsFactory) {
    super(
      async (context, utils) => {
        for (let route of routes) {
          if (route.predicate(context, utils)) {
            return await route.process(context, utils)
          }
        }
        throw new Error('没有匹配的路由规则')
      },
      contextFactory,
      utilsFactory
    )
  }
}
