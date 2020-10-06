import { DefaultValueWrapper } from './default-value-wrapper'
import { ValueWrapperString } from './value-wrapper-string'

export class DefaultValueWrapperString extends DefaultValueWrapper<string> implements ValueWrapperString {
  public constructor(value: any, defaultValue?: string) {
    if (value !== undefined) {
      if (value === null) {
        super(null, true, defaultValue)
      } else {
        if (typeof value === 'string') {
          super(value, true, defaultValue)
        } else if (typeof value === 'function') {
          super(undefined, false, defaultValue)
        } else if (typeof value === 'object') {
          super(undefined, false, defaultValue)
        } else {
          super(`${value}`, true, defaultValue)
        }
      }
    } else {
      super(undefined, false, defaultValue)
    }
  }

  public ensureMatch(regex: RegExp): this {
    return this.ensureFit((value) => regex.test(value), '必须符合正则表达式规则')
  }

  public ensureMaxLength(max: number): this {
    return this.ensureFit((value) => value.length <= max, `字符串长度不可超过 ${max}`)
  }

  public ensureMinLength(min: number): this {
    return this.ensureFit((value) => value.length >= min, `字符串长度不可短于 ${min}`)
  }

  public eitherMatch(regex: RegExp, or: string): this {
    return this.eitherFit((value) => regex.test(value), or)
  }

  public eitherMaxLength(max: number, or: string): this {
    return this.eitherFit((value) => value.length <= max, or)
  }

  public eitherMinLength(min: number, or: string): this {
    return this.eitherFit((value) => value.length >= min, or)
  }

  public amazing(): this {
    return this.guard().trim()
  }

  public guard(): this {
    if (this.isExists()) {
      if (this.value !== null) {
        return this
      }
    }
    this.value = ''
    return this
  }

  public trim(): this {
    this.value = this.value.trim()
    return this
  }
}
