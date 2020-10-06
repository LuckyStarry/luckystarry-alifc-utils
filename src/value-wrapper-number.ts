import { ValueWrapper } from './value-wrapper'

export interface ValueWrapperNumber extends ValueWrapper<number> {
  // 辅助工具
  amazing(): this
  guard(): this
}
