import { Profile } from './profile'
import { ProfileWrapper } from './profile-wrapper'

export class DefaultProfileWrapper implements ProfileWrapper {
  private _profile: Profile
  private _status: number
  private constructor(profile: Profile, status: number) {
    this._profile = profile
    this._status = status
  }

  public static createFor401(profile?: Profile) {
    return new DefaultProfileWrapper(profile, 401)
  }

  public static createFor403(profile?: Profile) {
    return new DefaultProfileWrapper(profile, 403)
  }

  public get(): Profile {
    return this._profile
  }

  public getOrThrow(message?: string): Profile {
    const profile = this._profile
    if (profile) {
      return profile
    }
    if (message) {
      throw new Error(message)
    }
    if (this._status === 401) {
      throw new Error('未获取到用户信息')
    }
    if (this._status === 403) {
      throw new Error('没有足够的权限')
    }
    throw new Error(`权限验证错误，代码：${this._status}`)
  }
}
