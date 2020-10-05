/* tslint:disable */
import { expect } from 'chai'
import { EventContextFactoryDefault } from '../src/event-context-factory-default'
import { EventHandlerDefault } from '../src/event-handler-default'
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

  it('EventModuleDefault.register 正常', function () {
    expect(new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).register(async (ctx, utils) => utils.ok())).instanceof(EventHandlerDefault)
  })

  it('EventModuleDefault.router 正常', function () {
    expect(new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).router((ctx, utils) => async (ctx, utils) => utils.ok())).instanceof(
      EventHandlerDefault
    )
  })

  it('EventModuleDefault.router 正常 (正确执行)', async function () {
    const event = Buffer.from(JSON.stringify({}))
    let handler = new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).router((ctx, utils) => async (ctx, utils) => utils.ok(12345))
    let handled = false
    await handler.handle(event, {}, (e, p) => {
      expect(p.body.Entity).eq(12345)
      handled = true
    })
    expect(handled).is.true
  })

  it('EventModuleDefault.router 正常 (未匹配任何规则)', async function () {
    const event = Buffer.from(JSON.stringify({}))
    let handler = new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).router((ctx, utils) => null)
    let handled = false
    await handler.handle(event, {}, (e, p) => {
      handled = true
      expect(p.body.Code).eq('1100')
      expect(p.body.Message).eq('没有匹配的路由规则')
    })
    expect(handled).is.true
  })

  it('EventModuleDefault.routes 正常', function () {
    expect(
      new EventModuleDefault(new FakeContextFactory(), new FakeUtilsFactory()).routes([{ predicate: () => true, process: async (ctx, utils) => utils.ok() }])
    ).instanceof(EventHandlerDefault)
  })

  it('EventModuleDefault.routes 正常 (按顺序触发)', async function () {
    const event = Buffer.from(JSON.stringify({}))
    const context_factory = new FakeContextFactory()
    const utils_factory = new FakeUtilsFactory()
    {
      let handler = new EventModuleDefault(context_factory, utils_factory).routes([
        { predicate: () => true, process: async (ctx, utils) => utils.ok(1) },
        { predicate: () => false, process: async (ctx, utils) => utils.ok(10) },
        { predicate: () => true, process: async (ctx, utils) => utils.ok(100) },
        { predicate: () => true, process: async (ctx, utils) => utils.ok(1000) }
      ])
      let handled = false
      await handler.handle(event, {}, (e, p) => {
        expect(p.body.Entity).eq(1)
        handled = true
      })
      expect(handled).is.true
    }
    {
      let handler = new EventModuleDefault(context_factory, utils_factory).routes([
        { predicate: () => false, process: async (ctx, utils) => utils.ok(1) },
        { predicate: () => true, process: async (ctx, utils) => utils.ok(10) },
        { predicate: () => true, process: async (ctx, utils) => utils.ok(100) },
        { predicate: () => true, process: async (ctx, utils) => utils.ok(1000) }
      ])
      let handled = false
      await handler.handle(event, {}, (e, p) => {
        expect(p.body.Entity).eq(10)
        handled = true
      })
      expect(handled).is.true
    }
    {
      let handler = new EventModuleDefault(context_factory, utils_factory).routes([
        { predicate: () => false, process: async (ctx, utils) => utils.ok(1) },
        { predicate: () => false, process: async (ctx, utils) => utils.ok(10) },
        { predicate: () => false, process: async (ctx, utils) => utils.ok(100) },
        { predicate: () => true, process: async (ctx, utils) => utils.ok(1000) }
      ])
      let handled = false
      await handler.handle(event, {}, (e, p) => {
        expect(p.body.Entity).eq(1000)
        handled = true
      })
      expect(handled).is.true
    }
  })
})

class FakeContextFactory extends EventContextFactoryDefault {}
class FakeUtilsFactory extends EventUtilsFactoryDefault {}
