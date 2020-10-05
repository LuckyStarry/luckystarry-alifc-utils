import { DefaultValueWrapper } from './default-value-wrapper'
import { ValueWrapperNumber } from './value-wrapper-number'

export class DefaultValueWrapperNumber extends DefaultValueWrapper<number> implements ValueWrapperNumber {
  public constructor(value: any, defaultValue?: number) {
    if (value !== undefined) {
      if (typeof value === 'number') {
        super(value, !isNaN(value) && value !== Infinity, defaultValue)
      } else if (typeof value === 'string') {
        if (value.includes('.')) {
          const numeric = parseFloat(value)
          super(numeric, !isNaN(numeric), defaultValue)
        } else {
          const numeric = parseInt(value, 10)
          super(numeric, !isNaN(numeric), defaultValue)
        }
      } else if (typeof value === 'boolean') {
        super(value ? 1 : 0, true, defaultValue)
      } else {
        super(undefined, false, defaultValue)
      }
    } else {
      super(undefined, false, defaultValue)
    }
  }

  public ensure(): DefaultValueWrapperNumber {
    super.ensure()
    return this
  }
}
