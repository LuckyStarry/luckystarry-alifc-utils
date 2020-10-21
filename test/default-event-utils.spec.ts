/* tslint:disable */
import { expect } from 'chai'
import { DefaultEventContext } from '../src/default-event-context'
import { DefaultEventUtils } from '../src/default-event-utils'

describe('./src/default-event-utils', function () {
  it('DefaultEventUtils 存在', function () {
    expect(DefaultEventUtils).not.null
    expect(DefaultEventUtils).not.undefined
    expect(typeof DefaultEventUtils).to.equal('function')
  })

  it('DefaultEventUtils 初始化正常', function () {
    expect(() => new DefaultEventUtils(new FakeContext())).not.throw()
  })

  it('DefaultEventUtils.wrapValue 正常 (get)', function () {
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(undefined).get()).is.undefined
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(null).get()).is.null
    expect(new DefaultEventUtils(new FakeContext()).wrapValue('').get()).is.eq('')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue('12345').get()).is.eq('12345')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(0).get()).is.eq(0)
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(12345).get()).is.eq(12345)
  })

  it('DefaultEventUtils.wrapValue 正常 (getOrDefault)', function () {
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(undefined).getOrDefault('aaa')).is.eq('aaa')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(null).getOrDefault('bbb')).is.eq(null)
    expect(new DefaultEventUtils(new FakeContext()).wrapValue('').getOrDefault('ccc')).is.eq('')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue('12345').getOrDefault('ddd')).is.eq('12345')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(0).getOrDefault(123)).is.eq(0)
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(12345).getOrDefault(456)).is.eq(12345)
  })

  it('DefaultEventUtils.wrapValue 正常 (getOrThrow)', function () {
    expect(() => new DefaultEventUtils(new FakeContext()).wrapValue(undefined).getOrThrow()).is.throw()
    expect(() => new DefaultEventUtils(new FakeContext()).wrapValue(undefined).getOrThrow('测试消息')).is.throw('测试消息')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(null).getOrThrow()).is.null
    expect(new DefaultEventUtils(new FakeContext()).wrapValue('').getOrThrow()).is.eq('')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue('12345').getOrThrow()).is.eq('12345')
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(0).getOrThrow()).is.eq(0)
    expect(new DefaultEventUtils(new FakeContext()).wrapValue(12345).getOrThrow()).is.eq(12345)
  })

  it('DefaultEventUtils.wrapValueAsNumber 正常 (get)', function () {
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsNumber(undefined).get()).is.undefined
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsNumber(null).get()).is.null
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsNumber('').get()).is.undefined
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsNumber('12345').get()).is.eq(12345)
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsNumber(0).get()).is.eq(0)
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsNumber(12345).get()).is.eq(12345)
  })

  it('DefaultEventUtils.wrapValueAsString 正常 (get)', function () {
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsString(undefined).get()).is.undefined
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsString(null).get()).is.null
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsString('').get()).is.eq('')
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsString('12345').get()).is.eq('12345')
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsString(0).get()).is.eq('0')
    expect(new DefaultEventUtils(new FakeContext()).wrapValueAsString(12345).get()).is.eq('12345')
  })
})

class FakeContext extends DefaultEventContext {
  public constructor(event?, context?) {
    super(event || {}, context || {})
  }
}
