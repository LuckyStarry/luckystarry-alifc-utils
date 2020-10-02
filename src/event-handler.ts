export interface EventHandler {
  handle(event: any, context: any, callback: any): Promise<void>
}
