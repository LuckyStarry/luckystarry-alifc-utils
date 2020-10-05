export interface ValueWrapper<T> {
  ensure(): ValueWrapper<T>
  get(): T
  getOrDefault(defaultValue?: T): T
  getOrThrow(message?: string): T
}
