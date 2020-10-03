import { EventResult } from './event-result'
import { ProfileWrapper } from './profile-wrapper'
import { ValueWrapper } from './value-wrapper'

export interface EventUtils {
  ensureLogin(): ProfileWrapper
  ensureInRole(role: string): ProfileWrapper
  ensureInAnyRole(roles: string[]): ProfileWrapper

  ensureValueExists<T extends number | string>(value: T): ValueWrapper<T>
  ensureNumberInRange(value: number, min: number, max: number): ValueWrapper<number>
  ensureStringInRange(value: string, max: number, min?: number): ValueWrapper<string>
  ensureStringMatchRegex(value: string, regex: RegExp): ValueWrapper<string>

  ok(payload: any, message?: string): EventResult
  fail(message?: string, payload?: any): EventResult
}
