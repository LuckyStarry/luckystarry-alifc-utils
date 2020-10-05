import { DefaultProfileWrapper } from './default-profile-wrapper'
import { DefaultValueWrapper } from './default-value-wrapper'
import { DefaultValueWrapperNumber } from './default-value-wrapper-number'
import { EventContext } from './event-context'
import { EventResult } from './event-result'
import { EventUtils } from './event-utils'
import { ProfileWrapper } from './profile-wrapper'
import { ValueWrapper } from './value-wrapper'
import { ValueWrapperNumber } from './value-wrapper-number'
import { ValueWrapperOutOfRange } from './value-wrapper-out-of-range'

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

  public ensureValueExists<T>(value: T): ValueWrapper<T> {
    return new DefaultValueWrapper<T>(value)
  }

  public ensureNumberExists(value: number): ValueWrapperNumber {
    return new DefaultValueWrapperNumber(value)
  }

  public ensureNumberInRange(value: number, min: number, max: number): ValueWrapperNumber {
    const target = this.ensureValueExists(value).getOrThrow()
    if (target === null) {
      return new ValueWrapperOutOfRange(value, min)
    }
    if (target < min) {
      return new ValueWrapperOutOfRange(value, min)
    }
    if (target > max) {
      return new ValueWrapperOutOfRange(value, max)
    }
    return new DefaultValueWrapperNumber(value)
  }

  public ensureStringInRange(value: string, max: number, min?: number): ValueWrapper<string> {
    const target = this.ensureValueExists(value).getOrThrow()
    if (target === null) {
      return new ValueWrapperOutOfRange(value)
    }
    if (max && target.length > max) {
      return new ValueWrapperOutOfRange(value)
    }
    if (min && target.length < min) {
      return new ValueWrapperOutOfRange(value)
    }
    return new DefaultValueWrapper(value, true)
  }

  public ensureStringMatchRegex(value: string, regex: RegExp): ValueWrapper<string> {
    const target = this.ensureValueExists(value).getOrThrow()
    if (target === null) {
      return new ValueWrapperOutOfRange(value)
    }
    if (!regex.test(target)) {
      return new ValueWrapperOutOfRange(value)
    }
    return new DefaultValueWrapper(value, true)
  }

  public ok(payload?: any, message?: string): EventResult {
    return { code: '0000', payload, message }
  }

  public fail(message?: string, payload?: any): EventResult {
    return { code: '3000', payload, message }
  }
}
