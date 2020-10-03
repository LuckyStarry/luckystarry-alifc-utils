/* tslint:disable */
import { expect } from 'chai'
import { EventContextFactoryDefault } from '../src/event-context-factory-default'
import { EventHandlerDefault } from '../src/event-handler-default'
import { EventHandlerMulti } from '../src/event-handler-multi'
import { EventModuleDefault } from '../src/event-module-default'
import { EventUtilsFactoryDefault } from '../src/event-utils-factory-default'

describe('./src/event-module-default', function () {
  it('EventModuleDefault 存在', function () {
    expect(EventModuleDefault).not.null
    expect(EventModuleDefault).not.undefined
    expect(typeof EventModuleDefault).to.equal('function')
  })

  it('EventModuleDefault 初始化正常', function () {
    expect(() => new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory())).not.throw()
  })

  it('EventModuleDefault.register 正常 (Process)', function () {
    expect(new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).register(async (ctx, utils) => utils.ok())).instanceof(EventHandlerDefault)
  })

  it('EventModuleDefault.register 正常 (EventRoute[])', function () {
    expect(
      new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).register([
        {
          predicate: () => true,
          process: async (ctx, utils) => utils.ok()
        }
      ])
    ).instanceof(EventHandlerMulti)
  })
})

class FakeContextFactory extends EventContextFactoryDefault {}
class FakeUtilsFactory extends EventUtilsFactoryDefault {}
