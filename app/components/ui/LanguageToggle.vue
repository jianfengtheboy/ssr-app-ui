<template>
  <DropdownToggle :button-class="buttonClass" :button-label="buttonLabel" :panel-class="panelClass">
    <template #button>
      <span :class="TOOLBAR_BUTTON_LEADING_SLOT_CLASS" aria-hidden="true">
        <img
          :src="currentLanguageOption.flagUrl"
          :alt="currentLanguageOption.label"
          class="h-5 w-5 rounded-full object-cover"
        />
      </span>
      <span class="text-[13px] font-medium tracking-tight">{{
        currentLanguageOption.shortLabel
      }}</span>
      <Icon name="tabler:chevron-down" class="h-3 w-3 opacity-60" />
    </template>

    <MenuItem v-for="item in languageOptions" :key="item.code" v-slot="{ active }">
      <button
        :class="[TOOLBAR_MENU_ITEM_CLASS, itemClass(active, item.code)]"
        @click="changeLocale(item.code)"
      >
        <span :class="TOOLBAR_MENU_LEADING_SLOT_CLASS" aria-hidden="true">
          <img
            :src="item.flagUrl"
            :alt="item.label"
            class="h-[19px] w-[19px] rounded-full object-cover"
          />
        </span>
        <span class="flex-1 text-left font-medium tracking-tight">{{ item.label }}</span>
        <Icon
          v-if="currentLocale === item.code"
          name="tabler:check"
          :class="TOOLBAR_MENU_CHECK_CLASS"
        />
      </button>
    </MenuItem>
  </DropdownToggle>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
import { useI18n } from '#imports'
import flagEs from '~/assets/images/flags/es.svg'
import flagFr from '~/assets/images/flags/fr.svg'
import flagUs from '~/assets/images/flags/us.svg'
import DropdownToggle from '~/components/ui/DropdownToggle.vue'
import { getMenuItemClass } from '~/utils/menu-item'
import {
  TOOLBAR_BUTTON_LEADING_SLOT_CLASS,
  TOOLBAR_MENU_CHECK_CLASS,
  TOOLBAR_MENU_ITEM_CLASS,
  TOOLBAR_MENU_LEADING_SLOT_CLASS,
  TOOLBAR_MENU_PANEL_CLASS,
} from '~/utils/toolbar-menu'

type SupportedLocaleCode = 'en' | 'es' | 'fr'

type LanguageOption = {
  code: SupportedLocaleCode
  label: string
  shortLabel: string
  flagUrl: string
}

interface Props {
  className?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  selected: [code: SupportedLocaleCode]
}>()

const { locale, locales, setLocale, t } = useI18n()

const languageConfig: Record<SupportedLocaleCode, Omit<LanguageOption, 'code'>> = {
  en: { label: 'English', shortLabel: 'EN', flagUrl: flagUs },
  es: { label: 'Español', shortLabel: 'ES', flagUrl: flagEs },
  fr: { label: 'Français', shortLabel: 'FR', flagUrl: flagFr },
}

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>).filter(
    (item): item is { code: SupportedLocaleCode; name: string } =>
      item.code === 'en' || item.code === 'es' || item.code === 'fr',
  )
})

const languageOptions = computed<LanguageOption[]>(() =>
  availableLocales.value.map((item) => ({
    code: item.code,
    ...languageConfig[item.code],
  })),
)

const currentLocale = computed(() => locale.value as SupportedLocaleCode)
const currentLanguageOption = computed<LanguageOption>(
  () =>
    languageOptions.value.find((item) => item.code === currentLocale.value) ?? {
      code: 'en',
      ...languageConfig.en,
    },
)

const buttonLabel = computed(
  () => `${t('language.current')}${currentLanguageOption.value.label}，${t('language.openMenu')}`,
)

const buttonClass = computed(() => [
  'group inline-flex h-8 items-center gap-1 rounded-lg border border-transparent px-2 transition-colors duration-200',
  'cursor-pointer',
  'bg-transparent text-gray-600 hover:bg-gray-100/80 hover:text-gray-900',
  'dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-gray-100',
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  ...(props.className ? [props.className] : []),
])

const panelClass = TOOLBAR_MENU_PANEL_CLASS

const changeLocale = (code: SupportedLocaleCode) => {
  setLocale(code)
  emit('selected', code)
}

const itemClass = (active: boolean, code: SupportedLocaleCode) => {
  return getMenuItemClass(active, currentLocale.value === code)
}
</script>
