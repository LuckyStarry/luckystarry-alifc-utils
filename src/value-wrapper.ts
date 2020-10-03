export interface ValueWrapper<T> {
  get(): T
  getOrDefault(defaultValue: T): T
  getOrThrow(message?: string): T
}
