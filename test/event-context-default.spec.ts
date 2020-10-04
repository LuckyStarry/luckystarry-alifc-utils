/* tslint:disable */
import { expect } from 'chai'
import { EventContextDefault } from '../src/event-context-default'

describe('./src/event-context-default', function () {
  it('EventContextDefault 存在', function () {
    expect(EventContextDefault).not.null
    expect(EventContextDefault).not.undefined
    expect(typeof EventContextDefault).to.equal('function')
  })

  it('EventContextDefault 初始化正常', function () {
    expect(() => new EventContextDefault({}, {})).not.throw()
  })

  it('EventContextDefault.ensure 正常', function () {
    let event = Buffer.from(JSON.stringify({}))
    expect(new EventContextDefault(event, {}).ensure().pathParameters).is.not.undefined
    expect(new EventContextDefault(event, {}).ensure().queryParameters).is.not.undefined
    expect(new EventContextDefault(event, {}).ensure().headers).is.not.undefined
    expect(new EventContextDefault(event, {}).ensure().body).is.undefined

    event = Buffer.from(JSON.stringify({ body: {} }))
    expect(new EventContextDefault(event, {}).ensure().body).is.not.undefined
  })

  it('EventContextDefault.getFromHeaders 正常', function () {
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromHeaders('x-a')).is.undefined
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromHeaders('x-b')).is.undefined
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromHeaders('x-c')).is.eq('ccc')
  })

  it('EventContextDefault.getFromPath 正常', function () {
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromPath('x-a')).is.eq('aaa')
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromPath('x-b')).is.undefined
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromPath('x-c')).is.undefined
  })

  it('EventContextDefault.getFromQuery 正常', function () {
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromQuery('x-a')).is.undefined
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromQuery('x-b')).is.eq('bbb')
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromQuery('x-c')).is.undefined
  })

  it('EventContextDefault.getFromAny 正常', function () {
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' } })), {}).getFromAny('x-a')).is.eq('aaa')
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ queryParameters: { 'x-b': 'bbb' } })), {}).getFromAny('x-b')).is.eq('bbb')
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ headers: { 'x-c': 'ccc' } })), {}).getFromAny('x-c')).is.eq('ccc')
  })

  it('EventContextDefault.getFromAny 执行顺序正常', function () {
    expect(
      new EventContextDefault(
        Buffer.from(JSON.stringify({ pathParameters: { 'x-a': 'aaa' }, queryParameters: { 'x-a': 'bbb' }, headers: { 'x-a': 'ccc' } })),
        {}
      ).getFromAny('x-a')
    ).is.eq('bbb')
  })

  it('EventContextDefault.getFromAny 空值正常', function () {
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ pathParameters: { 'x-a': '' }, headers: { 'x-a': 'ccc' } })), {}).getFromAny('x-a')).is.eq('')
    expect(new EventContextDefault(Buffer.from(JSON.stringify({ queryParameters: { 'x-a': 0 }, headers: { 'x-a': 'ccc' } })), {}).getFromAny('x-a')).is.eq(0)
  })
})
