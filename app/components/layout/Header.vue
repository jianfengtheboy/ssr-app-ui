<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200/70 bg-white/92 shadow-sm backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-900/88"
  >
    <div class="container">
      <div class="flex h-16 items-center justify-between gap-4">
        <NuxtLink
          :to="localePath('/')"
          class="flex shrink-0 items-center rounded-lg transition-opacity hover:opacity-85"
        >
          <img
            src="https://xmaivending.com/wp-content/uploads/2026/03/logo-1.png"
            alt="XMAI Vending"
            class="h-5 w-auto"
          />
        </NuxtLink>

        <nav class="hidden flex-1 items-center justify-center gap-2 md:flex lg:gap-3">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="localePath(item.path)"
            class="rounded-xl px-3 py-2 text-[15px] font-medium text-gray-700 transition-colors duration-200 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
            :class="{
              'text-primary-600 underline decoration-2 underline-offset-8 dark:text-primary-400':
                route.path === localePath(item.path),
            }"
          >
            {{ t(`nav.${item.name.toLowerCase()}`) }}
          </NuxtLink>
        </nav>
        <div class="hidden shrink-0 items-center gap-1.5 md:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div class="flex shrink-0 items-center gap-1.5 md:hidden">
          <LanguageToggle class-name="h-9 px-2" />
          <ThemeToggle class-name="h-9" />
          <button
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100/75 text-gray-700 transition-colors duration-200 hover:bg-gray-200/85 hover:text-gray-900 dark:bg-gray-800/75 dark:text-gray-300 dark:hover:bg-gray-700/85 dark:hover:text-gray-100"
            @click="isOpen = !isOpen"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isOpen" class="border-t border-gray-200 py-3 dark:border-gray-800 md:hidden">
        <div class="space-y-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="localePath(item.path)"
            class="block rounded-xl px-3 py-2.5 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            :class="{
              'bg-primary-50/70 text-primary-600 dark:bg-primary-900/15 dark:text-primary-400':
                route.path === localePath(item.path),
            }"
            @click="isOpen = false"
          >
            {{ t(`nav.${item.name.toLowerCase()}`) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import LanguageToggle from '~/components/ui/LanguageToggle.vue'
import ThemeToggle from '~/components/ui/ThemeToggle.vue'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

const isOpen = ref(false)
</script>

<style scoped></style>
