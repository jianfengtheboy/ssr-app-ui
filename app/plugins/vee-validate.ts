import { configure } from 'vee-validate'

export default defineNuxtPlugin(() => {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  })
})
