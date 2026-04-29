import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  onNuxtReady(async () => {
    await nextTick()
    requestAnimationFrame(() => {
      AOS.init({
        duration: 600,
        once: true,
        offset: 100,
        delay: 0,
      })
    })
  })

  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(() => {
      AOS.refreshHard()
    })
  })
})
