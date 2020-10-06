/* tslint:disable */
import { expect } from 'chai'
import { DefaultEventContext } from '../src/default-event-context'

describe('./src/default-event-context', function () {
  it('DefaultEventContext 存在', function () {
    expect(DefaultEventContext).not.null
    expect(DefaultEventContext).not.undefined
    expect(typeof DefaultEventContext).to.equal('function')
  })

  it('DefaultEventContext 初始化正常', function () {
    expect(() => new DefaultEventContext({}, {})).not.throw()
  })

  it('DefaultEventContext.ensure 正常', function () {
    let event = Buffer.from(JSON.stringify({}))
    expect(new DefaultEventContext(event, {}).ensure().pathParameters).is.not.undefined
    expect(new DefaultEventContext(event, {}).ensure().queryParameters).is.not.undefined
    expect(new DefaultEventContext(event, {}).ensure().headers).is.not.undefined
    expect(new DefaultEventContext(event, {}).ensure().body).is.undefined

    event = Buffer.from(JSON.stringify({ body: {} }))
    expect(new DefaultEventContext(event, {}).ensure().body).is.not.undefined
  })

  it('DefaultEventContext.getFromHeaders 正常', function () {
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromHeaders('x-a')).is.undefined
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromHeaders('x-b')).is.undefined
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromHeaders('x-c')).is.eq('ccc')
  })

  it('DefaultEventContext.getFromPath 正常', function () {
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromPath('x-a')).is.eq('aaa')
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromPath('x-b')).is.undefined
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromPath('x-c')).is.undefined
  })

  it('DefaultEventContext.getFromQuery 正常', function () {
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromQuery('x-a')).is.undefined
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromQuery('x-b')).is.eq('bbb')
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromQuery('x-c')).is.undefined
  })

  it('DefaultEventContext.getFromAny 正常', function () {
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromAny('x-a')).is.eq('aaa')
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromAny('x-b')).is.eq('bbb')
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromAny('x-c')).is.eq('ccc')
  })

  it('DefaultEventContext.getFromAny 执行顺序正常', function () {
    expect(
      new DefaultEventContext(
        Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' }, queryParameters: { 'x-a': 'bbb' }, headers: { 'x-a': 'ccc' } })),
        {}
      ).getFromAny('x-a')
    ).is.eq('bbb')
  })

  it('DefaultEventContext.getFromAny 空值正常', function () {
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': '' }, headers: { 'x-a': 'ccc' } })), {}).getFromAny('x-a')).is.eq('')
    expect(new DefaultEventContext(Buffer.from(JSON.stringify({ queryParameters: { 'x-a': 0 }, headers: { 'x-a': 'ccc' } })), {}).getFromAny('x-a')).is.eq(0)
  })
})
