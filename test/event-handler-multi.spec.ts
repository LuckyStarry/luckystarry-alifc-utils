/* tslint:disable */
import { expect } from 'chai'
import { EventContextFactoryDefault } from '../src/event-context-factory-default'
import { EventHandlerMulti } from '../src/event-handler-multi'
import { EventUtilsFactoryDefault } from '../src/event-utils-factory-default'

describe('./src/event-handler-multi', function () {
  it('EventHandlerMulti 存在', function () {
    expect(EventHandlerMulti).not.null
    expect(EventHandlerMulti).not.undefined
    expect(typeof EventHandlerMulti).to.equal('function')
  })

  it('EventHandlerMulti 初始化正常', function () {
    expect(
      () =>
        new EventHandlerMulti(
          [
            {
              predicate: () => true,
              process: async (ctx, utils) => utils.ok()
            }
          ],
          new FakeContextFactory(),
          new FakeUtilsFactory()
        )
    ).not.throw()
  })
})

class FakeContextFactory extends EventContextFactoryDefault {}
class FakeUtilsFactory extends EventUtilsFactoryDefault {}
