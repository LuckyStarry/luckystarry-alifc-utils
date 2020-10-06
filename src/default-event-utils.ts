import { DefaultProfileWrapper } from './default-profile-wrapper'
import { DefaultValueWrapperAny } from './default-value-wrapper-any'
import { DefaultValueWrapperNumber } from './default-value-wrapper-number'
import { DefaultValueWrapperString } from './default-value-wrapper-string'
import { EventContext } from './event-context'
import { EventResult } from './event-result'
import { EventUtils } from './event-utils'
import { ProfileWrapper } from './profile-wrapper'
import { ValueWrapper } from './value-wrapper'
import { ValueWrapperNumber } from './value-wrapper-number'
import { ValueWrapperString } from './value-wrapper-string'

export class DefaultEventUtils implements EventUtils {
  private _context: EventContext
  public constructor(context: EventContext) {
    this._context = context
  }

  public ensureLogin(): ProfileWrapper {
    const profile = this._context.profile
    return DefaultProfileWrapper.createFor401(profile)
  }

  public ensureInRole(role: string): ProfileWrapper {
    const profile = this.ensureLogin().getOrThrow()
    const grants = profile.roles || []
    if (grants.includes(role)) {
      return DefaultProfileWrapper.createFor403(profile)
    }
    return DefaultProfileWrapper.createFor403()
  }

  public ensureInAnyRole(roles: string[]): ProfileWrapper {
    const profile = this.ensureLogin().getOrThrow()
    const grants = profile.roles || []
    if (grants.some((grant) => roles.includes(grant))) {
      return DefaultProfileWrapper.createFor403(profile)
    }
    return DefaultProfileWrapper.createFor403()
  }

  public wrapValue<T>(value: T): ValueWrapper<T> {
    return new DefaultValueWrapperAny(value)
  }

  public wrapValueAsNumber(value: any): ValueWrapperNumber {
    return new DefaultValueWrapperNumber(value)
  }

  public wrapValueAsString(value: any): ValueWrapperString {
    return new DefaultValueWrapperString(value)
  }

  public ok(payload?: any, message?: string): EventResult {
    return { code: '0000', payload, message }
  }

  public fail(message?: string, payload?: any): EventResult {
    return { code: '3000', payload, message }
  }
}
