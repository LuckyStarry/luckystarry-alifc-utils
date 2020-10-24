import { ValueWrapper } from './value-wrapper'

export interface ValueWrapperString extends ValueWrapper<string> {
  // 其他自定义验证器
  ensureMatch(regex: RegExp, message?: string): this
  ensureMaxLength(max: number, message?: string): this
  ensureMinLength(min: number, message?: string): this

  eitherMatch(regex: RegExp, or: string): this
  eitherMaxLength(max: number, or: string): this
  eitherMinLength(min: number, or: string): this

  // 辅助工具
  amazing(): this
  guard(): this
  trim(): this
  toUpperCase(): this
  toLowerCase(): this
}
