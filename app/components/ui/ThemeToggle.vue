<template>
  <div
    :class="[
      'inline-flex h-8 items-center rounded-lg bg-gray-100/75 p-0.5 dark:bg-gray-800/75',
      className,
    ]"
    role="group"
    :aria-label="toggleLabel"
  >
    <button
      type="button"
      :class="segmentClass('light')"
      :aria-pressed="uiStore.theme === 'light'"
      @click="uiStore.setTheme('light')"
    >
      <Icon name="tabler:sun" class="text-[18px] text-amber-500" />
    </button>
    <button
      type="button"
      :class="segmentClass('dark')"
      :aria-pressed="uiStore.theme === 'dark'"
      @click="uiStore.setTheme('dark')"
    >
      <Icon name="tabler:moon" class="text-[18px] text-indigo-500" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useUIStore } from '~/stores/ui.store'

const uiStore = useUIStore()
const { t } = useI18n()

interface Props {
  className?: string
}

defineProps<Props>()

const toggleLabel = computed(
  () => `${t('theme.current')}${t(uiStore.theme === 'dark' ? 'theme.dark' : 'theme.light')}`,
)

const segmentClass = (mode: 'light' | 'dark') => {
  const active = uiStore.theme === mode
  return [
    'inline-flex h-7 w-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-150',
    'focus:outline-none focus:ring-0 focus:ring-offset-0',
    active
      ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100',
  ]
}
</script>

<style scoped></style>
