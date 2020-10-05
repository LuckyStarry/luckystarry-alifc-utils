export class EventError extends Error {
  private _code = '7000'
  public constructor(code?: string, message?: string) {
    super(message || '事件内部异常')
    if (code) {
      this._code = code
    }
  }

  public get code(): string {
    return this._code
  }
}
