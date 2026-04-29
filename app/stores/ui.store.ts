import { defineStore } from 'pinia'
import { UI_STORE_PERSIST_KEY } from '~/utils/theme-preload'

type ThemeMode = 'light' | 'dark'

function isClient() {
  return typeof window !== 'undefined'
}

function applyTheme(theme: ThemeMode) {
  if (!isClient()) return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

export const useUIStore = defineStore('ui', {
  state: () => ({
    isMobileMenuOpen: false,
    isLoading: false,
    theme: 'light' as ThemeMode,
    notifications: [] as Array<{
      id: string
      type: 'success' | 'error' | 'info' | 'warning'
      message: string
      duration?: number
    }>,
  }),
  actions: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    setMobileMenuOpen(open: boolean) {
      this.isMobileMenuOpen = open
    },
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    },
    setTheme(theme: ThemeMode) {
      this.theme = theme
      applyTheme(theme)
    },
    initializeTheme() {
      if (!isClient()) return
      applyTheme(this.theme)
    },
    addNotification(notification: Omit<(typeof this.notifications)[0], 'id'>) {
      const id = Date.now().toString()
      this.notifications.push({ ...notification, id })

      if (notification.duration !== 0) {
        setTimeout(() => {
          this.removeNotification(id)
        }, notification.duration || 5000)
      }
    },
    removeNotification(id: string) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },
    clearNotifications() {
      this.notifications = []
    },
  },
  persist: {
    key: UI_STORE_PERSIST_KEY,
    pick: ['theme'],
  },
})
