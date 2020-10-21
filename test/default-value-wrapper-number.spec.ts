/* tslint:disable */
import { expect } from 'chai'
import { DefaultValueWrapperNumber } from '../src/default-value-wrapper-number'

describe('./src/default-value-wrapper-number', function () {
  it('DefaultValueWrapperNumber 存在', function () {
    expect(DefaultValueWrapperNumber).not.null
    expect(DefaultValueWrapperNumber).not.undefined
    expect(typeof DefaultValueWrapperNumber).to.equal('function')
  })

  it('DefaultValueWrapperNumber 初始化正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined)).not.throw()
    expect(() => new DefaultValueWrapperNumber(null)).not.throw()
    expect(() => new DefaultValueWrapperNumber(-1)).not.throw()
    expect(() => new DefaultValueWrapperNumber(0)).not.throw()
    expect(() => new DefaultValueWrapperNumber(1)).not.throw()
    expect(() => new DefaultValueWrapperNumber(1.23)).not.throw()
  })

  it('DefaultValueWrapperNumber.get 正常', function () {
    expect(new DefaultValueWrapperNumber(undefined).get()).is.undefined
    expect(new DefaultValueWrapperNumber(null).get()).is.null
    expect(new DefaultValueWrapperNumber(-1).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrDefault 正常 (自带默认值)', function () {
    expect(new DefaultValueWrapperNumber(undefined, 10).getOrDefault()).is.eq(10)
    expect(new DefaultValueWrapperNumber(null, 20).getOrDefault()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).getOrDefault()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).getOrDefault()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).getOrDefault()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).getOrDefault()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrDefault 正常 (未传默认值)', function () {
    expect(new DefaultValueWrapperNumber(undefined).getOrDefault()).is.undefined
    expect(new DefaultValueWrapperNumber(null).getOrDefault()).is.null
    expect(new DefaultValueWrapperNumber(-1).getOrDefault()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0).getOrDefault()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1).getOrDefault()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23).getOrDefault()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrDefault 正常 (传入默认值)', function () {
    expect(new DefaultValueWrapperNumber(undefined).getOrDefault(100)).is.eq(100)
    expect(new DefaultValueWrapperNumber(null).getOrDefault(200)).is.null
    expect(new DefaultValueWrapperNumber(-1).getOrDefault(300)).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0).getOrDefault(400)).is.eq(0)
    expect(new DefaultValueWrapperNumber(1).getOrDefault(500)).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23).getOrDefault(600)).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrDefault 正常 (双录默认值)', function () {
    expect(new DefaultValueWrapperNumber(undefined, 10).getOrDefault(100)).is.eq(100)
    expect(new DefaultValueWrapperNumber(null, 20).getOrDefault(200)).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).getOrDefault(300)).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).getOrDefault(400)).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).getOrDefault(500)).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).getOrDefault(600)).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrThrow 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined).getOrThrow()).to.throw()
    expect(new DefaultValueWrapperNumber(null).getOrThrow()).is.null
    expect(new DefaultValueWrapperNumber(-1).getOrThrow()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0).getOrThrow()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1).getOrThrow()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23).getOrThrow()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrThrow 正常 (自带默认值)', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).getOrThrow()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).getOrThrow()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).getOrThrow()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).getOrThrow()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).getOrThrow()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).getOrThrow()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.get 正常 (传入布尔类型)', function () {
    expect(new DefaultValueWrapperNumber(true, 10).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(false, 20).get()).is.eq(0)
  })

  it('DefaultValueWrapperNumber.get 正常 (传入对象)', function () {
    expect(new DefaultValueWrapperNumber({}, 10).get()).is.undefined
    expect(new DefaultValueWrapperNumber({ foo: function () {} }, 10).get()).is.undefined
  })

  it('DefaultValueWrapperNumber.get 正常 (传入字符串)', function () {
    expect(new DefaultValueWrapperNumber('undefined', 10).get()).is.undefined
    expect(new DefaultValueWrapperNumber('null', 20).get()).is.undefined
    expect(new DefaultValueWrapperNumber('-1', 30).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber('0', 40).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber('1', 50).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber('1.23', 60).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.getOrDefault 正常 (传入字符串, 自带默认值)', function () {
    expect(new DefaultValueWrapperNumber('undefined', 10).getOrDefault()).is.eq(10)
    expect(new DefaultValueWrapperNumber('null', 20).getOrDefault()).is.eq(20)
    expect(new DefaultValueWrapperNumber('-1', 30).getOrDefault()).is.eq(-1)
    expect(new DefaultValueWrapperNumber('0', 40).getOrDefault()).is.eq(0)
    expect(new DefaultValueWrapperNumber('1', 50).getOrDefault()).is.eq(1)
    expect(new DefaultValueWrapperNumber('1.23', 60).getOrDefault()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureExists 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureExists().get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).ensureExists().get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).ensureExists().get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).ensureExists().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).ensureExists().get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).ensureExists().get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureGreaterThan 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureGreaterThan(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(null, 20).ensureGreaterThan(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(-1, 30).ensureGreaterThan(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(0, 40).ensureGreaterThan(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(1, 50).ensureGreaterThan(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(1.23, 60).ensureGreaterThan(1).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureGreaterThanOrEqual 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureGreaterThanOrEqual(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(null, 20).ensureGreaterThanOrEqual(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(-1, 30).ensureGreaterThanOrEqual(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(0, 40).ensureGreaterThanOrEqual(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(1, 50).ensureGreaterThanOrEqual(1).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).ensureGreaterThanOrEqual(1).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureLowerThan 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureLowerThan(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).ensureLowerThan(1).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).ensureLowerThan(1).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).ensureLowerThan(1).get()).is.eq(0)
    expect(() => new DefaultValueWrapperNumber(1, 50).ensureLowerThan(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(1.23, 60).ensureLowerThan(1).get()).to.throw()
  })

  it('DefaultValueWrapperNumber.ensureLowerThanOrEqual 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureLowerThanOrEqual(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).ensureLowerThanOrEqual(1).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).ensureLowerThanOrEqual(1).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).ensureLowerThanOrEqual(1).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).ensureLowerThanOrEqual(1).get()).eq(1)
    expect(() => new DefaultValueWrapperNumber(1.23, 60).ensureLowerThanOrEqual(1).get()).to.throw()
  })

  it('DefaultValueWrapperNumber.ensureEqualTo 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureEqualTo(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(null, 20).ensureEqualTo(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(-1, 30).ensureEqualTo(1).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(0, 40).ensureEqualTo(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(1, 50).ensureEqualTo(1).get()).is.eq(1)
    expect(() => new DefaultValueWrapperNumber(1.23, 60).ensureEqualTo(1).get()).to.throw()
  })

  it('DefaultValueWrapperNumber.ensureNotEqualTo 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureNotEqualTo(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).ensureNotEqualTo(1).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).ensureNotEqualTo(1).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).ensureNotEqualTo(1).get()).is.eq(0)
    expect(() => new DefaultValueWrapperNumber(1, 50).ensureNotEqualTo(1).get()).to.throw()
    expect(new DefaultValueWrapperNumber(1.23, 60).ensureNotEqualTo(1).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureIn 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureIn([1, 2, 3, 4, 5]).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(null, 20).ensureIn([1, 2, 3, 4, 5]).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(-1, 30).ensureIn([1, 2, 3, 4, 5]).get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(0, 40).ensureIn([1, 2, 3, 4, 5]).get()).to.throw()
    expect(new DefaultValueWrapperNumber(1, 50).ensureIn([1, 2, 3, 4, 5]).get()).is.eq(1)
    expect(() => new DefaultValueWrapperNumber(1.23, 60).ensureIn([1, 2, 3, 4, 5]).get()).is.to.throw()
  })

  it('DefaultValueWrapperNumber.ensureNotIn 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureNotIn([1, 2, 3, 4, 5]).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).ensureNotIn([1, 2, 3, 4, 5]).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).ensureNotIn([1, 2, 3, 4, 5]).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).ensureNotIn([1, 2, 3, 4, 5]).get()).is.eq(0)
    expect(() => new DefaultValueWrapperNumber(1, 50).ensureNotIn([1, 2, 3, 4, 5]).get()).to.throw()
    expect(new DefaultValueWrapperNumber(1.23, 60).ensureNotIn([1, 2, 3, 4, 5]).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureNotNull 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).ensureNotNull().get()).to.throw()
    expect(() => new DefaultValueWrapperNumber(null, 20).ensureNotNull().get()).to.throw()
    expect(new DefaultValueWrapperNumber(-1, 30).ensureNotNull().get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).ensureNotNull().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).ensureNotNull().get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).ensureNotNull().get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.eitherExists 正常', function () {
    expect(new DefaultValueWrapperNumber(undefined, 10).eitherExists(100).get()).is.eq(100)
    expect(new DefaultValueWrapperNumber(null, 20).eitherExists(200).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).eitherExists(300).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).eitherExists(400).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).eitherExists(500).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherExists(600).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.eitherGreaterThan 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherGreaterThan(1, 10000).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherGreaterThan(1, 20000).get()).is.eq(20000)
    expect(new DefaultValueWrapperNumber(-1, 30).eitherGreaterThan(1, 30000).get()).is.eq(30000)
    expect(new DefaultValueWrapperNumber(0, 40).eitherGreaterThan(1, 40000).get()).is.eq(40000)
    expect(new DefaultValueWrapperNumber(1, 50).eitherGreaterThan(1, 50000).get()).is.eq(50000)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherGreaterThan(1, 60000).get()).is.eq(1.23)
    expect(new DefaultValueWrapperNumber(0, 70).eitherGreaterThan(1).get()).is.eq(1)
  })

  it('DefaultValueWrapperNumber.eitherGreaterThanOrEqual 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherGreaterThanOrEqual(1, 10000).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherGreaterThanOrEqual(1, 20000).get()).is.eq(20000)
    expect(new DefaultValueWrapperNumber(-1, 30).eitherGreaterThanOrEqual(1, 30000).get()).is.eq(30000)
    expect(new DefaultValueWrapperNumber(0, 40).eitherGreaterThanOrEqual(1, 40000).get()).is.eq(40000)
    expect(new DefaultValueWrapperNumber(1, 50).eitherGreaterThanOrEqual(1, 50000).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherGreaterThanOrEqual(1, 60000).get()).is.eq(1.23)
    expect(new DefaultValueWrapperNumber(0, 70).eitherGreaterThanOrEqual(1).get()).is.eq(1)
  })

  it('DefaultValueWrapperNumber.eitherLowerThan 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherLowerThan(1, 10000).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherLowerThan(1, 20000).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).eitherLowerThan(1, 30000).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).eitherLowerThan(1, 40000).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).eitherLowerThan(1, 50000).get()).is.eq(50000)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherLowerThan(1, 60000).get()).is.eq(60000)
    expect(new DefaultValueWrapperNumber(10, 70).eitherLowerThan(1).get()).is.eq(1)
  })

  it('DefaultValueWrapperNumber.eitherLowerThanOrEqual 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherLowerThanOrEqual(1, 10000).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherLowerThanOrEqual(1, 20000).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).eitherLowerThanOrEqual(1, 30000).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).eitherLowerThanOrEqual(1, 40000).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).eitherLowerThanOrEqual(1, 50000).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherLowerThanOrEqual(1, 60000).get()).is.eq(60000)
    expect(new DefaultValueWrapperNumber(10, 70).eitherLowerThanOrEqual(1).get()).is.eq(1)
  })

  it('DefaultValueWrapperNumber.eitherEqualTo 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherEqualTo(1, 10000).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherEqualTo(1, 20000).get()).is.eq(20000)
    expect(new DefaultValueWrapperNumber(-1, 30).eitherEqualTo(1, 30000).get()).is.eq(30000)
    expect(new DefaultValueWrapperNumber(0, 40).eitherEqualTo(1, 40000).get()).is.eq(40000)
    expect(new DefaultValueWrapperNumber(1, 50).eitherEqualTo(1, 50000).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherEqualTo(1, 60000).get()).is.eq(60000)
  })

  it('DefaultValueWrapperNumber.eitherNotEqualTo 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherNotEqualTo(1, 10000).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherNotEqualTo(1, 20000).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).eitherNotEqualTo(1, 30000).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).eitherNotEqualTo(1, 40000).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).eitherNotEqualTo(1, 50000).get()).is.eq(50000)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherNotEqualTo(1, 60000).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.eitherIn 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherIn([1, 2, 3, 4, 5], 100).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherIn([1, 2, 3, 4, 5], 200).get()).is.eq(200)
    expect(new DefaultValueWrapperNumber(-1, 30).eitherIn([1, 2, 3, 4, 5], 300).get()).is.eq(300)
    expect(new DefaultValueWrapperNumber(0, 40).eitherIn([1, 2, 3, 4, 5], 400).get()).is.eq(400)
    expect(new DefaultValueWrapperNumber(1, 50).eitherIn([1, 2, 3, 4, 5], 500).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherIn([1, 2, 3, 4, 5], 600).get()).is.eq(600)
  })

  it('DefaultValueWrapperNumber.eitherNotIn 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherNotIn([1, 2, 3, 4, 5], 100).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherNotIn([1, 2, 3, 4, 5], 200).get()).is.null
    expect(new DefaultValueWrapperNumber(-1, 30).eitherNotIn([1, 2, 3, 4, 5], 300).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).eitherNotIn([1, 2, 3, 4, 5], 400).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).eitherNotIn([1, 2, 3, 4, 5], 500).get()).is.eq(500)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherNotIn([1, 2, 3, 4, 5], 600).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.eitherNotNull 正常', function () {
    expect(() => new DefaultValueWrapperNumber(undefined, 10).eitherNotNull(100).get()).to.throw()
    expect(new DefaultValueWrapperNumber(null, 20).eitherNotNull(200).get()).is.eq(200)
    expect(new DefaultValueWrapperNumber(-1, 30).eitherNotNull(300).get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).eitherNotNull(400).get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).eitherNotNull(500).get()).is.eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).eitherNotNull(600).get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.guard 正常', function () {
    expect(new DefaultValueWrapperNumber(undefined, 10).guard().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(null, 20).guard().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(-1, 30).guard().get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).guard().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).guard().get()).eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).guard().get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.amazing 正常', function () {
    expect(new DefaultValueWrapperNumber(undefined, 10).amazing().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(null, 20).amazing().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(-1, 30).amazing().get()).is.eq(-1)
    expect(new DefaultValueWrapperNumber(0, 40).amazing().get()).is.eq(0)
    expect(new DefaultValueWrapperNumber(1, 50).amazing().get()).eq(1)
    expect(new DefaultValueWrapperNumber(1.23, 60).amazing().get()).is.eq(1.23)
  })

  it('DefaultValueWrapperNumber.ensureGreaterThan 异常内容正常', function () {
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureGreaterThan(20)).to.throw(`参数的值必须大于 20`)
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureGreaterThan(20, '值需要大于20')).to.throw(`值需要大于20`)
  })

  it('DefaultValueWrapperNumber.ensureGreaterThanOrEqual 异常内容正常', function () {
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureGreaterThanOrEqual(20)).to.throw(`参数的值必须大于或等于 20`)
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureGreaterThanOrEqual(20, '值需要大于或等于20')).to.throw(`值需要大于或等于20`)
  })

  it('DefaultValueWrapperNumber.ensureLowerThan 异常内容正常', function () {
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureLowerThan(1)).to.throw(`参数的值必须小于 1`)
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureLowerThan(1, '值需要小于1')).to.throw(`值需要小于1`)
  })

  it('DefaultValueWrapperNumber.ensureLowerThanOrEqual 异常内容正常', function () {
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureLowerThanOrEqual(1)).to.throw(`参数的值必须小于或等于 1`)
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureLowerThanOrEqual(1, '值需要小于或等于1')).to.throw(`值需要小于或等于1`)
  })

  it('DefaultValueWrapperNumber.ensureEqualTo 异常内容正常', function () {
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureEqualTo(100)).to.throw(`参数的值必须等于 100`)
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureEqualTo(100, '值需要等于100')).to.throw(`值需要等于100`)
  })

  it('DefaultValueWrapperNumber.ensureNotEqualTo 异常内容正常', function () {
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureNotEqualTo(10)).to.throw(`参数的值必须不等于 10`)
    expect(() => new DefaultValueWrapperNumber(10, 50).ensureNotEqualTo(10, '值需要不等于10')).to.throw(`值需要不等于10`)
  })
})
