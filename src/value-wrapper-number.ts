import { ValueWrapper } from './value-wrapper'

export interface ValueWrapperNumber extends ValueWrapper<number> {
  ensure(): ValueWrapperNumber
}
