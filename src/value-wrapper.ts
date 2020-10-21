export interface ValueWrapper<T> {
  isExists(): boolean
  ensureExists(message?: string): this
  eitherExists(or: T): this

  ensureFit(predicate: (value: T) => boolean, message?: string): this
  ensureGreaterThan(other: T, message?: string): this
  ensureGreaterThanOrEqual(other: T, message?: string): this
  ensureLowerThan(other: T, message?: string): this
  ensureLowerThanOrEqual(other: T, message?: string): this
  ensureEqualTo(other: T, message?: string): this
  ensureNotEqualTo(other: T, message?: string): this
  ensureNotNull(message?: string): this
  ensureIn(list: T[], message?: string): this
  ensureNotIn(list: T[], message?: string): this

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
