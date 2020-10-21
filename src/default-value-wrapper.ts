import { EventErrorValueNotExists } from './event-error-value-not-exists'
import { EventErrorValueOutOfRange } from './event-error-value-out-of-range'
import { ValueWrapper } from './value-wrapper'

export class DefaultValueWrapper<T> implements ValueWrapper<T> {
  private _value: T
  private _exists = false
  private _defaultValue: T
  protected constructor(value: T, exists?: boolean, defaultValue?: T) {
    this._value = value
    if (exists !== undefined) {
      this._exists = exists
    } else {
      this._exists = this._value !== undefined
    }

    this._defaultValue = defaultValue
  }

  protected set value(newValue: T) {
    this._value = newValue
    this._exists = newValue !== undefined
  }

  protected get value(): T {
    return this._value
  }

  protected get defaultValue(): T {
    return this._defaultValue
  }

  public isExists(): boolean {
    return this._exists
  }

  public ensureExists(message?: string): this {
    if (this.isExists()) {
      return this
    }
    throw new EventErrorValueNotExists(message)
  }

  public ensureGreaterThan(other: T, message?: string): this {
    return this.ensureFit((value) => value > other, message || `参数的值必须大于 ${other}`)
  }

  public ensureGreaterThanOrEqual(other: T, message?: string): this {
    return this.ensureFit((value) => value >= other, message || `参数的值必须大于或等于 ${other}`)
  }

  public ensureLowerThan(other: T, message?: string): this {
    return this.ensureFit((value) => value < other, message || `参数的值必须小于 ${other}`)
  }

  public ensureLowerThanOrEqual(other: T, message?: string): this {
    return this.ensureFit((value) => value <= other, message || `参数的值必须小于或等于 ${other}`)
  }

  public ensureEqualTo(other: T, message?: string): this {
    return this.ensureFit((value) => value === other, message || `参数的值必须等于 ${other}`)
  }

  public ensureNotEqualTo(other: T, message?: string): this {
    return this.ensureFit((value) => value !== other, message || `参数的值必须不等于 ${other}`)
  }

  public ensureNotNull(message?: string): this {
    return this.ensureFit((value) => value !== null, message || `参数的值必须不可为 NULL`)
  }

  public ensureIn(list: T[], message?: string): this {
    return this.ensureFit((value) => list.includes(value), message || `参数的值不在范围内`)
  }

  public ensureNotIn(list: T[], message?: string): this {
    return this.ensureFit((value) => !list.includes(value), message || `参数的值在非法范围内`)
  }

  public ensureFit(predicate: (value: T) => boolean, message?: string): this {
    if (predicate(this.ensureExists().getOrThrow())) {
      return this
    }
    throw new EventErrorValueOutOfRange(message || `参数的值必须符合条件`)
  }

  public eitherExists(or: T): this {
    if (!this.isExists()) {
      this.value = or
    }
    return this
  }

  public eitherGreaterThan(other: T, or?: T): this {
    return this.eitherFit((value) => value > other, or === undefined ? other : or)
  }

  public eitherGreaterThanOrEqual(other: T, or?: T): this {
    return this.eitherFit((value) => value >= other, or === undefined ? other : or)
  }

  public eitherLowerThan(other: T, or?: T): this {
    return this.eitherFit((value) => value < other, or === undefined ? other : or)
  }

  public eitherLowerThanOrEqual(other: T, or?: T): this {
    return this.eitherFit((value) => value <= other, or === undefined ? other : or)
  }

  public eitherEqualTo(other: T, or: T): this {
    return this.eitherFit((value) => value === other, or)
  }

  public eitherNotEqualTo(other: T, or: T): this {
    return this.eitherFit((value) => value !== other, or)
  }

  public eitherNotNull(or: T): this {
    return this.eitherNotEqualTo(null, or)
  }

  public eitherIn(list: T[], or: T): this {
    return this.eitherFit((value) => list.includes(value), or)
  }

  public eitherNotIn(list: T[], or: T): this {
    return this.eitherFit((value) => !list.includes(value), or)
  }

  public eitherFit(predicate: (value: T) => boolean, or: T): this {
    if (!predicate(this.ensureExists().getOrThrow())) {
      this._value = or
    }
    return this
  }

  public get(): T {
    if (this.isExists()) {
      return this._value
    }
  }

  public getOrDefault(defaultValue?: T): T {
    if (this.isExists()) {
      return this._value
    }
    if (defaultValue !== undefined) {
      return defaultValue
    }
    return this._defaultValue
  }

  public getOrThrow(message?: string): T {
    if (this.isExists()) {
      return this._value
    }
    if (message) {
      throw new EventErrorValueNotExists(message)
    } else {
      throw new EventErrorValueNotExists()
    }
  }
}
