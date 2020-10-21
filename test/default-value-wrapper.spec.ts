/* tslint:disable */
import { expect } from 'chai'
import { DefaultValueWrapper } from '../src/default-value-wrapper'

describe('./src/default-value-wrapper', function () {
  it('DefaultValueWrapper 存在', function () {
    expect(DefaultValueWrapper).not.null
    expect(DefaultValueWrapper).not.undefined
    expect(typeof DefaultValueWrapper).to.equal('function')
  })

  it('DefaultValueWrapper 初始化正常', function () {
    expect(() => new FakeDefaultValueWrapper(undefined)).not.throw()
    expect(() => new FakeDefaultValueWrapper(null)).not.throw()
    expect(() => new FakeDefaultValueWrapper('')).not.throw()
    expect(() => new FakeDefaultValueWrapper('0')).not.throw()
    expect(() => new FakeDefaultValueWrapper('1')).not.throw()
    expect(() => new FakeDefaultValueWrapper('abc')).not.throw()
    expect(() => new FakeDefaultValueWrapper('abc def')).not.throw()
  })

  it('DefaultValueWrapper.defaultValue 正常', function () {
    expect(new FakeDefaultValueWrapper(undefined, false, 'a').SUPER_DEFAULT).is.eq('a')
    expect(new FakeDefaultValueWrapper(null, true, 'b').SUPER_DEFAULT).is.eq('b')
    expect(new FakeDefaultValueWrapper('', true, 'c').SUPER_DEFAULT).is.eq('c')
    expect(new FakeDefaultValueWrapper('0', true, 'd').SUPER_DEFAULT).is.eq('d')
    expect(new FakeDefaultValueWrapper('1', true, 'e').SUPER_DEFAULT).is.eq('e')
    expect(new FakeDefaultValueWrapper('abc', true, 'f').SUPER_DEFAULT).is.eq('f')
    expect(new FakeDefaultValueWrapper('abc def', true, 'g').SUPER_DEFAULT).is.eq('g')
  })

  it('DefaultValueWrapper.ensureFit 异常内容正常', function () {
    expect(() => new FakeDefaultValueWrapper('', true, 'c').ensureFit((x) => false)).to.throw('参数的值必须符合条件')
    expect(() => new FakeDefaultValueWrapper('', true, 'c').ensureFit((x) => false, '正则校验失败')).to.throw('正则校验失败')
  })
})

class FakeDefaultValueWrapper extends DefaultValueWrapper<string> {
  public constructor(value: string, exists?: boolean, defaultValue?: string) {
    super(value, exists, defaultValue)
  }

  public get SUPER_DEFAULT(): string {
    return super.defaultValue
  }
}
