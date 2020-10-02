import { Profile } from './profile'

export interface EventContext {
  getFromHeaders(name: string): string
  getFromPath(name: string): string
  getFromQuery(name: string): string | string[]
  getFromAny(name: string): string | string[]

  readonly body: any
  readonly profile: Profile
}
