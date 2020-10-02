import { EventContextFactory } from './event-context-factory'
import { EventHandler } from './event-handler'
import { EventResult } from './event-result'
import { EventUtilsFactory } from './event-utils-factory'
import { Process } from './process'

export class EventHandlerDefault implements EventHandler {
  private _process: Process
  private _contextFactory: EventContextFactory
  private _utilsFactory: EventUtilsFactory
  public constructor(process: Process, contextFactory: EventContextFactory, utilsFactory: EventUtilsFactory) {
    this._process = process
    this._contextFactory = contextFactory
    this._utilsFactory = utilsFactory
  }

  public async handle(event: any, context: any, callback: any): Promise<void> {
    let result: EventResult = { code: '0000', message: '', payload: null, status: 200 }
    try {
      let ctx = this._contextFactory.createContext(event, context)
      let uts = this._utilsFactory.createUtils(ctx)
      result = Object.assign(result, await this._process(ctx, uts))
    } catch (e) {
      console.error(e)
      result = Object.assign(result, { code: '7000', message: '系统运行过程中出现异常', status: 503 })
    }
    let info = Object.assign({ name: 'DEBUG-ONLY', versionId: 'DEBUG-ONLY' }, context.service)
    return callback(null, {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        'x-app-id': info.name,
        'x-app-ver': info.versionId
      },
      body: { Code: result.code, Success: result.code === '0000', Message: result.message || '', Entity: result.payload }
    })
  }
}
