import { DefaultValueWrapper } from './default-value-wrapper'

export class DefaultValueWrapperAny extends DefaultValueWrapper<any> {
  public constructor(value: any, defaultValue?: any) {
    super(value, value !== undefined, defaultValue)
  }
}
