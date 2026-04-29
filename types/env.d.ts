/// <reference types="vite/client" />

export {}

declare global {
  const onMounted: (typeof import('vue'))['onMounted']
  const process: NodeJS.Process

  namespace NodeJS {
    interface Process {
      client: boolean
      server: boolean
    }
  }
}
