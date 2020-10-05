/* tslint:disable */
import { expect } from 'chai'
import { EventContextDefault } from '../src/event-context-default'
import { EventUtilsDefault } from '../src/event-utils-default'

describe('./src/event-utils-default', function () {
  it('EventUtilsDefault 存在', function () {
    expect(EventUtilsDefault).not.null
    expect(EventUtilsDefault).not.undefined
    expect(typeof EventUtilsDefault).to.equal('function')
  })

  it('EventUtilsDefault 初始化正常', function () {
    expect(() => new EventUtilsDefault(new FakeContext())).not.throw()
  })

  it('EventUtilsDefault.ensureValueExists 正常 (get)', function () {
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(undefined).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(null).get()).is.null
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists('').get()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists('12345').get()).is.eq('12345')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(0).get()).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(12345).get()).is.eq(12345)
  })

  it('EventUtilsDefault.ensureValueExists 正常 (getOrDefault)', function () {
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(undefined).getOrDefault('aaa')).is.eq('aaa')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(null).getOrDefault('bbb')).is.eq(null)
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists('').getOrDefault('ccc')).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists('12345').getOrDefault('ddd')).is.eq('12345')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(0).getOrDefault(123)).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(12345).getOrDefault(456)).is.eq(12345)
  })

  it('EventUtilsDefault.ensureValueExists 正常 (getOrThrow)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureValueExists(undefined).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureValueExists(undefined).getOrThrow('测试消息')).is.throw('测试消息')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(null).getOrThrow()).is.null
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists('').getOrThrow()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists('12345').getOrThrow()).is.eq('12345')
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(0).getOrThrow()).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureValueExists(12345).getOrThrow()).is.eq(12345)
  })

  it('EventUtilsDefault.ensureNumberInRange 正常 (getOrThrow)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(undefined, -1, 0).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(undefined, 0, 0).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(undefined, 0, 1).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(undefined, -1, 1).getOrThrow()).is.throw()

    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 0).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, 0, 0).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, 0, 1).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 1).getOrThrow()).is.throw()

    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, -1, 0).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, 0, 0).getOrThrow()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, 0, 1).getOrThrow()).is.eq(1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, -1, 1).getOrThrow()).is.eq(1)

    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, -1, 0).getOrThrow()).is.eq(-1)
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, 0, 0).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, 0, 1).getOrThrow()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, -1, 1).getOrThrow()).is.eq(-1)
  })

  it('EventUtilsDefault.ensureNumberInRange 正常 (getOrDefault)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(undefined, -1, 0).getOrDefault(123)).is.throw()

    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 1).getOrDefault(123)).is.eq(123)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 1).getOrDefault(456)).is.eq(456)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 1).getOrDefault(0)).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 1).getOrDefault()).is.eq(-1)

    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-2, -1, 1).getOrDefault(100)).is.eq(100)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, -1, 1).getOrDefault(100)).is.eq(-1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(0, -1, 1).getOrDefault(100)).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, -1, 1).getOrDefault(100)).is.eq(1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(2, -1, 1).getOrDefault(100)).is.eq(100)

    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-2, -1, 1).getOrDefault()).is.eq(-1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, -1, 1).getOrDefault()).is.eq(-1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(0, -1, 1).getOrDefault()).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, -1, 1).getOrDefault()).is.eq(1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(2, -1, 1).getOrDefault()).is.eq(1)
  })

  it('EventUtilsDefault.ensureNumberInRange 正常 (get)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureNumberInRange(undefined, -1, 0).get()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(null, -1, 1).get()).is.undefined

    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-2, -1, 1).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(-1, -1, 1).get()).is.eq(-1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(0, -1, 1).get()).is.eq(0)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(1, -1, 1).get()).is.eq(1)
    expect(new EventUtilsDefault(new FakeContext()).ensureNumberInRange(2, -1, 1).get()).is.undefined
  })

  it('EventUtilsDefault.ensureStringInRange 正常 (get)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange(undefined, 3).get()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange(null, 3).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3).get()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3).get()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3).get()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3).get()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3, 1).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3, 1).get()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3, 1).get()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3, 1).get()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3, 1).get()).is.undefined
  })

  it('EventUtilsDefault.ensureStringInRange 正常 (getOrDefault)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange(undefined, 3).getOrDefault()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange(null, 3).getOrDefault()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3).getOrDefault()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3).getOrDefault()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3).getOrDefault()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3).getOrDefault()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3).getOrDefault()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3, 1).getOrDefault()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3, 1).getOrDefault()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3, 1).getOrDefault()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3, 1).getOrDefault()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3, 1).getOrDefault()).is.undefined

    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange(undefined, 3).getOrDefault('A')).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange(null, 3).getOrDefault('B')).is.eq('B')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3).getOrDefault('C')).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3).getOrDefault('D')).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3).getOrDefault('E')).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3).getOrDefault('F')).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3).getOrDefault('G')).is.eq('G')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3, 1).getOrDefault('H')).is.eq('H')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3, 1).getOrDefault('I')).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3, 1).getOrDefault('J')).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3, 1).getOrDefault('K')).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3, 1).getOrDefault('L')).is.eq('L')
  })

  it('EventUtilsDefault.ensureStringInRange 正常 (getOrThrow)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange(undefined, 3).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange(null, 3).getOrThrow()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3).getOrThrow()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3).getOrThrow()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3).getOrThrow()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3).getOrThrow()).is.eq('123')
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange('', 3, 1).getOrThrow()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('1', 3, 1).getOrThrow()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('12', 3, 1).getOrThrow()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringInRange('123', 3, 1).getOrThrow()).is.eq('123')
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringInRange('1234', 3, 1).getOrThrow()).is.throw()
  })

  it('EventUtilsDefault.ensureStringMatchRegex 正常 (get)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(undefined, /^.{0,3}$/gi).get()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(null, /^.{0,3}$/gi).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{0,3}$/gi).get()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{0,3}$/gi).get()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{0,3}$/gi).get()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{0,3}$/gi).get()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{0,3}$/gi).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{1,3}$/gi).get()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{1,3}$/gi).get()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{1,3}$/gi).get()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{1,3}$/gi).get()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{1,3}$/gi).get()).is.undefined
  })

  it('EventUtilsDefault.ensureStringMatchRegex 正常 (getOrDefault)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(undefined, /^.{0,3}$/gi).getOrDefault()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(null, /^.{0,3}$/gi).getOrDefault()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{0,3}$/gi).getOrDefault()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{0,3}$/gi).getOrDefault()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{0,3}$/gi).getOrDefault()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{0,3}$/gi).getOrDefault()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{0,3}$/gi).getOrDefault()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{1,3}$/gi).getOrDefault()).is.undefined
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{1,3}$/gi).getOrDefault()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{1,3}$/gi).getOrDefault()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{1,3}$/gi).getOrDefault()).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{1,3}$/gi).getOrDefault()).is.undefined

    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(undefined, /^.{0,3}$/gi).getOrDefault('a')).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(null, /^.{0,3}$/gi).getOrDefault('b')).is.eq('b')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{0,3}$/gi).getOrDefault('c')).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{0,3}$/gi).getOrDefault('d')).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{0,3}$/gi).getOrDefault('e')).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{0,3}$/gi).getOrDefault('f')).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{0,3}$/gi).getOrDefault('g')).is.eq('g')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{1,3}$/gi).getOrDefault('h')).is.eq('h')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{1,3}$/gi).getOrDefault('i')).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{1,3}$/gi).getOrDefault('j')).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{1,3}$/gi).getOrDefault('k')).is.eq('123')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{1,3}$/gi).getOrDefault('l')).is.eq('l')
  })

  it('EventUtilsDefault.ensureStringMatchRegex 正常 (getOrThrow)', function () {
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(undefined, /^.{0,3}$/gi).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex(null, /^.{0,3}$/gi).getOrThrow()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{0,3}$/gi).getOrThrow()).is.eq('')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{0,3}$/gi).getOrThrow()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{0,3}$/gi).getOrThrow()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{0,3}$/gi).getOrThrow()).is.eq('123')
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{0,3}$/gi).getOrThrow()).is.throw()
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('', /^.{1,3}$/gi).getOrThrow()).is.throw()
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1', /^.{1,3}$/gi).getOrThrow()).is.eq('1')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('12', /^.{1,3}$/gi).getOrThrow()).is.eq('12')
    expect(new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('123', /^.{1,3}$/gi).getOrThrow()).is.eq('123')
    expect(() => new EventUtilsDefault(new FakeContext()).ensureStringMatchRegex('1234', /^.{1,3}$/gi).getOrThrow()).is.throw()
  })
})

class FakeContext extends EventContextDefault {
  public constructor(event?, context?) {
    super(event || {}, context || {})
  }
}