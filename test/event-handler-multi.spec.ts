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

  it('EventHandlerMulti 路由选择器按照正确的顺序触发', async function () {
    let multi = new EventHandlerMulti(
      [
        {
          predicate: () => false,
          process: async (ctx, utils) => utils.ok(1)
        },
        {
          predicate: () => false,
          process: async (ctx, utils) => utils.ok(10)
        },
        {
          predicate: () => true,
          process: async (ctx, utils) => utils.ok(100)
        },
        {
          predicate: () => false,
          process: async (ctx, utils) => utils.ok(1000)
        }
      ],
      new FakeContextFactory(),
      new FakeUtilsFactory()
    )
    let handled = false
    await multi.handle({}, {}, function (e, p) {
      expect(p.body.Entity).eq(100)
      handled = true
    })
    expect(handled).is.true
  })

  it('EventHandlerMulti 路由选择器按照正确的顺序触发', async function () {
    let multi = new EventHandlerMulti(
      [
        {
          predicate: () => false,
          process: async (ctx, utils) => utils.ok(1)
        },
        {
          predicate: () => true,
          process: async (ctx, utils) => utils.ok(10)
        },
        {
          predicate: () => false,
          process: async (ctx, utils) => utils.ok(100)
        },
        {
          predicate: () => true,
          process: async (ctx, utils) => utils.ok(1000)
        }
      ],
      new FakeContextFactory(),
      new FakeUtilsFactory()
    )
    let handled = false
    await multi.handle({}, {}, function (e, p) {
      expect(p.body.Entity).eq(10)
      handled = true
    })
    expect(handled).is.true
  })
})

class FakeContextFactory extends EventContextFactoryDefault {}
class FakeUtilsFactory extends EventUtilsFactoryDefault {}
