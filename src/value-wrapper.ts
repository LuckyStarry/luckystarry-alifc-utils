export interface ValueWrapper<T> {
  isExists(): boolean
  ensureExists(): this
  eitherExists(or: T): this

  ensureFit(predicate: (value: T) => boolean, message?: string): this
  ensureGreaterThan(other: T): this
  ensureGreaterThanOrEqual(other: T): this
  ensureLowerThan(other: T): this
  ensureLowerThanOrEqual(other: T): this
  ensureEqualTo(other: T): this
  ensureNotEqualTo(other: T): this
  ensureNotNull(): this
  ensureIn(list: T[]): this
  ensureNotIn(list: T[]): this

  eitherFit(predicate: (value: T) => boolean, or: T): this
  eitherGreaterThan(other: T, or?: T): this
  eitherGreaterThanOrEqual(other: T, or?: T): this
  eitherLowerThan(other: T, or?: T): this
  eitherLowerThanOrEqual(other: T, or?: T): this
  eitherEqualTo(other: T, or: T): this
  eitherNotEqualTo(other: T, or: T): this
  eitherNotNull(or: T): this
  eitherIn(list: T[], or: T): this
  eitherNotIn(list: T[], or: T): this

  get(): T
  getOrDefault(defaultValue?: T): T
  getOrThrow(message?: string): T
}
