import { EventResult } from 'event-result'
import { EventContext } from './event-context'
import { EventUtils } from './event-utils'
import { ProfileWrapper } from './profile-wrapper'
import { ProfileWrapperDefault } from './profile-wrapper-default'

export class EventUtilsDefault implements EventUtils {
  private _context: EventContext
  public constructor(context: EventContext) {
    this._context = context
  }

  public ensureLogin(): ProfileWrapper {
    let profile = this._context.profile
    return ProfileWrapperDefault.createFor401(profile)
  }

  public ensureInRole(role: string): ProfileWrapper {
    let profile = this.ensureLogin().getOrThrow()
    let grants = profile.roles || []
    if (grants.includes(role)) {
      return ProfileWrapperDefault.createFor403(profile)
    }
    return ProfileWrapperDefault.createFor403()
  }

  public ensureInAnyRole(roles: string[]): ProfileWrapper {
    let profile = this.ensureLogin().getOrThrow()
    let grants = profile.roles || []
    if (grants.some((grant) => roles.includes(grant))) {
      return ProfileWrapperDefault.createFor403(profile)
    }
    return ProfileWrapperDefault.createFor403()
  }

  public ok(payload: any, message?: string): EventResult {
    return { code: '0000', payload, message }
  }

  public fail(message?: string, payload?: any): EventResult {
    return { code: '3000', payload, message }
  }
}
