import { EventErrorValueOutOfRange } from './event-error-value-out-of-range'
import { ValueWrapperDefault } from './value-wrapper-default'

export class ValueWrapperOutOfRange<T> extends ValueWrapperDefault<T> {
  public constructor(value: T, defaultValue?: T) {
    super(value, false, defaultValue)
  }

  public getOrThrow(message?: string): T {
    if (message) {
      throw new EventErrorValueOutOfRange(message)
    } else {
      throw new EventErrorValueOutOfRange()
    }
  }
}
