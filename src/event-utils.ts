import { ProfileWrapper } from './profile-wrapper'

export interface EventUtils {
  ensureLogin(): ProfileWrapper
  ensureInRole(role: string): ProfileWrapper
  ensureInAnyRole(roles: string[]): ProfileWrapper
}
