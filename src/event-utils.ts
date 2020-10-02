import { EventResult } from './event-result'
import { ProfileWrapper } from './profile-wrapper'

export interface EventUtils {
  ensureLogin(): ProfileWrapper
  ensureInRole(role: string): ProfileWrapper
  ensureInAnyRole(roles: string[]): ProfileWrapper

  ok(payload: any, message?: string): EventResult
  fail(message?: string, payload?: any): EventResult
}
