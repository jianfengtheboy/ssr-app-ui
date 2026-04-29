declare module 'aos' {
  export interface AosOptions {
    duration?: number
    once?: boolean
    offset?: number
    [key: string]: unknown
  }

  export interface AosInstance {
    init(options?: AosOptions): void
    refresh(): void
    refreshHard(): void
  }

  const AOS: AosInstance
  export default AOS
}
