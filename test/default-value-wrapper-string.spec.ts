/* tslint:disable */
import { expect } from 'chai'
import { DefaultValueWrapperString } from '../src/default-value-wrapper-string'

describe('./src/default-value-wrapper-string', function () {
  it('DefaultValueWrapperString 存在', function () {
    expect(DefaultValueWrapperString).not.null
    expect(DefaultValueWrapperString).not.undefined
    expect(typeof DefaultValueWrapperString).to.equal('function')
  })

  it('DefaultValueWrapperString 初始化正常', function () {
    expect(() => new DefaultValueWrapperString(undefined)).not.throw()
    expect(() => new DefaultValueWrapperString(null)).not.throw()
    expect(() => new DefaultValueWrapperString('')).not.throw()
    expect(() => new DefaultValueWrapperString('0')).not.throw()
    expect(() => new DefaultValueWrapperString('1')).not.throw()
    expect(() => new DefaultValueWrapperString('abc')).not.throw()
    expect(() => new DefaultValueWrapperString('abc def')).not.throw()
  })

  it('DefaultValueWrapperString.get 正常', function () {
    expect(new DefaultValueWrapperString(undefined).get()).is.undefined
    expect(new DefaultValueWrapperString(null).get()).is.null
    expect(new DefaultValueWrapperString('').get()).is.eq('')
    expect(new DefaultValueWrapperString('0').get()).is.eq('0')
    expect(new DefaultValueWrapperString('1').get()).is.eq('1')
    expect(new DefaultValueWrapperString('abc').get()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def').get()).is.eq('abc def')
  })

  it('DefaultValueWrapperString.getOrDefault 正常 (自带默认值)', function () {
    expect(new DefaultValueWrapperString(undefined, 'A').getOrDefault()).is.eq('A')
    expect(new DefaultValueWrapperString(null, 'B').getOrDefault()).is.null
    expect(new DefaultValueWrapperString('', 'C').getOrDefault()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').getOrDefault()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').getOrDefault()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').getOrDefault()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def', 'G').getOrDefault()).is.eq('abc def')
  })

  it('DefaultValueWrapperString.getOrDefault 正常 (未传默认值)', function () {
    expect(new DefaultValueWrapperString(undefined).getOrDefault()).is.undefined
    expect(new DefaultValueWrapperString(null).getOrDefault()).is.null
    expect(new DefaultValueWrapperString('').getOrDefault()).is.eq('')
    expect(new DefaultValueWrapperString('0').getOrDefault()).is.eq('0')
    expect(new DefaultValueWrapperString('1').getOrDefault()).is.eq('1')
    expect(new DefaultValueWrapperString('abc').getOrDefault()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def').getOrDefault()).is.eq('abc def')
  })

  it('DefaultValueWrapperString.getOrDefault 正常 (传入默认值)', function () {
    expect(new DefaultValueWrapperString(undefined).getOrDefault('a')).is.eq('a')
    expect(new DefaultValueWrapperString(null).getOrDefault('b')).is.null
    expect(new DefaultValueWrapperString('').getOrDefault('c')).is.eq('')
    expect(new DefaultValueWrapperString('0').getOrDefault('d')).is.eq('0')
    expect(new DefaultValueWrapperString('1').getOrDefault('e')).is.eq('1')
    expect(new DefaultValueWrapperString('abc').getOrDefault('f')).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def').getOrDefault('g')).is.eq('abc def')
  })

  it('DefaultValueWrapperString.getOrDefault 正常 (双录默认值)', function () {
    expect(new DefaultValueWrapperString(undefined, 'A').getOrDefault('aa')).is.eq('aa')
    expect(new DefaultValueWrapperString(null, 'B').getOrDefault('bb')).is.null
    expect(new DefaultValueWrapperString('', 'C').getOrDefault('cc')).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').getOrDefault('dd')).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').getOrDefault('ee')).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').getOrDefault('ff')).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def', 'G').getOrDefault('gg')).is.eq('abc def')
  })

  it('DefaultValueWrapperString.getOrThrow 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).getOrThrow()).to.throw()
    expect(new DefaultValueWrapperString(null).getOrThrow()).is.null
    expect(new DefaultValueWrapperString('').getOrThrow()).is.eq('')
    expect(new DefaultValueWrapperString('0').getOrThrow()).is.eq('0')
    expect(new DefaultValueWrapperString('1').getOrThrow()).is.eq('1')
    expect(new DefaultValueWrapperString('abc').getOrThrow()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def').getOrThrow()).is.eq('abc def')
  })

  it('DefaultValueWrapperString.getOrThrow 正常 (自带默认值)', function () {
    expect(() => new DefaultValueWrapperString(undefined, 'A').getOrThrow()).to.throw()
    expect(new DefaultValueWrapperString(null, 'B').getOrThrow()).is.null
    expect(new DefaultValueWrapperString('', 'C').getOrThrow()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').getOrThrow()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').getOrThrow()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').getOrThrow()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def', 'G').getOrThrow()).is.eq('abc def')
  })

  it('DefaultValueWrapperString.get 正常 (传入布尔类型)', function () {
    expect(new DefaultValueWrapperString(true, '10').get()).is.eq('true')
    expect(new DefaultValueWrapperString(false, '20').get()).is.eq('false')
  })

  it('DefaultValueWrapperString.get 正常 (传入对象)', function () {
    expect(new DefaultValueWrapperString({}, '10').get()).is.undefined
    expect(new DefaultValueWrapperString({ foo: function () {} }, '20').get()).is.undefined
  })

  it('DefaultValueWrapperString.get 正常 (传入函数)', function () {
    expect(new DefaultValueWrapperString(function () {}, '10').get()).is.undefined
    expect(new DefaultValueWrapperString(() => {}, '20').get()).is.undefined
  })

  it('DefaultValueWrapperString.ensureMatch 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).ensureMatch(/^.{0,3}$/gi).get()).to.throw()
    expect(() => new DefaultValueWrapperString(null).ensureMatch(/^.{0,3}$/gi).get()).to.throw()
    expect(new DefaultValueWrapperString('').ensureMatch(/^.{0,3}$/gi).get()).is.eq('')
    expect(new DefaultValueWrapperString('1').ensureMatch(/^.{0,3}$/gi).get()).is.eq('1')
    expect(new DefaultValueWrapperString('12').ensureMatch(/^.{0,3}$/gi).get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').ensureMatch(/^.{0,3}$/gi).get()).is.eq('123')
    expect(() => new DefaultValueWrapperString('1234').ensureMatch(/^.{0,3}$/gi).get()).to.throw()
    expect(() => new DefaultValueWrapperString('').ensureMatch(/^.{1,3}$/gi).get()).to.throw()
    expect(new DefaultValueWrapperString('1').ensureMatch(/^.{1,3}$/gi).get()).is.eq('1')
    expect(new DefaultValueWrapperString('12').ensureMatch(/^.{1,3}$/gi).get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').ensureMatch(/^.{1,3}$/gi).get()).is.eq('123')
    expect(() => new DefaultValueWrapperString('1234').ensureMatch(/^.{1,3}$/gi).get()).to.throw()
  })

  it('DefaultValueWrapperString.ensureMaxLength 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).ensureMaxLength(2).get()).to.throw()
    expect(() => new DefaultValueWrapperString(null).ensureMaxLength(2).get()).to.throw()
    expect(new DefaultValueWrapperString('').ensureMaxLength(2).get()).is.eq('')
    expect(new DefaultValueWrapperString('1').ensureMaxLength(2).get()).is.eq('1')
    expect(new DefaultValueWrapperString('12').ensureMaxLength(2).get()).is.eq('12')
    expect(() => new DefaultValueWrapperString('123').ensureMaxLength(2).get()).to.throw()
    expect(() => new DefaultValueWrapperString('1234').ensureMaxLength(2).get()).to.throw()
  })

  it('DefaultValueWrapperString.ensureMinLength 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).ensureMinLength(2).get()).to.throw()
    expect(() => new DefaultValueWrapperString(null).ensureMinLength(2).get()).to.throw()
    expect(() => new DefaultValueWrapperString('').ensureMinLength(2).get()).to.throw()
    expect(() => new DefaultValueWrapperString('1').ensureMinLength(2).get()).to.throw()
    expect(new DefaultValueWrapperString('12').ensureMinLength(2).get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').ensureMinLength(2).get()).is.eq('123')
    expect(new DefaultValueWrapperString('1234').ensureMinLength(2).get()).is.eq('1234')
  })

  it('DefaultValueWrapperString.ensureMatch 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).eitherMatch(/^.{0,3}$/gi, 'aaa').get()).to.throw()
    expect(new DefaultValueWrapperString(null).eitherMatch(/^.{0,3}$/gi, 'bbb').get()).is.eq('bbb')
    expect(new DefaultValueWrapperString('').eitherMatch(/^.{0,3}$/gi, 'ccc').get()).is.eq('')
    expect(new DefaultValueWrapperString('1').eitherMatch(/^.{0,3}$/gi, 'ddd').get()).is.eq('1')
    expect(new DefaultValueWrapperString('12').eitherMatch(/^.{0,3}$/gi, 'eee').get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').eitherMatch(/^.{0,3}$/gi, 'fff').get()).is.eq('123')
    expect(new DefaultValueWrapperString('1234').eitherMatch(/^.{0,3}$/gi, 'ggg').get()).is.eq('ggg')
    expect(new DefaultValueWrapperString('').eitherMatch(/^.{1,3}$/gi, 'hhh').get()).is.eq('hhh')
    expect(new DefaultValueWrapperString('1').eitherMatch(/^.{1,3}$/gi, 'iii').get()).is.eq('1')
    expect(new DefaultValueWrapperString('12').eitherMatch(/^.{1,3}$/gi, 'jjj').get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').eitherMatch(/^.{1,3}$/gi, 'kkk').get()).is.eq('123')
    expect(new DefaultValueWrapperString('1234').eitherMatch(/^.{1,3}$/gi, 'lll').get()).is.eq('lll')
  })

  it('DefaultValueWrapperString.eitherMaxLength 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).eitherMaxLength(2, 'aaa').get()).to.throw()
    expect(() => new DefaultValueWrapperString(null).eitherMaxLength(2, 'bbb').get()).to.throw()
    expect(new DefaultValueWrapperString('').eitherMaxLength(2, 'ccc').get()).is.eq('')
    expect(new DefaultValueWrapperString('1').eitherMaxLength(2, 'ddd').get()).is.eq('1')
    expect(new DefaultValueWrapperString('12').eitherMaxLength(2, 'eee').get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').eitherMaxLength(2, 'fff').get()).is.eq('fff')
    expect(new DefaultValueWrapperString('1234').eitherMaxLength(2, 'ggg').get()).is.eq('ggg')
  })

  it('DefaultValueWrapperString.eitherMinLength 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined).eitherMinLength(2, 'aaa').get()).to.throw()
    expect(() => new DefaultValueWrapperString(null).eitherMinLength(2, 'bbb').get()).to.throw()
    expect(new DefaultValueWrapperString('').eitherMinLength(2, 'ccc').get()).is.eq('ccc')
    expect(new DefaultValueWrapperString('1').eitherMinLength(2, 'ddd').get()).is.eq('ddd')
    expect(new DefaultValueWrapperString('12').eitherMinLength(2, 'eee').get()).is.eq('12')
    expect(new DefaultValueWrapperString('123').eitherMinLength(2, 'fff').get()).is.eq('123')
    expect(new DefaultValueWrapperString('1234').eitherMinLength(2, 'ggg').get()).is.eq('1234')
  })

  it('DefaultValueWrapperString.guard 正常', function () {
    expect(new DefaultValueWrapperString(undefined, 'A').guard().get()).is.eq('')
    expect(new DefaultValueWrapperString(null, 'B').guard().get()).is.eq('')
    expect(new DefaultValueWrapperString('', 'C').guard().get()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').guard().get()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').guard().get()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').guard().get()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def', 'G').guard().get()).is.eq('abc def')
    expect(new DefaultValueWrapperString(' abc def ghi ', 'H').guard().get()).is.eq(' abc def ghi ')
  })

  it('DefaultValueWrapperString.amazing 正常', function () {
    expect(new DefaultValueWrapperString(undefined, 'A').amazing().get()).is.eq('')
    expect(new DefaultValueWrapperString(null, 'B').amazing().get()).is.eq('')
    expect(new DefaultValueWrapperString('', 'C').amazing().get()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').amazing().get()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').amazing().get()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').amazing().get()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def', 'G').amazing().get()).is.eq('abc def')
    expect(new DefaultValueWrapperString(' abc def ghi   ', 'H').amazing().get()).is.eq('abc def ghi')
  })

  it('DefaultValueWrapperString.get 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined, 'A').trim().get()).to.throw()
    expect(() => new DefaultValueWrapperString(null, 'B').trim().get()).to.throw()
    expect(new DefaultValueWrapperString('', 'C').trim().get()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').trim().get()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').trim().get()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').trim().get()).is.eq('abc')
    expect(new DefaultValueWrapperString('abc def', 'G').trim().get()).is.eq('abc def')
    expect(new DefaultValueWrapperString(' abc def ghi   ', 'H').trim().get()).is.eq('abc def ghi')
  })

  it('DefaultValueWrapperString.toUpperCase 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined, 'A').toUpperCase().get()).to.throw()
    expect(() => new DefaultValueWrapperString(null, 'B').toUpperCase().get()).to.throw()
    expect(new DefaultValueWrapperString('', 'C').toUpperCase().get()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').toUpperCase().get()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').toUpperCase().get()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').toUpperCase().get()).is.eq('ABC')
    expect(new DefaultValueWrapperString('aBc dEf', 'G').toUpperCase().get()).is.eq('ABC DEF')
    expect(new DefaultValueWrapperString(' AbC def gHi   ', 'H').toUpperCase().get()).is.eq(' ABC DEF GHI   ')
  })

  it('DefaultValueWrapperString.toLowerCase 正常', function () {
    expect(() => new DefaultValueWrapperString(undefined, 'A').toLowerCase().get()).to.throw()
    expect(() => new DefaultValueWrapperString(null, 'B').toLowerCase().get()).to.throw()
    expect(new DefaultValueWrapperString('', 'C').toLowerCase().get()).is.eq('')
    expect(new DefaultValueWrapperString('0', 'D').toLowerCase().get()).is.eq('0')
    expect(new DefaultValueWrapperString('1', 'E').toLowerCase().get()).is.eq('1')
    expect(new DefaultValueWrapperString('abc', 'F').toLowerCase().get()).is.eq('abc')
    expect(new DefaultValueWrapperString('aBc dEf', 'G').toLowerCase().get()).is.eq('abc def')
    expect(new DefaultValueWrapperString(' AbC def gHi   ', 'H').toLowerCase().get()).is.eq(' abc def ghi   ')
  })
})
