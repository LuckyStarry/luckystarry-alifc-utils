import { EventResult } from './event-result'
import { ProfileWrapper } from './profile-wrapper'
import { ValueWrapper } from './value-wrapper'
import { ValueWrapperNumber } from './value-wrapper-number'
import { ValueWrapperString } from './value-wrapper-string'

export interface EventUtils {
  ensureLogin(): ProfileWrapper
  ensureInRole(role: string): ProfileWrapper
  ensureInAnyRole(roles: string[]): ProfileWrapper

  wrapValue<T>(value: T): ValueWrapper<T>
  wrapValueAsNumber(value: any): ValueWrapperNumber
  wrapValueAsString(value: any): ValueWrapperString

  ok(payload?: any, message?: string): EventResult
  fail(message?: string, payload?: any): EventResult
}
