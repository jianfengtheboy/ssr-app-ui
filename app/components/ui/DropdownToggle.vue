<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton
      :class="buttonClass"
      :aria-label="buttonLabel"
      :title="buttonLabel"
      @click="onMenuButtonClick"
    >
      <slot name="button" />
    </MenuButton>

    <transition
      enter-active-class="transition duration-120 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems ref="menuItemsRef" :class="[panelClass, menuPositionClass]">
        <slot />
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

interface Props {
  buttonClass: string | string[]
  buttonLabel: string
  panelClass?: string | string[]
}

withDefaults(defineProps<Props>(), {
  panelClass:
    'absolute z-50 mt-2 rounded-xl border border-gray-200/90 bg-white/95 p-1.5 shadow-lg backdrop-blur outline-none dark:border-gray-700 dark:bg-gray-900/95',
})

const menuItemsRef = ref<InstanceType<typeof MenuItems> | null>(null)
const menuPositionClass = ref('left-1/2 -translate-x-1/2 origin-top')

const resolveMenuPosition = () => {
  if (typeof window === 'undefined') return

  const menuEl = menuItemsRef.value?.$el as HTMLElement | undefined
  if (!menuEl) return

  const rect = menuEl.getBoundingClientRect()
  const overflowRight = rect.right > window.innerWidth - 8
  const overflowLeft = rect.left < 8

  if (overflowLeft) {
    menuPositionClass.value = 'left-0 translate-x-0 origin-top-left'
    return
  }

  if (overflowRight) {
    menuPositionClass.value = 'right-0 translate-x-0 origin-top-right'
    return
  }

  menuPositionClass.value = 'left-1/2 -translate-x-1/2 origin-top'
}

const onMenuButtonClick = async () => {
  menuPositionClass.value = 'left-1/2 -translate-x-1/2 origin-top'
  await nextTick()
  resolveMenuPosition()
}

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('resize', resolveMenuPosition)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', resolveMenuPosition)
})
</script>
