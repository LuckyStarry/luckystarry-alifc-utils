import { EventContext } from './event-context'
import { Profile } from './profile'

export class DefaultEventContext implements EventContext {
  private _parsed: { pathParameters: any; queryParameters: any; headers: any; body: any }
  private _event: any
  private _context: any
  public constructor(event: any, context: any) {
    this._event = event
    this._context = context
  }

  public ensure() {
    if (!this._parsed) {
      const e = Object.assign({ pathParameters: {}, queryParameters: {}, headers: {} }, JSON.parse(new String(this._event).valueOf()))
      let body = e.body
      if (e.isBase64Encoded) {
        const bytes = Buffer.from(e.body, 'base64')
        if (bytes) {
          body = JSON.parse(bytes.toString())
        }
      }
      this._parsed = {
        pathParameters: e.pathParameters,
        queryParameters: e.queryParameters,
        headers: e.headers,
        body: body
      }
    }
    return this._parsed
  }

  public getFromHeaders(name: string): string {
    return this.ensure().headers[name]
  }

  public getFromPath(name: string): string {
    return this.ensure().pathParameters[name]
  }

  public getFromQuery(name: string): string | string[] {
    return this.ensure().queryParameters[name]
  }

  public getFromAny(name: string): string | string[] {
    let value = this.getFromQuery(name)
    if (value !== undefined) {
      return value
    }
    value = this.getFromPath(name)
    if (value !== undefined) {
      return value
    }
    value = this.getFromHeaders(name)
    if (value !== undefined) {
      return value
    }
  }

  public get body(): any {
    return this.ensure().body
  }

  public get profile(): Profile {
    const sub = this.getFromHeaders('x-jwt-sub')
    const text = this.getFromHeaders('x-jwt-profile')
    if (sub && text) {
      const json = JSON.parse(text)
      if (json) {
        return {
          id: sub || '',
          name: json.name || '',
          avatar: json.avatar || '',
          roles: json.roles || []
        }
      }
    }
  }
}
