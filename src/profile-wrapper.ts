import { Profile } from './profile'

export interface ProfileWrapper {
  get(): Profile
  getOrThrow(message?: string): Profile
}
