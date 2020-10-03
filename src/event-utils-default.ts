import { EventContext } from './event-context'
import { EventResult } from './event-result'
import { EventUtils } from './event-utils'
import { ProfileWrapper } from './profile-wrapper'
import { ProfileWrapperDefault } from './profile-wrapper-default'
import { ValueWrapper } from './value-wrapper'
import { ValueWrapperDefault } from './value-wrapper-default'
import { ValueWrapperOutOfRange } from './value-wrapper-out-of-range'

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

  public ensureValueExists<T>(value: T): ValueWrapper<T> {
    return new ValueWrapperDefault<T>(value)
  }

  public ensureNumberInRange(value: number, min: number, max: number): ValueWrapper<number> {
    let target = this.ensureValueExists(value).getOrThrow()
    if (target === null) {
      return new ValueWrapperOutOfRange(value, min)
    }
    if (target < min) {
      return new ValueWrapperOutOfRange(value, min)
    }
    if (target > max) {
      return new ValueWrapperOutOfRange(value, max)
    }
    return new ValueWrapperDefault(value, true)
  }

  public ensureStringInRange(value: string, max: number, min?: number): ValueWrapper<string> {
    let target = this.ensureValueExists(value).getOrThrow()
    if (target === null) {
      return new ValueWrapperOutOfRange(value)
    }
    if (max && target.length > max) {
      return new ValueWrapperOutOfRange(value)
    }
    if (min && target.length < min) {
      return new ValueWrapperOutOfRange(value)
    }
    return new ValueWrapperDefault(value, true)
  }

  public ensureStringMatchRegex(value: string, regex: RegExp): ValueWrapper<string> {
    let target = this.ensureValueExists(value).getOrThrow()
    if (target === null) {
      return new ValueWrapperOutOfRange(value)
    }
    if (!regex.test(target)) {
      return new ValueWrapperOutOfRange(value)
    }
    return new ValueWrapperDefault(value, true)
  }

  public ok(payload?: any, message?: string): EventResult {
    return { code: '0000', payload, message }
  }

  public fail(message?: string, payload?: any): EventResult {
    return { code: '3000', payload, message }
  }
}
