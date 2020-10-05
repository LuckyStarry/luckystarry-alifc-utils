import { DefaultValueWrapper } from './default-value-wrapper'
import { EventErrorValueOutOfRange } from './event-error-value-out-of-range'

export class ValueWrapperOutOfRange<T> extends DefaultValueWrapper<T> {
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
