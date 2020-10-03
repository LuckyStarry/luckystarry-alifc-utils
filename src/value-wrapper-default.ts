import { EventErrorValueNotExists } from './event-error-value-not-exists'
import { ValueWrapper } from './value-wrapper'

export class ValueWrapperDefault<T> implements ValueWrapper<T> {
  private _value: T
  private _exists: boolean = false
  private _defaultValue: T
  public constructor(value: T, exists?: boolean, defaultValue?: T) {
    this._value = value
    if (exists !== undefined) {
      this._exists = exists
    } else {
      this._exists = this._value !== undefined
    }

    this._defaultValue = defaultValue
  }

  public get(): T {
    if (this._exists) {
      return this._value
    }
  }

  public getOrDefault(defaultValue?: T): T {
    if (this._exists) {
      return this._value
    }
    if (defaultValue !== undefined) {
      return defaultValue
    }
    return this._defaultValue
  }

  public getOrThrow(message?: string): T {
    if (this._exists) {
      return this._value
    }
    if (message) {
      throw new EventErrorValueNotExists(message)
    } else {
      throw new EventErrorValueNotExists()
    }
  }
}
