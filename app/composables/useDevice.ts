export function useDevice() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)
  const isPortrait = ref(true)
  const width = ref(0)
  const height = ref(0)

  const updateDevice = () => {
    if (typeof window === 'undefined') return

    width.value = window.innerWidth
    height.value = window.innerHeight
    isPortrait.value = width.value <= height.value

    isMobile.value = width.value < 768
    isTablet.value = width.value >= 768 && width.value < 1024
    isDesktop.value = width.value >= 1024
  }

  onMounted(() => {
    updateDevice()
    window.addEventListener('resize', updateDevice)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDevice)
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    width,
    height,
  }
}
