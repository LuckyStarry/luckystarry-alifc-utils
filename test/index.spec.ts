/* tslint:disable */
import { expect } from 'chai'
import index from '../src/index'

describe('Index', function () {
  it('存在 默认导出', function () {
    expect(index).not.null
    expect(index).not.undefined
    expect(typeof index).to.equal('object')
  })
})
